import { useState, Fragment } from 'react';
import { useStudent } from '../context/StudentContext';
import { courseCatalog, getCoursesForGrade, prerequisitesMet } from '../data/courseCatalog';
import type { Course } from '../data/courseCatalog';
import { activitiesData } from '../data/activitiesData';
import { Icon } from '../components/Icons';

interface ScheduleYear {
  grade: number;
  courses: Course[];
}

function Schedule() {
  const { student } = useStudent();
  const [schedule, setSchedule] = useState<ScheduleYear[] | null>(null);
  const [generating, setGenerating] = useState(false);

  const allSelectedActivities = [
    ...student.selectedActivities,
    ...student.selectedSports,
    ...student.selectedServices,
  ].map(id => activitiesData.find(a => a.id === id)?.name).filter(Boolean);

  const totalManualCourses = Object.values(student.selectedCourses).reduce((s, arr) => s + arr.length, 0);
  const displayName = student.name.trim() || 'Student profile not set';
  const displayGpa = student.gpa.trim() ? `${student.gpa} GPA` : 'GPA not set';
  const displayTarget = student.targetCollege.trim() || 'Goal not set';

  const generateSchedule = () => {
    setGenerating(true);

    // Simulate brief processing
    setTimeout(() => {
      const result: ScheduleYear[] = [];

      for (let grade = 9; grade <= 12; grade++) {
        const manualPicks = student.selectedCourses[String(grade)] || [];
        const manualCourses = manualPicks
          .map(id => courseCatalog.find(c => c.id === id))
          .filter(Boolean) as Course[];

        // Collect completed course IDs from all previous years
        const completedIds: string[] = [];
        for (let g = 9; g < grade; g++) {
          const prevYear = result.find(y => y.grade === g);
          if (prevYear) prevYear.courses.forEach(c => completedIds.push(c.id));
        }

        // Determine what graduation requirements are still needed
        const gradReqs = student.gradRequirements;
        const deptCreditsNeeded: Record<string, number> = {};
        const deptCreditsHave: Record<string, number> = {};

        // Map departments to grad requirement names
        const deptToReq: Record<string, string> = {
          'English': 'English',
          'Math': 'Math',
          'Science': 'Science',
          'Social Studies': 'Social Studies',
          'World Language': 'World Language',
          'Fine Arts': 'Fine Arts',
          'CTE': 'CTE',
          'PE/Health': 'PE/Health',
        };

        Object.entries(deptToReq).forEach(([dept, req]) => {
          const r = gradReqs[req];
          if (r) {
            deptCreditsNeeded[dept] = r.needed;
            // Count credits from previous result years
            let earned = r.earned;
            for (let g = 9; g < grade; g++) {
              const prev = result.find(y => y.grade === g);
              if (prev) {
                prev.courses.forEach(c => {
                  if (c.department === dept) earned += c.credits;
                });
              }
            }
            deptCreditsHave[dept] = earned;
          }
        });

        // Start with manual picks
        const yearCourses: Course[] = [...manualCourses];
        let totalCr = yearCourses.reduce((s, c) => s + c.credits, 0);
        const usedIds = new Set(yearCourses.map(c => c.id));
        const maxCredits = 7; // typical 7-period day

        // Priority order for filling: departments with biggest gap first
        const deptPriority = Object.entries(deptToReq)
          .map(([dept]) => ({
            dept,
            gap: (deptCreditsNeeded[dept] || 0) - (deptCreditsHave[dept] || 0),
          }))
          .filter(d => d.gap > 0)
          .sort((a, b) => b.gap - a.gap);

        // Auto-fill remaining slots
        for (const { dept } of deptPriority) {
          if (totalCr >= maxCredits) break;

          const available = getCoursesForGrade(grade)
            .filter(c => c.department === dept)
            .filter(c => !usedIds.has(c.id))
            .filter(c => !completedIds.includes(c.id))
            .filter(c => prerequisitesMet(c, [...completedIds, ...Array.from(usedIds)]))
            // Prefer honors/AP for competitive students
            .sort((a, b) => {
              if (a.isAP !== b.isAP) return a.isAP ? -1 : 1;
              if (a.isHonors !== b.isHonors) return a.isHonors ? -1 : 1;
              return 0;
            });

          for (const course of available) {
            if (totalCr + course.credits > maxCredits) continue;
            yearCourses.push(course);
            usedIds.add(course.id);
            totalCr += course.credits;
            break; // one per department per pass
          }
        }

        // If still have room, fill with electives
        if (totalCr < maxCredits) {
          const electives = getCoursesForGrade(grade)
            .filter(c => !usedIds.has(c.id))
            .filter(c => !completedIds.includes(c.id))
            .filter(c => prerequisitesMet(c, [...completedIds, ...Array.from(usedIds)]))
            .sort((a, b) => {
              if (a.isAP !== b.isAP) return a.isAP ? -1 : 1;
              if (a.isHonors !== b.isHonors) return a.isHonors ? -1 : 1;
              return 0;
            });

          for (const course of electives) {
            if (totalCr + course.credits > maxCredits) continue;
            yearCourses.push(course);
            usedIds.add(course.id);
            totalCr += course.credits;
            if (totalCr >= maxCredits) break;
          }
        }

        result.push({ grade, courses: yearCourses });
      }

      setSchedule(result);
      setGenerating(false);
    }, 600);
  };

  return (
    <div>
      <h1 className="font-serif" style={{fontSize: '2.25rem', marginBottom: '0.35rem', color: 'var(--bg-navy)'}}>
        Generate Schedule
      </h1>
      <p className="text-secondary text-sm mb-4">
        Pulls from all your selections across every page and generates an optimized 4-year plan
      </p>

      {/* Input Summary */}
      <div className="navy-card mb-4" style={{padding: '1.5rem'}}>
        <div className="text-xs text-orange mb-4">YOUR SELECTIONS SUMMARY</div>
        <div style={{display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '1rem'}}>
          <div>
            <div className="text-xs text-secondary mb-1">PROFILE</div>
            <div className="text-sm"><strong>{displayName}</strong></div>
            <div style={{fontSize: '0.75rem', color: 'rgba(255,255,255,0.6)'}}>{student.grade}th · {student.currentSchool === 'haas' ? 'Haas Hall' : 'BHS'} · {displayGpa}</div>
          </div>
          <div>
            <div className="text-xs text-secondary mb-1">COURSES PICKED</div>
            <div className="text-sm"><strong>{totalManualCourses}</strong> courses across all years</div>
            <div style={{fontSize: '0.75rem', color: 'rgba(255,255,255,0.6)'}}>Remaining slots auto-filled</div>
          </div>
          <div>
            <div className="text-xs text-secondary mb-1">ACTIVITIES</div>
            <div className="text-sm"><strong>{allSelectedActivities.length}</strong> selected</div>
            <div style={{fontSize: '0.75rem', color: 'rgba(255,255,255,0.6)'}}>{student.selectedActivities.length} clubs · {student.selectedSports.length} sports · {student.selectedServices.length} service</div>
          </div>
          <div>
            <div className="text-xs text-secondary mb-1">TARGET</div>
            <div className="text-sm"><strong>{displayTarget}</strong></div>
            <div style={{fontSize: '0.75rem', color: 'rgba(255,255,255,0.6)'}}>Schedule optimized for this goal</div>
          </div>
        </div>
      </div>

      {/* Grad Requirements Status */}
      <div className="summary-bar mb-4">
        {Object.entries(student.gradRequirements).map(([subj, r]) => (
          <span className="icon-text" key={subj} style={{color: r.earned >= r.needed ? 'var(--accent-green)' : 'var(--text-secondary)'}}>
            {subj}: <strong>{r.earned}/{r.needed}</strong> {r.earned >= r.needed ? <Icon className="ui-icon" name="check" size={14} /> : ''}
          </span>
        ))}
      </div>

      <button className="gen-btn mb-8" onClick={generateSchedule} disabled={generating}>
        {generating ? (
          <>
            <Icon className="ui-icon icon-spin" name="loader" size={17} />
            Generating...
          </>
        ) : (
          'Generate 4-Year Schedule'
        )}
      </button>

      {/* Generated Schedule Output */}
      {schedule && (
        <>
          <h2 className="section-title" style={{marginTop: '1rem'}}>Your Optimized 4-Year Schedule</h2>

          {/* Schedule Grid */}
          <div className="sched-grid mb-4">
            {/* Header row */}
            <div className="sched-cell sched-header">Period</div>
            {schedule.map(y => (
              <div key={y.grade} className="sched-cell sched-header">{y.grade}th Grade</div>
            ))}

            {/* Period rows — up to 7 periods */}
            {Array.from({length: 7}, (_, i) => i + 1).map(period => (
              <Fragment key={period}>
                <div className="sched-cell sched-period">{period}</div>
                {schedule.map(y => {
                  const course = y.courses[period - 1];
                  if (!course) return <div key={y.grade} className="sched-cell" style={{color: 'var(--text-muted)', fontStyle: 'italic', fontSize: '0.7rem'}}>— Open —</div>;
                  return (
                    <div
                      key={y.grade}
                      className={`sched-cell sched-course ${course.isAP ? 'ap' : ''} ${course.isHonors ? 'honors' : ''} ${course.isDualEnrollment ? 'de' : ''}`}
                    >
                      {course.name}
                    </div>
                  );
                })}
              </Fragment>
            ))}
          </div>

          {/* Stats */}
          <div className="summary-bar mb-4">
            {schedule.map(y => {
              const cr = y.courses.reduce((s, c) => s + c.credits, 0);
              const ap = y.courses.filter(c => c.isAP).length;
              return (
                <span key={y.grade}>
                  {y.grade}th: <strong>{cr} cr</strong>{ap > 0 && <span className="text-orange"> · {ap} AP</span>}
                </span>
              );
            })}
            <span>
              Total AP: <strong className="text-orange">{schedule.reduce((s, y) => s + y.courses.filter(c => c.isAP).length, 0)}</strong>
            </span>
          </div>

          {/* Activities Sidebar */}
          {allSelectedActivities.length > 0 && (
            <div className="white-card mb-4">
              <div className="text-xs text-secondary mb-2">EXTRACURRICULARS IN YOUR PLAN</div>
              <div className="flex gap-2 flex-wrap">
                {allSelectedActivities.map((name, i) => (
                  <span key={i} className="pill-badge">{name}</span>
                ))}
              </div>
            </div>
          )}

          {/* Advisor Note */}
          <div className="navy-card" style={{padding: '1.5rem'}}>
            <div className="text-xs text-orange mb-2">SCHEDULE ADVISOR NOTE</div>
            <p className="text-sm" style={{lineHeight: '1.5'}}>
              This schedule is generated from the <strong>Bentonville HS 2026-2027 Course Catalog</strong> and optimized for your target of <strong>{displayTarget}</strong>.
              It prioritizes AP and Honors courses where prerequisites are met, ensures graduation requirements are fulfilled, and balances course load across all four years.
              Always confirm your final schedule with your school counselor.
            </p>
          </div>
        </>
      )}
    </div>
  );
}

export default Schedule;
