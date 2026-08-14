import React, { useState } from 'react';
import { useStudent } from '../context/StudentContext';
import { Icon } from '../components/Icons';

function TestPrep() {
  const { student, updateActScores, addTestAttempt, deleteTestAttempt } = useStudent();
  const scores = student.actScores;
  const displayTarget = student.targetCollege.trim() || 'Final goal';

  // New attempt form state
  const [showAddForm, setShowAddForm] = useState(false);
  const [newType, setNewType] = useState<'ACT' | 'SAT' | 'PSAT'>('ACT');
  const [newDate, setNewDate] = useState('October 2026');
  const [newEnglish, setNewEnglish] = useState(28);
  const [newMath, setNewMath] = useState(30);
  const [newReading, setNewReading] = useState(27);
  const [newScience, setNewScience] = useState(28);
  const [newNotes, setNewNotes] = useState('');

  // Direct change handler without requiring an edit mode toggle
  const handleChange = (field: keyof typeof scores, rawVal: string) => {
    const val = parseInt(rawVal, 10);
    const num = isNaN(val) ? 0 : Math.min(36, Math.max(0, val));
    const newScores = { ...scores, [field]: num };
    
    // Auto-recalculate composite if a section score was edited
    if (['english', 'math', 'reading', 'science'].includes(field)) {
      const validSections = [newScores.english, newScores.math, newScores.reading, newScores.science].filter(s => s > 0);
      if (validSections.length > 0) {
        newScores.composite = Math.round(validSections.reduce((a, b) => a + b, 0) / validSections.length);
      }
    }
    
    updateActScores(newScores);
  };

  const handleAddAttemptSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const comp = newType === 'ACT' 
      ? Math.round((newEnglish + newMath + newReading + newScience) / 4)
      : Math.round((newEnglish + newMath + newReading) / 3);

    addTestAttempt({
      testType: newType,
      date: newDate,
      english: newEnglish,
      math: newMath,
      reading: newReading,
      science: newType === 'ACT' ? newScience : 0,
      composite: comp,
      notes: newNotes,
    });

    // Reset & close form
    setNewNotes('');
    setShowAddForm(false);
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <div>
          <h1 className="font-serif" style={{fontSize: '2.25rem', marginBottom: '0.25rem', color: 'var(--bg-navy)'}}>
            ACT / SAT Test Prep & Attempt Log
          </h1>
          <p className="text-secondary text-sm">
            Set your target benchmarks and log every official or practice test attempt.
          </p>
        </div>
        <button
          onClick={() => setShowAddForm(!showAddForm)}
          style={{
            backgroundColor: 'var(--bg-navy)',
            color: 'white',
            border: 'none',
            padding: '0.6rem 1.25rem',
            borderRadius: '6px',
            cursor: 'pointer',
            fontWeight: 600,
            fontSize: '0.85rem'
          }}
        >
          {showAddForm ? (
            <span className="icon-text">
              <Icon className="ui-icon" name="x" size={16} />
              Close Form
            </span>
          ) : (
            <span className="icon-text">
              <Icon className="ui-icon" name="plus" size={16} />
              Log New Test Attempt
            </span>
          )}
        </button>
      </div>

      {/* Add Test Attempt Form */}
      {showAddForm && (
        <form className="white-card mb-6" onSubmit={handleAddAttemptSubmit} style={{padding: '1.5rem', border: '2px solid var(--accent-orange)'}}>
          <h3 className="font-serif mb-3" style={{fontSize: '1.1rem', color: 'var(--bg-navy)'}}>Log Test Attempt</h3>
          <div style={{display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1rem', marginBottom: '1rem'}}>
            <div>
              <label className="text-xs text-secondary mb-1" style={{display: 'block'}}>Test Type</label>
              <select 
                value={newType} 
                onChange={(e) => setNewType(e.target.value as any)}
                style={{width: '100%', padding: '0.5rem', borderRadius: '4px', border: '1px solid #ccc'}}
              >
                <option value="ACT">ACT</option>
                <option value="SAT">SAT</option>
                <option value="PSAT">PSAT / NMSQT</option>
              </select>
            </div>
            <div>
              <label className="text-xs text-secondary mb-1" style={{display: 'block'}}>Test Date / Term</label>
              <input 
                type="text" 
                value={newDate} 
                onChange={(e) => setNewDate(e.target.value)}
                placeholder="e.g. October 2026"
                style={{width: '100%', padding: '0.5rem', borderRadius: '4px', border: '1px solid #ccc'}}
              />
            </div>
            <div>
              <label className="text-xs text-secondary mb-1" style={{display: 'block'}}>Notes / Goal Context</label>
              <input 
                type="text" 
                value={newNotes} 
                onChange={(e) => setNewNotes(e.target.value)}
                placeholder="e.g. Practice Test #2 or Official Spring ACT"
                style={{width: '100%', padding: '0.5rem', borderRadius: '4px', border: '1px solid #ccc'}}
              />
            </div>
          </div>

          <div style={{display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '1rem', marginBottom: '1rem'}}>
            <div>
              <label className="text-xs text-secondary mb-1" style={{display: 'block'}}>English</label>
              <input 
                type="number" min="1" max="36" 
                value={newEnglish} 
                onChange={(e) => setNewEnglish(parseInt(e.target.value) || 0)}
                style={{width: '100%', padding: '0.5rem', borderRadius: '4px', border: '1px solid #ccc', fontWeight: 600}}
              />
            </div>
            <div>
              <label className="text-xs text-secondary mb-1" style={{display: 'block'}}>Math</label>
              <input 
                type="number" min="1" max="36" 
                value={newMath} 
                onChange={(e) => setNewMath(parseInt(e.target.value) || 0)}
                style={{width: '100%', padding: '0.5rem', borderRadius: '4px', border: '1px solid #ccc', fontWeight: 600}}
              />
            </div>
            <div>
              <label className="text-xs text-secondary mb-1" style={{display: 'block'}}>Reading</label>
              <input 
                type="number" min="1" max="36" 
                value={newReading} 
                onChange={(e) => setNewReading(parseInt(e.target.value) || 0)}
                style={{width: '100%', padding: '0.5rem', borderRadius: '4px', border: '1px solid #ccc', fontWeight: 600}}
              />
            </div>
            <div>
              <label className="text-xs text-secondary mb-1" style={{display: 'block'}}>Science {newType !== 'ACT' && '(N/A)'}</label>
              <input 
                type="number" min="0" max="36" 
                disabled={newType !== 'ACT'}
                value={newType === 'ACT' ? newScience : 0} 
                onChange={(e) => setNewScience(parseInt(e.target.value) || 0)}
                style={{width: '100%', padding: '0.5rem', borderRadius: '4px', border: '1px solid #ccc', fontWeight: 600}}
              />
            </div>
          </div>

          <button 
            type="submit"
            style={{
              backgroundColor: 'var(--accent-orange)',
              color: 'white',
              border: 'none',
              padding: '0.6rem 1.5rem',
              borderRadius: '4px',
              fontWeight: 600,
              cursor: 'pointer'
            }}
          >
            <span className="icon-text">
              <Icon className="ui-icon" name="check" size={16} />
              Save Test Attempt to Log
            </span>
          </button>
        </form>
      )}

      {/* Score Targets Banner — Directly Editable Inputs */}
      <div className="navy-card mb-6" style={{display: 'flex', justifyContent: 'space-around', padding: '1.5rem 2rem', alignItems: 'center'}}>
        <div className="text-center">
          <div className="text-xs text-secondary mb-2">CURRENT COMPOSITE BENCHMARK</div>
          <div style={{display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.25rem'}}>
            <input 
              type="number" 
              min="1" 
              max="36" 
              value={scores.composite || ''}
              onChange={(e) => handleChange('composite', e.target.value)}
              style={{
                width: '80px',
                textAlign: 'center',
                fontSize: '2rem',
                fontWeight: 700,
                fontFamily: 'var(--font-serif)',
                borderRadius: '8px',
                border: '2px solid var(--accent-orange)',
                backgroundColor: '#ffffff',
                color: 'var(--bg-navy)',
                padding: '0.25rem'
              }}
            />
          </div>
          <div className="text-orange" style={{fontSize: '0.75rem', marginTop: '0.35rem'}}>Current Highest</div>
        </div>

        <div style={{width: '1px', height: '50px', backgroundColor: 'rgba(255,255,255,0.15)'}}></div>

        <div className="text-center">
          <div className="text-xs text-secondary mb-2">1ST ATTEMPT TARGET</div>
          <div style={{display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.25rem'}}>
            <input 
              type="number" 
              min="1" 
              max="36" 
              value={scores.targetFirstAttempt || ''}
              onChange={(e) => handleChange('targetFirstAttempt', e.target.value)}
              style={{
                width: '80px',
                textAlign: 'center',
                fontSize: '2rem',
                fontWeight: 700,
                fontFamily: 'var(--font-serif)',
                borderRadius: '8px',
                border: '2px solid var(--accent-orange)',
                backgroundColor: '#ffffff',
                color: 'var(--bg-navy)',
                padding: '0.25rem'
              }}
            />
            <span style={{fontSize: '1.5rem', color: 'white', fontWeight: 600}}>+</span>
          </div>
          <div className="text-orange" style={{fontSize: '0.75rem', marginTop: '0.35rem'}}>Spring Jr. Year</div>
        </div>

        <div style={{width: '1px', height: '50px', backgroundColor: 'rgba(255,255,255,0.15)'}}></div>

        <div className="text-center">
          <div className="text-xs text-secondary mb-2">FINAL GOAL</div>
          <div style={{display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.25rem'}}>
            <input 
              type="number" 
              min="1" 
              max="36" 
              value={scores.targetFinal || ''}
              onChange={(e) => handleChange('targetFinal', e.target.value)}
              style={{
                width: '80px',
                textAlign: 'center',
                fontSize: '2rem',
                fontWeight: 700,
                fontFamily: 'var(--font-serif)',
                borderRadius: '8px',
                border: '2px solid var(--accent-orange)',
                backgroundColor: '#ffffff',
                color: 'var(--bg-navy)',
                padding: '0.25rem'
              }}
            />
            <span style={{fontSize: '1.5rem', color: 'white', fontWeight: 600}}>+</span>
          </div>
          <div className="text-orange" style={{fontSize: '0.75rem', marginTop: '0.35rem'}}>{displayTarget}</div>
        </div>
      </div>

      {/* Attempt History Log Table */}
      <div className="mb-6">
        <h2 className="section-title" style={{margin: '0 0 0.75rem 0'}}>Logged Test Attempts</h2>
        {student.testAttempts.length === 0 ? (
          <div className="white-card text-secondary text-sm">No test attempts logged yet. Click "Log New Test Attempt" above to add your first practice or official score.</div>
        ) : (
          <table className="course-table">
            <thead>
              <tr>
                <th>Test Type</th>
                <th>Date / Term</th>
                <th style={{textAlign: 'center'}}>English</th>
                <th style={{textAlign: 'center'}}>Math</th>
                <th style={{textAlign: 'center'}}>Reading</th>
                <th style={{textAlign: 'center'}}>Science</th>
                <th style={{textAlign: 'center'}}>Composite</th>
                <th>Notes</th>
                <th style={{textAlign: 'right'}}>Action</th>
              </tr>
            </thead>
            <tbody>
              {student.testAttempts.map(attempt => (
                <tr key={attempt.id}>
                  <td>
                    <span className="pill-badge" style={{
                      backgroundColor: attempt.testType === 'ACT' ? '#fef3c7' : attempt.testType === 'SAT' ? '#dbeafe' : '#ede9fe',
                      color: attempt.testType === 'ACT' ? '#b45309' : attempt.testType === 'SAT' ? '#1d4ed8' : '#7c3aed',
                      border: 'none',
                      fontWeight: 700
                    }}>
                      {attempt.testType}
                    </span>
                  </td>
                  <td style={{fontWeight: 600}}>{attempt.date}</td>
                  <td style={{textAlign: 'center'}}>{attempt.english || '—'}</td>
                  <td style={{textAlign: 'center'}}>{attempt.math || '—'}</td>
                  <td style={{textAlign: 'center'}}>{attempt.reading || '—'}</td>
                  <td style={{textAlign: 'center'}}>{attempt.science || '—'}</td>
                  <td style={{textAlign: 'center', fontWeight: 700, fontSize: '1rem', color: 'var(--bg-navy)'}}>{attempt.composite}</td>
                  <td className="text-secondary text-sm">{attempt.notes || '—'}</td>
                  <td style={{textAlign: 'right'}}>
                    <button 
                      aria-label={`Delete ${attempt.testType} attempt from ${attempt.date}`}
                      onClick={() => deleteTestAttempt(attempt.id)}
                      className="action-icon"
                      style={{background: 'none', border: 'none', color: '#ef4444', cursor: 'pointer', fontSize: '0.85rem'}}
                      title="Delete attempt"
                    >
                      <Icon className="ui-icon" name="trash" size={16} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {/* Section Breakdowns — Always Clickable Input Boxes */}
      <h2 className="section-title" style={{marginTop: '1.5rem', marginBottom: '0.75rem'}}>Current Section Breakdowns</h2>
      <div style={{display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '0.75rem'}}>
        
        {/* English */}
        <div className="white-card" style={{padding: '1.25rem'}}>
          <div className="text-xs text-secondary mb-2">ENGLISH</div>
          <div style={{display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.35rem'}}>
            <input 
              type="number" 
              min="1" 
              max="36" 
              value={scores.english || ''}
              onChange={(e) => handleChange('english', e.target.value)}
              style={{
                width: '65px',
                padding: '0.35rem',
                borderRadius: '6px',
                border: '2px solid var(--border-color)',
                fontSize: '1.25rem',
                fontWeight: 700,
                textAlign: 'center',
                backgroundColor: '#ffffff'
              }}
            />
            <span style={{color: '#15803d', fontSize: '0.9rem', fontWeight: 600}}>to {Math.min(36, (scores.english || 0) + 5)}</span>
          </div>
          <div className="text-secondary" style={{fontSize: '0.75rem'}}>Grammar & rhetoric rules</div>
        </div>

        {/* Math */}
        <div className="white-card" style={{padding: '1.25rem'}}>
          <div className="text-xs text-secondary mb-2">MATH</div>
          <div style={{display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.35rem'}}>
            <input 
              type="number" 
              min="1" 
              max="36" 
              value={scores.math || ''}
              onChange={(e) => handleChange('math', e.target.value)}
              style={{
                width: '65px',
                padding: '0.35rem',
                borderRadius: '6px',
                border: '2px solid var(--border-color)',
                fontSize: '1.25rem',
                fontWeight: 700,
                textAlign: 'center',
                backgroundColor: '#ffffff'
              }}
            />
            <span style={{color: '#15803d', fontSize: '0.9rem', fontWeight: 600}}>to {Math.min(36, (scores.math || 0) + 5)}</span>
          </div>
          <div className="text-secondary" style={{fontSize: '0.75rem'}}>Advanced algebra & trig</div>
        </div>

        {/* Reading */}
        <div className="white-card" style={{padding: '1.25rem'}}>
          <div className="text-xs text-secondary mb-2">READING</div>
          <div style={{display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.35rem'}}>
            <input 
              type="number" 
              min="1" 
              max="36" 
              value={scores.reading || ''}
              onChange={(e) => handleChange('reading', e.target.value)}
              style={{
                width: '65px',
                padding: '0.35rem',
                borderRadius: '6px',
                border: '2px solid var(--border-color)',
                fontSize: '1.25rem',
                fontWeight: 700,
                textAlign: 'center',
                backgroundColor: '#ffffff'
              }}
            />
            <span style={{color: '#15803d', fontSize: '0.9rem', fontWeight: 600}}>to {Math.min(36, (scores.reading || 0) + 5)}</span>
          </div>
          <div className="text-secondary" style={{fontSize: '0.75rem'}}>Passage timing & focus</div>
        </div>

        {/* Science */}
        <div className="white-card" style={{padding: '1.25rem'}}>
          <div className="text-xs text-secondary mb-2">SCIENCE</div>
          <div style={{display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.35rem'}}>
            <input 
              type="number" 
              min="1" 
              max="36" 
              value={scores.science || ''}
              onChange={(e) => handleChange('science', e.target.value)}
              style={{
                width: '65px',
                padding: '0.35rem',
                borderRadius: '6px',
                border: '2px solid var(--border-color)',
                fontSize: '1.25rem',
                fontWeight: 700,
                textAlign: 'center',
                backgroundColor: '#ffffff'
              }}
            />
            <span style={{color: '#15803d', fontSize: '0.9rem', fontWeight: 600}}>to {Math.min(36, (scores.science || 0) + 5)}</span>
          </div>
          <div className="text-secondary" style={{fontSize: '0.75rem'}}>Data & chart analysis</div>
        </div>
      </div>
    </div>
  );
}

export default TestPrep;
