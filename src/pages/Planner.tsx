import { useState, useMemo } from 'react';
import { useStudent } from '../context/StudentContext';
import { courseCatalog, getCoursesForGrade, prerequisitesMet, DEPARTMENTS } from '../data/courseCatalog';
import type { Course } from '../data/courseCatalog';

// Fast Levenshtein distance for fuzzy matching (typo tolerance)
function levenshteinDistance(str1: string, str2: string): number {
  const track = Array(str2.length + 1).fill(null).map(() => Array(str1.length + 1).fill(null));
  for (let i = 0; i <= str1.length; i += 1) track[0][i] = i;
  for (let j = 0; j <= str2.length; j += 1) track[j][0] = j;
  for (let j = 1; j <= str2.length; j += 1) {
    for (let i = 1; i <= str1.length; i += 1) {
      const indicator = str1[i - 1] === str2[j - 1] ? 0 : 1;
      track[j][i] = Math.min(
        track[j][i - 1] + 1,
        track[j - 1][i] + 1,
        track[j - 1][i - 1] + indicator
      );
    }
  }
  return track[str2.length][str1.length];
}

// Background fuzzy search scoring
function calculateFuzzyScore(query: string, course: Course): number {
  const q = query.toLowerCase().trim();
  if (!q) return 0;

  const name = course.name.toLowerCase();
  const dept = course.department.toLowerCase();
  const id = course.id.toLowerCase();

  // Exact substring match -> highest priority
  if (name.includes(q) || id.includes(q)) return 100;

  // Word-by-word fuzzy match for typo tolerance
  const words = name.split(/\s+/);
  let bestScore = 0;

  for (const word of words) {
    if (word.startsWith(q)) return 90;
    
    // Levenshtein check for small typos (up to 2 character mistakes)
    const dist = levenshteinDistance(q, word);
    if (dist <= 2) {
      const score = 80 - dist * 15;
      if (score > bestScore) bestScore = score;
    }
  }

  // Check department match
  if (dept.includes(q)) return 50;

  return bestScore;
}

function Planner() {
  const { student, toggleCourse } = useStudent();
  const [activeGrade, setActiveGrade] = useState(parseInt(student.grade));
  const [filterDept, setFilterDept] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState('');

  const gradeInt = parseInt(student.grade);

  // Courses completed in previous years
  const completedIds: string[] = [];
  for (let g = 9; g < activeGrade; g++) {
    (student.selectedCourses[String(g)] || []).forEach(id => {
      if (!completedIds.includes(id)) completedIds.push(id);
    });
  }

  // Available base courses for active grade
  const availableBase = useMemo(() => {
    let list = getCoursesForGrade(activeGrade).filter(c => prerequisitesMet(c, completedIds));
    if (filterDept !== 'All') {
      list = list.filter(c => c.department === filterDept);
    }
    return list;
  }, [activeGrade, filterDept, completedIds]);

  // Background Fuzzy Filtered Courses
  const available = useMemo(() => {
    if (!searchQuery.trim()) return availableBase;

    return availableBase
      .map(course => ({ course, score: calculateFuzzyScore(searchQuery, course) }))
      .filter(item => item.score > 20)
      .sort((a, b) => b.score - a.score)
      .map(item => item.course);
  }, [availableBase, searchQuery]);

  const selected = student.selectedCourses[String(activeGrade)] || [];
  const totalCredits = selected.reduce((sum, id) => {
    const c = courseCatalog.find(x => x.id === id);
    return sum + (c?.credits || 0);
  }, 0);

  const getPublicSchoolName = () => student.publicTarget === 'bwhs' ? 'Bentonville West High School (BWHS)' : 'Bentonville High School (BHS)';

  const renderOptimizationAdvice = () => {
    if (student.schoolPathway === 'haas_to_public') {
      if (gradeInt <= 8) {
        return (
          <div className="navy-card mb-4" style={{padding: '1.5rem'}}>
            <div className="text-xs text-orange mb-2">SSP STRATEGY NOTE · RECOMMENDED PATHWAY (STAGE 1: HAAS HALL)</div>
            <p className="text-sm" style={{lineHeight: '1.5'}}>
              You are currently on track for the <strong>Recommended Pathway</strong>! At Haas Hall Academy in <strong>{student.grade}th grade</strong>, prioritize taking their placement exam to accelerate math (e.g., Algebra 1 in 7th/8th grade). In 10th grade, you will transition to <strong>{getPublicSchoolName()}</strong> with an accelerated math background.
            </p>
          </div>
        );
      } else if (student.currentSchool === 'haas' && gradeInt >= 9) {
        return (
          <div className="navy-card mb-4" style={{padding: '1.5rem', borderColor: 'var(--accent-green)'}}>
            <div className="text-xs mb-2" style={{color: 'var(--accent-green)'}}>SSP STRATEGY NOTE · RECOMMENDED PATHWAY (STAGE 2: PUBLIC TRANSITION)</div>
            <p className="text-sm" style={{lineHeight: '1.5'}}>
              You are in <strong>{student.grade}th grade at Haas Hall</strong>. Under the <strong>Recommended Pathway</strong>, now is the ideal time to transition to <strong>{getPublicSchoolName()}</strong>! Your accelerated math foundation positions you to finish Algebra 2/Pre-Calc early and capitalize on public school ACT/SAT prep pipelines and expanded CTE/AP offerings.
            </p>
          </div>
        );
      } else {
        return (
          <div className="navy-card mb-4" style={{padding: '1.5rem', borderColor: 'var(--accent-green)'}}>
            <div className="text-xs mb-2" style={{color: 'var(--accent-green)'}}>SSP STRATEGY NOTE · RECOMMENDED PATHWAY (STAGE 2: PUBLIC SCHOOL ACTIVE)</div>
            <p className="text-sm" style={{lineHeight: '1.5'}}>
              You are currently enrolled at <strong>{getPublicSchoolName()}</strong> in <strong>{student.grade}th grade</strong>. Your high-school trajectory focuses on completing your High Honors diploma pathway.
            </p>
          </div>
        );
      }
    }

    if (student.schoolPathway === 'haas_all') {
      return (
        <div className="navy-card mb-4" style={{padding: '1.5rem'}}>
          <div className="text-xs text-orange mb-2">SSP STRATEGY NOTE · HAAS HALL FULL PATHWAY</div>
          <p className="text-sm" style={{lineHeight: '1.5'}}>
            You have selected the <strong>Haas Hall Full Pathway (7th-12th Grade)</strong>. Focus on maintaining a high GPA and completing AP/IB offerings available at Haas Hall.
          </p>
        </div>
      );
    }

    if (student.schoolPathway === 'public_all') {
      return (
        <div className="navy-card mb-4" style={{padding: '1.5rem'}}>
          <div className="text-xs text-orange mb-2">SSP STRATEGY NOTE · BENTONVILLE SD FULL PUBLIC PATHWAY</div>
          <p className="text-sm" style={{lineHeight: '1.5'}}>
            You are pursuing the <strong>Full Public School Pathway</strong> at <strong>{getPublicSchoolName()}</strong>. Make sure to leverage Pre-AP math in 8th/9th grade.
          </p>
        </div>
      );
    }

    return null;
  };

  return (
    <div>
      <h1 className="font-serif" style={{fontSize: '2.25rem', marginBottom: '0.35rem', color: 'var(--bg-navy)'}}>
        Four-Year Course Plan
      </h1>
      <p className="text-secondary mb-4 text-sm">
        Tailored to: {student.schoolPathway === 'haas_to_public' ? 'Haas Hall ➔ Public Transfer Strategy' : student.schoolPathway === 'haas_all' ? 'Haas Hall Full Strategy' : 'Public USD Strategy'} · {student.diplomaPathway === 'high_honors' ? '🏆 High Honors Diploma' : student.diplomaPathway === 'honors' ? 'Honors Diploma' : 'Standard Diploma'}
      </p>

      {renderOptimizationAdvice()}

      {/* Search Bar with Typo-Tolerance */}
      <div className="mb-4" style={{position: 'relative'}}>
        <input 
          type="text" 
          placeholder="🔍 Search any course (e.g. 'ap calc', 'algebra', 'chemistry', 'journalism')..." 
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          style={{
            width: '100%',
            padding: '0.85rem 1.25rem',
            fontSize: '1rem',
            borderRadius: '10px',
            border: '2px solid var(--accent-orange)',
            backgroundColor: '#ffffff',
            boxShadow: '0 2px 8px rgba(0,0,0,0.04)',
            outline: 'none'
          }}
        />
        {searchQuery && (
          <button 
            onClick={() => setSearchQuery('')}
            style={{
              position: 'absolute',
              right: '1rem',
              top: '50%',
              transform: 'translateY(-50%)',
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              color: 'var(--text-muted)',
              fontSize: '1rem'
            }}
          >
            ✕
          </button>
        )}
      </div>

      {/* Grade Tabs */}
      <div className="flex gap-2 mb-4">
        {[9, 10, 11, 12].map(g => (
          <div
            key={g}
            className={`pill-badge ${activeGrade === g ? 'active' : ''}`}
            style={{padding: '0.5rem 1.25rem'}}
            onClick={() => setActiveGrade(g)}
          >
            {g}th ({2024 + g - 9}-{(2025 + g - 9).toString().slice(2)})
          </div>
        ))}
      </div>

      {/* Summary Bar */}
      <div className="summary-bar mb-4">
        <span><strong>{selected.length}</strong> courses selected</span>
        <span><strong>{totalCredits}</strong> credits</span>
        <span>Grade <strong>{activeGrade}</strong></span>
        {searchQuery && <span className="text-orange">Fuzzy search active for: "{searchQuery}"</span>}
      </div>

      {/* Department Filter */}
      <div className="flex gap-1 mb-4 flex-wrap">
        <div className={`pill-badge ${filterDept === 'All' ? 'active' : ''}`} onClick={() => setFilterDept('All')}>All</div>
        {DEPARTMENTS.map(d => (
          <div key={d} className={`pill-badge ${filterDept === d ? 'active' : ''}`} onClick={() => setFilterDept(d)}>{d}</div>
        ))}
      </div>

      {/* Course Selection Grid */}
      <div className="sel-grid mb-8">
        {available.length === 0 ? (
          <div className="white-card text-secondary text-sm" style={{gridColumn: '1 / -1', padding: '2rem', textAlign: 'center'}}>
            No courses found matching "{searchQuery}". Try a different spelling or keyword.
          </div>
        ) : (
          available.map(course => {
            const isSelected = selected.includes(course.id);
            return (
              <div
                key={course.id}
                className={`sel-card ${isSelected ? 'selected' : ''}`}
                onClick={() => toggleCourse(String(activeGrade), course.id)}
              >
                <div className="checkbox">{isSelected ? '✓' : ''}</div>
                <div className="sel-card-info">
                  <div className="sel-card-name">{course.name}</div>
                  <div className="sel-card-desc">{course.description}</div>
                  <div className="sel-card-tags">
                    <span className="sel-card-tag">{course.department}</span>
                    <span className="sel-card-tag">{course.credits} cr</span>
                    {course.isAP && <span className="sel-card-tag" style={{background: '#fef3c7', color: '#b45309'}}>AP</span>}
                    {course.isHonors && <span className="sel-card-tag" style={{background: '#ede9fe', color: '#7c3aed'}}>Honors</span>}
                    {course.isDualEnrollment && <span className="sel-card-tag" style={{background: '#dcfce7', color: '#166534'}}>Dual Enroll</span>}
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>

      {/* Selected Courses Table */}
      {selected.length > 0 && (
        <>
          <h2 className="section-title" style={{marginTop: '1rem'}}>Selected Schedule — {activeGrade}th Grade</h2>
          <table className="course-table">
            <thead>
              <tr>
                <th>Code</th>
                <th>Course</th>
                <th style={{textAlign: 'center'}}>CR</th>
                <th style={{textAlign: 'center'}}>Type</th>
              </tr>
            </thead>
            <tbody>
              {selected.map(id => {
                const c = courseCatalog.find(x => x.id === id);
                if (!c) return null;
                return (
                  <tr key={id}>
                    <td className="text-muted text-xs">{c.id}</td>
                    <td style={{fontWeight: 600}}>{c.name}</td>
                    <td style={{textAlign: 'center'}}>{c.credits}</td>
                    <td style={{textAlign: 'center'}}>
                      {c.isAP ? <span className="pill-badge" style={{backgroundColor: '#fef3c7', color: '#b45309', border: 'none', fontSize: '0.65rem'}}>AP</span> :
                       c.isHonors ? <span className="pill-badge" style={{backgroundColor: '#ede9fe', color: '#7c3aed', border: 'none', fontSize: '0.65rem'}}>Honors</span> :
                       c.isDualEnrollment ? <span className="pill-badge" style={{backgroundColor: '#dcfce7', color: '#166534', border: 'none', fontSize: '0.65rem'}}>DE</span> :
                       <span className="text-muted text-sm">Core</span>}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </>
      )}
    </div>
  );
}

export default Planner;
