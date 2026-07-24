import React, { useState } from 'react';

function Planner() {
  const [grade, setGrade] = useState('7');
  const [school, setSchool] = useState('public');
  const [math, setMath] = useState('pre-algebra');
  const [planGenerated, setPlanGenerated] = useState(false);

  const handleGenerate = (e: React.FormEvent) => {
    e.preventDefault();
    setPlanGenerated(true);
  };

  const renderOptimizationAdvice = () => {
    if (parseInt(grade) <= 8 && school === 'public') {
      return (
        <div className="card mb-4" style={{ borderLeft: '4px solid var(--accent-color)' }}>
          <h4 className="heading-sm">💡 Optimization Tip</h4>
          <p>The smartest and most optimized route is to attend <strong>Haas Hall Academy</strong> for your Junior High years. We highly recommend taking their placement exam to skip Pre-Algebra so you can take <strong>Algebra 1 in 7th grade</strong> and <strong>Geometry in 8th grade</strong>.</p>
        </div>
      );
    }
    
    if (parseInt(grade) >= 9 && school === 'haas') {
      return (
        <div className="card mb-4" style={{ borderLeft: '4px solid var(--success-color)' }}>
          <h4 className="heading-sm">💡 Optimization Tip</h4>
          <p>Now that you're entering High School, the optimized route is to move to a <strong>Public School</strong>. Because you've accelerated your math, you are ready to start and finish your <strong>ACT or SAT exams</strong> the year you finish Algebra 2, giving you a massive advantage for college prep!</p>
        </div>
      );
    }

    if (school === 'haas' && parseInt(grade) <= 8) {
       return (
        <div className="card mb-4" style={{ borderLeft: '4px solid var(--primary-color)' }}>
          <h4 className="heading-sm">💡 Optimization Tip</h4>
          <p>You are on the right track! Make sure you are pushing to complete <strong>Algebra 2</strong> as early as possible. Once you finish Algebra 2, you'll be perfectly positioned to transition to a public high school and crush your ACT/SATs!</p>
        </div>
      );
    }

    return null;
  };

  return (
    <div className="container mt-8 mb-8">
      <h1 className="heading-lg mb-4">Student Success Plan (SSP) Generator</h1>
      <p className="text-secondary mb-8">Enter your current details to generate a personalized course plan and optimized routing advice.</p>

      <div className="flex" style={{ gap: '2rem', flexWrap: 'wrap' }}>
        <div className="card" style={{ flex: '1', minWidth: '300px' }}>
          <form onSubmit={handleGenerate} className="flex flex-col gap-4">
            <div>
              <label className="text-secondary mb-1" style={{ display: 'block' }}>Current Grade</label>
              <select 
                value={grade} 
                onChange={(e) => setGrade(e.target.value)}
                style={{ width: '100%', padding: '0.75rem', borderRadius: '4px', border: '1px solid var(--border-color)', backgroundColor: 'var(--bg-primary)', color: 'var(--text-primary)' }}
              >
                <option value="7">7th Grade</option>
                <option value="8">8th Grade</option>
                <option value="9">9th Grade</option>
                <option value="10">10th Grade</option>
                <option value="11">11th Grade</option>
                <option value="12">12th Grade</option>
              </select>
            </div>

            <div>
              <label className="text-secondary mb-1" style={{ display: 'block' }}>Current School System</label>
              <select 
                value={school} 
                onChange={(e) => setSchool(e.target.value)}
                style={{ width: '100%', padding: '0.75rem', borderRadius: '4px', border: '1px solid var(--border-color)', backgroundColor: 'var(--bg-primary)', color: 'var(--text-primary)' }}
              >
                <option value="public">Public School (Bentonville)</option>
                <option value="haas">Haas Hall Academy</option>
              </select>
            </div>

            <div>
              <label className="text-secondary mb-1" style={{ display: 'block' }}>Current/Next Math Course</label>
              <select 
                value={math} 
                onChange={(e) => setMath(e.target.value)}
                style={{ width: '100%', padding: '0.75rem', borderRadius: '4px', border: '1px solid var(--border-color)', backgroundColor: 'var(--bg-primary)', color: 'var(--text-primary)' }}
              >
                <option value="pre-algebra">Math 7 / Pre-Algebra</option>
                <option value="algebra1">Algebra 1</option>
                <option value="geometry">Geometry</option>
                <option value="algebra2">Algebra 2</option>
                <option value="precal">Pre-Calculus</option>
                <option value="calc">Calculus / Stats</option>
              </select>
            </div>

            <button type="submit" className="btn btn-primary mt-4">Generate Plan</button>
          </form>
        </div>

        {planGenerated && (
          <div style={{ flex: '2', minWidth: '300px' }} className="animate-fade-in">
            <h2 className="heading-md mb-4">Your Personalized Plan</h2>
            
            {renderOptimizationAdvice()}

            <div className="card">
              <h3 className="heading-sm mb-4">Recommended Schedule</h3>
              <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                <thead>
                  <tr style={{ borderBottom: '2px solid var(--border-color)', textAlign: 'left' }}>
                    <th style={{ padding: '0.5rem' }}>Subject</th>
                    <th style={{ padding: '0.5rem' }}>Recommendation</th>
                  </tr>
                </thead>
                <tbody>
                  <tr style={{ borderBottom: '1px solid var(--border-color)' }}>
                    <td style={{ padding: '0.75rem 0.5rem' }}><strong>Math</strong></td>
                    <td style={{ padding: '0.75rem 0.5rem' }}>
                      {math === 'pre-algebra' ? 'Take Placement Exam -> Algebra 1' : 
                       math === 'algebra1' ? 'Geometry (Advanced/Honors)' : 
                       math === 'geometry' ? 'Algebra 2 (Advanced)' : 
                       'AP Pre-Calculus / AP Statistics'}
                    </td>
                  </tr>
                  <tr style={{ borderBottom: '1px solid var(--border-color)' }}>
                    <td style={{ padding: '0.75rem 0.5rem' }}><strong>English</strong></td>
                    <td style={{ padding: '0.75rem 0.5rem' }}>Pre-AP / AP English sequence</td>
                  </tr>
                  <tr style={{ borderBottom: '1px solid var(--border-color)' }}>
                    <td style={{ padding: '0.75rem 0.5rem' }}><strong>Science</strong></td>
                    <td style={{ padding: '0.75rem 0.5rem' }}>Physical Science Integrated / Biology</td>
                  </tr>
                  <tr>
                    <td style={{ padding: '0.75rem 0.5rem' }}><strong>Electives</strong></td>
                    <td style={{ padding: '0.75rem 0.5rem' }}>Foreign Language (Spanish I/II), Computer Science, or Career Tech</td>
                  </tr>
                </tbody>
              </table>
              <p className="text-muted mt-4" style={{ fontSize: '0.875rem' }}>
                *Note: This is a high-level recommendation based on the Bentonville/Haas course catalogs. Always consult with your school counselor to ensure all graduation requirements are met.
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Planner;
