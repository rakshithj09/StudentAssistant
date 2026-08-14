import { useStudent } from '../context/StudentContext';
import { Icon } from '../components/Icons';

function Home() {
  const { student, updateGradReq } = useStudent();

  const getSchoolLabel = () => {
    if (student.currentSchool === 'haas') return 'Haas Hall Academy';
    if (student.currentSchool === 'bwhs') return 'Bentonville West High School (BWHS)';
    return 'Bentonville High School (BHS)';
  };
  const getGradeLabel = () => `${student.grade}th Grade`;
  const getClassYear = () => {
    const yearsLeft = 12 - parseInt(student.grade);
    return 2026 + yearsLeft;
  };
  const yearsToGraduation = Math.max(0, 12 - parseInt(student.grade));
  const displayName = student.name.trim() || 'Student';
  const gpaDisplay = student.gpa.trim() || 'Not set';
  const targetDisplay = student.targetCollege.trim() || 'Choose a goal';

  const subjects = Object.keys(student.gradRequirements);

  return (
    <div>
      {/* Hero */}
      <div className="navy-card">
        <div className="text-xs text-orange" style={{marginBottom: '0.75rem'}}>YOUR STUDENT SUCCESS PLAN</div>
        <h1 className="hero-greeting font-serif">
          Good morning,<br/><i>{displayName}.</i>
        </h1>
        <p className="text-secondary mt-4">
          {getGradeLabel()} · {getSchoolLabel()} · Class of {getClassYear()}
        </p>
        <div className="stats-container">
          <div className="stat-box">
            <div className="stat-box-title">GPA</div>
            <div className="stat-box-value">{gpaDisplay}</div>
          </div>
          <div className="stat-box">
            <div className="stat-box-title">Credits Earned</div>
            <div className="stat-box-value">
              {Object.values(student.gradRequirements).reduce((s, r) => s + r.earned, 0)}
              <span style={{fontSize: '1rem', color: 'rgba(255,255,255,0.5)'}}>
                /{Object.values(student.gradRequirements).reduce((s, r) => s + r.needed, 0)}
              </span>
            </div>
          </div>
          <div className="stat-box">
            <div className="stat-box-title">Target</div>
            <div className="stat-box-value text-orange" style={{fontSize: '1.1rem', marginTop: '0.15rem'}}>{targetDisplay}</div>
          </div>
        </div>
        <div style={{position: 'absolute', right: '3rem', top: '50%', transform: 'translateY(-50%)', textAlign: 'center', borderLeft: '1px solid rgba(255,255,255,0.1)', paddingLeft: '2.5rem'}}>
          <div className="font-serif" style={{fontSize: '4.5rem', lineHeight: '1', color: 'rgba(255,255,255,0.2)'}}>{yearsToGraduation}</div>
          <div className="text-xs text-secondary mt-2">YEARS TO GRAD</div>
        </div>
      </div>

      {/* Graduation Requirements — Editable */}
      <h2 className="section-title">Graduation Requirements <span className="text-sm text-secondary" style={{fontFamily: 'var(--font-sans)', fontWeight: 400, textTransform: 'none', letterSpacing: 0}}>— click +/- to edit</span></h2>
      <div className="req-grid">
        {subjects.map(subj => {
          const r = student.gradRequirements[subj];
          const pct = r.needed > 0 ? Math.min(100, (r.earned / r.needed) * 100) : 0;
          const isComplete = r.earned >= r.needed && r.needed > 0;
          return (
            <div className="white-card req-card" key={subj}>
              <div className="req-header">
                <span>{subj}</span>
                <div className="num-editor">
                  <button onClick={() => updateGradReq(subj, 'earned', r.earned - 1)}>−</button>
                  <span className="text-sm" style={{minWidth: '45px', textAlign: 'center', color: isComplete ? 'var(--accent-green)' : 'var(--text-muted)'}}>
                    {r.earned} / {r.needed}
                  </span>
                  <button onClick={() => updateGradReq(subj, 'earned', r.earned + 1)}>+</button>
                </div>
              </div>
              <div className="progress-bar-bg">
                <div className={`progress-bar-fill ${isComplete ? 'complete' : ''}`} style={{width: `${pct}%`}}></div>
              </div>
              {isComplete && (
                <div className="text-xs icon-text" style={{color: 'var(--accent-green)', marginTop: '-0.25rem', letterSpacing: '0.02em'}}>
                  <Icon className="ui-icon" name="check" size={13} />
                  COMPLETE
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Priority Actions */}
      <h2 className="section-title">Priority Actions</h2>
      <div className="req-grid" style={{gridTemplateColumns: 'repeat(3, 1fr)'}}>
        <div className="white-card">
          <h3 className="font-sans" style={{fontSize: '0.95rem', marginBottom: '0.35rem'}}>Schedule PSAT Prep</h3>
          <p className="text-secondary text-sm">Start 1 practice test/month to prepare for PSAT.</p>
        </div>
        <div className="white-card">
          <h3 className="font-sans" style={{fontSize: '0.95rem', marginBottom: '0.35rem'}}>Join HOSA by Fall</h3>
          <p className="text-secondary text-sm">HOSA aligns with your Pre-Med goal. Register before September.</p>
        </div>
        <div className="white-card">
          <h3 className="font-sans" style={{fontSize: '0.95rem', marginBottom: '0.35rem'}}>Shadow a Physician</h3>
          <p className="text-secondary text-sm">Aim for 40+ hours before 11th grade applications.</p>
        </div>
      </div>
    </div>
  );
}

export default Home;
