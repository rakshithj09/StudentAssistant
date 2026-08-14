import React, { useState } from 'react';
import { useStudent } from '../context/StudentContext';

function Profile() {
  const { student, updateStudent } = useStudent();
  const [saved, setSaved] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  return (
    <div style={{ maxWidth: '700px', margin: '0 auto', width: '100%' }}>
      <h1 className="font-serif" style={{ fontSize: '2.5rem', marginBottom: '0.5rem', color: 'var(--bg-navy)' }}>
        Student Profile & Pathway Setup
      </h1>
      <p className="text-secondary mb-8">
        Customize your school trajectory, diploma pathway, and target goals.
      </p>

      <form className="white-card" onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', padding: '2rem' }}>
        
        {/* Name & Grade */}
        <div style={{ display: 'flex', gap: '1rem' }}>
          <div style={{ flex: 2 }}>
            <label className="text-secondary mb-1" style={{ display: 'block', fontSize: '0.9rem' }}>Student Name</label>
            <input 
              type="text" 
              value={student.name}
              onChange={(e) => updateStudent({ name: e.target.value })}
              style={{ width: '100%', padding: '0.75rem', borderRadius: '6px', border: '1px solid #e5e7eb' }}
            />
          </div>
          <div style={{ flex: 1 }}>
            <label className="text-secondary mb-1" style={{ display: 'block', fontSize: '0.9rem' }}>Current Grade</label>
            <select 
              value={student.grade}
              onChange={(e) => updateStudent({ grade: e.target.value })}
              style={{ width: '100%', padding: '0.75rem', borderRadius: '6px', border: '1px solid #e5e7eb', backgroundColor: 'white' }}
            >
              <option value="7">7th Grade</option>
              <option value="8">8th Grade</option>
              <option value="9">9th Grade (Freshman)</option>
              <option value="10">10th Grade (Sophomore)</option>
              <option value="11">11th Grade (Junior)</option>
              <option value="12">12th Grade (Senior)</option>
            </select>
          </div>
        </div>

        {/* Current School & Public Target */}
        <div style={{ display: 'flex', gap: '1rem' }}>
          <div style={{ flex: 1 }}>
            <label className="text-secondary mb-1" style={{ display: 'block', fontSize: '0.9rem' }}>Current School Attending</label>
            <select 
              value={student.currentSchool}
              onChange={(e) => updateStudent({ currentSchool: e.target.value as any })}
              style={{ width: '100%', padding: '0.75rem', borderRadius: '6px', border: '1px solid #e5e7eb', backgroundColor: 'white' }}
            >
              <option value="haas">Haas Hall Academy</option>
              <option value="bhs">Bentonville High School (BHS)</option>
              <option value="bwhs">Bentonville West High School (BWHS)</option>
            </select>
          </div>

          <div style={{ flex: 1 }}>
            <label className="text-secondary mb-1" style={{ display: 'block', fontSize: '0.9rem' }}>Public High School Target</label>
            <select 
              value={student.publicTarget}
              onChange={(e) => updateStudent({ publicTarget: e.target.value as any })}
              style={{ width: '100%', padding: '0.75rem', borderRadius: '6px', border: '1px solid #e5e7eb', backgroundColor: 'white' }}
            >
              <option value="bhs">Bentonville High School (BHS)</option>
              <option value="bwhs">Bentonville West High School (BWHS)</option>
            </select>
          </div>
        </div>

        {/* School Pathway Option */}
        <div>
          <label className="text-secondary mb-2" style={{ display: 'block', fontSize: '0.9rem', fontWeight: 600 }}>
            School System Strategy Pathway
          </label>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            <label className={`sel-card ${student.schoolPathway === 'haas_to_public' ? 'selected' : ''}`} style={{ cursor: 'pointer' }}>
              <input 
                type="radio" 
                name="schoolPathway" 
                checked={student.schoolPathway === 'haas_to_public'} 
                onChange={() => updateStudent({ schoolPathway: 'haas_to_public' })}
                style={{ marginRight: '0.5rem' }}
              />
              <div>
                <div style={{ fontWeight: 600, fontSize: '0.95rem' }}>
                  ⭐ Recommended Route: Haas Hall (7th-9th) → Public High School (10th-12th)
                </div>
                <div className="text-secondary text-sm">
                  Accelerate Math/Science early at Haas Hall Academy, then move to {student.publicTarget === 'bhs' ? 'Bentonville High' : 'Bentonville West'} to complete ACT/SAT prep and access extensive AP/CTE course offerings.
                </div>
              </div>
            </label>

            <label className={`sel-card ${student.schoolPathway === 'haas_all' ? 'selected' : ''}`} style={{ cursor: 'pointer' }}>
              <input 
                type="radio" 
                name="schoolPathway" 
                checked={student.schoolPathway === 'haas_all'} 
                onChange={() => updateStudent({ schoolPathway: 'haas_all' })}
                style={{ marginRight: '0.5rem' }}
              />
              <div>
                <div style={{ fontWeight: 600, fontSize: '0.95rem' }}>Haas Hall Academy (All 7th-12th Years)</div>
                <div className="text-secondary text-sm">Stay at Haas Hall Academy through high school graduation.</div>
              </div>
            </label>

            <label className={`sel-card ${student.schoolPathway === 'public_all' ? 'selected' : ''}`} style={{ cursor: 'pointer' }}>
              <input 
                type="radio" 
                name="schoolPathway" 
                checked={student.schoolPathway === 'public_all'} 
                onChange={() => updateStudent({ schoolPathway: 'public_all' })}
                style={{ marginRight: '0.5rem' }}
              />
              <div>
                <div style={{ fontWeight: 600, fontSize: '0.95rem' }}>Public School (All 7th-12th Years)</div>
                <div className="text-secondary text-sm">Attend Bentonville SD public schools ({student.publicTarget === 'bhs' ? 'BHS' : 'BWHS'}) for all junior high and high school years.</div>
              </div>
            </label>
          </div>
        </div>

        {/* Diploma Pathway */}
        <div>
          <label className="text-secondary mb-2" style={{ display: 'block', fontSize: '0.9rem', fontWeight: 600 }}>
            Academic Diploma Pathway
          </label>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            <label className={`sel-card ${student.diplomaPathway === 'high_honors' ? 'selected' : ''}`} style={{ cursor: 'pointer' }}>
              <input 
                type="radio" 
                name="diplomaPathway" 
                checked={student.diplomaPathway === 'high_honors'} 
                onChange={() => updateStudent({ diplomaPathway: 'high_honors' })}
                style={{ marginRight: '0.5rem' }}
              />
              <div>
                <div style={{ fontWeight: 600, fontSize: '0.95rem' }}>
                  🏆 Recommended: High Honors / Competitive College Pathway (26+ Credits)
                </div>
                <div className="text-secondary text-sm">
                  Automatically sets 4 Math, 4 Science, 5 Social Studies, 4 World Language, and 4 AP/IB courses. Required for top-tier university admissions and major scholarships.
                </div>
              </div>
            </label>

            <label className={`sel-card ${student.diplomaPathway === 'honors' ? 'selected' : ''}`} style={{ cursor: 'pointer' }}>
              <input 
                type="radio" 
                name="diplomaPathway" 
                checked={student.diplomaPathway === 'honors'} 
                onChange={() => updateStudent({ diplomaPathway: 'honors' })}
                style={{ marginRight: '0.5rem' }}
              />
              <div>
                <div style={{ fontWeight: 600, fontSize: '0.95rem' }}>Bentonville District Honors Diploma (26 Credits)</div>
                <div className="text-secondary text-sm">Includes 4 Math, 3 Science, 3 Social Studies, and 2 World Language credits.</div>
              </div>
            </label>

            <label className={`sel-card ${student.diplomaPathway === 'standard' ? 'selected' : ''}`} style={{ cursor: 'pointer' }}>
              <input 
                type="radio" 
                name="diplomaPathway" 
                checked={student.diplomaPathway === 'standard'} 
                onChange={() => updateStudent({ diplomaPathway: 'standard' })}
                style={{ marginRight: '0.5rem' }}
              />
              <div>
                <div style={{ fontWeight: 600, fontSize: '0.95rem' }}>Arkansas Minimum State Diploma (22 Credits)</div>
                <div className="text-secondary text-sm">Standard high school graduation requirement baseline.</div>
              </div>
            </label>
          </div>
        </div>

        {/* Math level & Target College */}
        <div style={{ display: 'flex', gap: '1rem' }}>
          <div style={{ flex: 1 }}>
            <label className="text-secondary mb-1" style={{ display: 'block', fontSize: '0.9rem' }}>Current Math Class</label>
            <select 
              value={student.mathLevel}
              onChange={(e) => updateStudent({ mathLevel: e.target.value })}
              style={{ width: '100%', padding: '0.75rem', borderRadius: '6px', border: '1px solid #e5e7eb', backgroundColor: 'white' }}
            >
              <option value="pre-algebra">Math 7 / Pre-Algebra</option>
              <option value="algebra1">Algebra 1</option>
              <option value="geometry">Geometry</option>
              <option value="algebra2">Algebra 2</option>
              <option value="precal">Pre-Calculus</option>
              <option value="calc">Calculus / Stats</option>
            </select>
          </div>

          <div style={{ flex: 1 }}>
            <label className="text-secondary mb-1" style={{ display: 'block', fontSize: '0.9rem' }}>Estimated GPA</label>
            <input 
              type="text" 
              value={student.gpa}
              onChange={(e) => updateStudent({ gpa: e.target.value })}
              style={{ width: '100%', padding: '0.75rem', borderRadius: '6px', border: '1px solid #e5e7eb' }}
            />
          </div>

          <div style={{ flex: 1.5 }}>
            <label className="text-secondary mb-1" style={{ display: 'block', fontSize: '0.9rem' }}>Target College / Goal</label>
            <input 
              type="text" 
              value={student.targetCollege}
              onChange={(e) => updateStudent({ targetCollege: e.target.value })}
              style={{ width: '100%', padding: '0.75rem', borderRadius: '6px', border: '1px solid #e5e7eb' }}
            />
          </div>
        </div>

        <button 
          type="submit" 
          style={{ 
            backgroundColor: 'var(--bg-navy)', 
            color: 'white', 
            padding: '0.75rem', 
            borderRadius: '6px', 
            border: 'none', 
            cursor: 'pointer',
            fontWeight: 600,
            marginTop: '1rem'
          }}
        >
          {saved ? '✓ Profile & Pathway Saved' : 'Save Profile & Update Graduation Requirements'}
        </button>
      </form>
    </div>
  );
}

export default Profile;
