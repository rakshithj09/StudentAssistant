import { useState, type FormEvent, type ReactNode } from 'react';
import { useStudent, type StudentState } from '../context/StudentContext';
import { Icon } from './Icons';

interface ProfileFormProps {
  mode: 'onboarding' | 'settings';
}

const inputStyle = {
  width: '100%',
  padding: '0.75rem',
  borderRadius: '6px',
  border: '1px solid #e5e7eb',
  backgroundColor: 'white',
};

const fieldGroupStyle = {
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fit, minmax(190px, 1fr))',
  gap: '1rem',
};

const requiredFields: Array<keyof StudentState> = [
  'name',
  'grade',
  'currentSchool',
  'schoolPathway',
  'diplomaPathway',
  'mathLevel',
];

function FieldLabel({ htmlFor, children, required = false }: { htmlFor: string; children: ReactNode; required?: boolean }) {
  return (
    <label htmlFor={htmlFor} className="text-secondary mb-1" style={{ display: 'block', fontSize: '0.9rem' }}>
      {children}{required ? ' *' : ''}
    </label>
  );
}

function ProfileForm({ mode }: ProfileFormProps) {
  const {
    student,
    updateStudent,
    updateActScores,
    updateGradReq,
    hasLocalDraft,
    importLocalDraft,
    profileSyncStatus,
    profileError,
  } = useStudent();
  const [saved, setSaved] = useState(false);
  const [validationError, setValidationError] = useState('');
  const isOnboarding = mode === 'onboarding';

  const updateCourseNote = (grade: string, value: string) => {
    updateStudent({
      coursePlanNotesByGrade: {
        ...student.coursePlanNotesByGrade,
        [grade]: value,
      },
    });
  };

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    const missingRequired = requiredFields.some((field) => String(student[field] ?? '').trim() === '');

    if (missingRequired) {
      setValidationError('Complete the required fields before continuing.');
      return;
    }

    setValidationError('');
    updateStudent({ profileComplete: true });
    setSaved(true);
    window.setTimeout(() => setSaved(false), 3000);
  };

  return (
    <form className="white-card profile-form" onSubmit={handleSubmit}>
      {hasLocalDraft ? (
        <div className="profile-callout">
          <div>
            <strong>Saved device profile found</strong>
            <div className="text-secondary text-sm">Import the previous local profile before saving this account profile.</div>
          </div>
          <button className="secondary-btn" type="button" onClick={importLocalDraft}>Import device profile</button>
        </div>
      ) : null}

      <section className="profile-section">
        <h2>Identity and School</h2>
        <div style={fieldGroupStyle}>
          <div>
            <FieldLabel htmlFor="student-name" required>Student Name</FieldLabel>
            <input
              id="student-name"
              type="text"
              value={student.name}
              onChange={(event) => updateStudent({ name: event.target.value })}
              placeholder="Enter student name"
              autoComplete="name"
              required
              style={inputStyle}
            />
          </div>
          <div>
            <FieldLabel htmlFor="student-grade" required>Current Grade</FieldLabel>
            <select
              id="student-grade"
              value={student.grade}
              onChange={(event) => updateStudent({ grade: event.target.value })}
              required
              style={inputStyle}
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
            <FieldLabel htmlFor="current-school" required>Current School</FieldLabel>
            <select
              id="current-school"
              value={student.currentSchool}
              onChange={(event) => updateStudent({ currentSchool: event.target.value as StudentState['currentSchool'] })}
              required
              style={inputStyle}
            >
              <option value="haas">Haas Hall Academy</option>
              <option value="bhs">Bentonville High School</option>
              <option value="bwhs">Bentonville West High School</option>
            </select>
          </div>
          <div>
            <FieldLabel htmlFor="public-target">Public Target School</FieldLabel>
            <select
              id="public-target"
              value={student.publicTarget}
              onChange={(event) => updateStudent({ publicTarget: event.target.value as StudentState['publicTarget'] })}
              style={inputStyle}
            >
              <option value="bhs">Bentonville High School</option>
              <option value="bwhs">Bentonville West High School</option>
            </select>
          </div>
        </div>
      </section>

      <section className="profile-section">
        <h2>Pathway</h2>
        <div className="radio-stack">
          <label className={`sel-card ${student.schoolPathway === 'haas_to_public' ? 'selected' : ''}`}>
            <input
              type="radio"
              name="schoolPathway"
              checked={student.schoolPathway === 'haas_to_public'}
              onChange={() => updateStudent({ schoolPathway: 'haas_to_public' })}
            />
            <span>Haas Hall first, then public high school</span>
          </label>
          <label className={`sel-card ${student.schoolPathway === 'haas_all' ? 'selected' : ''}`}>
            <input
              type="radio"
              name="schoolPathway"
              checked={student.schoolPathway === 'haas_all'}
              onChange={() => updateStudent({ schoolPathway: 'haas_all' })}
            />
            <span>Haas Hall through graduation</span>
          </label>
          <label className={`sel-card ${student.schoolPathway === 'public_all' ? 'selected' : ''}`}>
            <input
              type="radio"
              name="schoolPathway"
              checked={student.schoolPathway === 'public_all'}
              onChange={() => updateStudent({ schoolPathway: 'public_all' })}
            />
            <span>Public school pathway</span>
          </label>
        </div>
        <div style={{ ...fieldGroupStyle, marginTop: '1rem' }}>
          <div>
            <FieldLabel htmlFor="transfer-timing">Transfer Timing</FieldLabel>
            <input
              id="transfer-timing"
              type="text"
              value={student.transferTiming}
              onChange={(event) => updateStudent({ transferTiming: event.target.value })}
              placeholder="Example: after 9th grade"
              style={inputStyle}
            />
          </div>
          <div>
            <FieldLabel htmlFor="load-preference">Schedule Load</FieldLabel>
            <select
              id="load-preference"
              value={student.scheduleLoadPreference}
              onChange={(event) => updateStudent({ scheduleLoadPreference: event.target.value as StudentState['scheduleLoadPreference'] })}
              style={inputStyle}
            >
              <option value="balanced">Balanced</option>
              <option value="rigorous">Rigorous</option>
              <option value="lighter">Lighter</option>
            </select>
          </div>
        </div>
      </section>

      <section className="profile-section">
        <h2>Academic Planning</h2>
        <div style={fieldGroupStyle}>
          <div>
            <FieldLabel htmlFor="diploma-pathway" required>Diploma Pathway</FieldLabel>
            <select
              id="diploma-pathway"
              value={student.diplomaPathway}
              onChange={(event) => updateStudent({ diplomaPathway: event.target.value as StudentState['diplomaPathway'] })}
              required
              style={inputStyle}
            >
              <option value="high_honors">High Honors / Competitive College</option>
              <option value="honors">Bentonville Honors Diploma</option>
              <option value="standard">Arkansas Standard Diploma</option>
            </select>
          </div>
          <div>
            <FieldLabel htmlFor="math-level" required>Current Math Class</FieldLabel>
            <select
              id="math-level"
              value={student.mathLevel}
              onChange={(event) => updateStudent({ mathLevel: event.target.value })}
              required
              style={inputStyle}
            >
              <option value="pre-algebra">Math 7 / Pre-Algebra</option>
              <option value="algebra1">Algebra 1</option>
              <option value="geometry">Geometry</option>
              <option value="algebra2">Algebra 2</option>
              <option value="precal">Pre-Calculus</option>
              <option value="calc">Calculus / Statistics</option>
            </select>
          </div>
          <div>
            <FieldLabel htmlFor="rigor-preference">Course Rigor</FieldLabel>
            <select
              id="rigor-preference"
              value={student.courseRigorPreference}
              onChange={(event) => updateStudent({ courseRigorPreference: event.target.value as StudentState['courseRigorPreference'] })}
              style={inputStyle}
            >
              <option value="balanced">Balanced</option>
              <option value="advanced">Advanced</option>
              <option value="maximum">Maximum AP / Dual Enrollment</option>
            </select>
          </div>
          <div>
            <FieldLabel htmlFor="ap-de-interest">AP / Dual Enrollment</FieldLabel>
            <select
              id="ap-de-interest"
              value={student.apDualEnrollmentInterest}
              onChange={(event) => updateStudent({ apDualEnrollmentInterest: event.target.value as StudentState['apDualEnrollmentInterest'] })}
              style={inputStyle}
            >
              <option value="undecided">Undecided</option>
              <option value="yes">Interested</option>
              <option value="no">Not a priority</option>
            </select>
          </div>
        </div>

        <div className="credits-grid">
          {Object.entries(student.gradRequirements).map(([subject, requirement]) => (
            <div key={subject}>
              <FieldLabel htmlFor={`earned-${subject}`}>{subject} Credits Earned</FieldLabel>
              <input
                id={`earned-${subject}`}
                type="number"
                min="0"
                step="0.5"
                value={requirement.earned}
                onChange={(event) => updateGradReq(subject, 'earned', Number(event.target.value))}
                style={inputStyle}
              />
            </div>
          ))}
        </div>

        <div className="course-notes-grid">
          {['9', '10', '11', '12'].map((grade) => (
            <div key={grade}>
              <FieldLabel htmlFor={`courses-${grade}`}>Planned Grade {grade} Courses</FieldLabel>
              <textarea
                id={`courses-${grade}`}
                value={student.coursePlanNotesByGrade[grade] ?? ''}
                onChange={(event) => updateCourseNote(grade, event.target.value)}
                placeholder="Optional course notes"
                rows={3}
                style={inputStyle}
              />
            </div>
          ))}
        </div>
      </section>

      <section className="profile-section">
        <h2>Goals and Testing</h2>
        <div style={fieldGroupStyle}>
          <div>
            <FieldLabel htmlFor="estimated-gpa">Estimated GPA</FieldLabel>
            <input
              id="estimated-gpa"
              type="text"
              value={student.gpa}
              onChange={(event) => updateStudent({ gpa: event.target.value })}
              placeholder="Optional"
              inputMode="decimal"
              style={inputStyle}
            />
          </div>
          <div>
            <FieldLabel htmlFor="target-college">Target College / Program</FieldLabel>
            <input
              id="target-college"
              type="text"
              value={student.targetCollege}
              onChange={(event) => updateStudent({ targetCollege: event.target.value })}
              placeholder="Optional"
              style={inputStyle}
            />
          </div>
          <div>
            <FieldLabel htmlFor="career-interest">Career Interest</FieldLabel>
            <input
              id="career-interest"
              type="text"
              value={student.careerInterest}
              onChange={(event) => updateStudent({ careerInterest: event.target.value })}
              placeholder="Optional"
              style={inputStyle}
            />
          </div>
          <div>
            <FieldLabel htmlFor="test-preference">Testing Preference</FieldLabel>
            <select
              id="test-preference"
              value={student.testPreference}
              onChange={(event) => updateStudent({ testPreference: event.target.value as StudentState['testPreference'] })}
              style={inputStyle}
            >
              <option value="undecided">Undecided</option>
              <option value="ACT">ACT</option>
              <option value="SAT">SAT</option>
              <option value="both">Both ACT and SAT</option>
            </select>
          </div>
          <div>
            <FieldLabel htmlFor="current-act">Current ACT Composite</FieldLabel>
            <input
              id="current-act"
              type="number"
              min="0"
              max="36"
              value={student.actScores.composite}
              onChange={(event) => updateActScores({ composite: Number(event.target.value) })}
              style={inputStyle}
            />
          </div>
          <div>
            <FieldLabel htmlFor="target-act">Target ACT Composite</FieldLabel>
            <input
              id="target-act"
              type="number"
              min="0"
              max="36"
              value={student.actScores.targetFinal}
              onChange={(event) => updateActScores({ targetFinal: Number(event.target.value) })}
              style={inputStyle}
            />
          </div>
          <div>
            <FieldLabel htmlFor="current-sat">Current SAT Score</FieldLabel>
            <input
              id="current-sat"
              type="text"
              inputMode="numeric"
              value={student.satScore}
              onChange={(event) => updateStudent({ satScore: event.target.value })}
              placeholder="Optional"
              style={inputStyle}
            />
          </div>
          <div>
            <FieldLabel htmlFor="target-sat">Target SAT Score</FieldLabel>
            <input
              id="target-sat"
              type="text"
              inputMode="numeric"
              value={student.targetSatScore}
              onChange={(event) => updateStudent({ targetSatScore: event.target.value })}
              placeholder="Optional"
              style={inputStyle}
            />
          </div>
          <div>
            <FieldLabel htmlFor="psat-score">PSAT Score</FieldLabel>
            <input
              id="psat-score"
              type="text"
              inputMode="numeric"
              value={student.psatScore}
              onChange={(event) => updateStudent({ psatScore: event.target.value })}
              placeholder="Optional"
              style={inputStyle}
            />
          </div>
          <div>
            <FieldLabel htmlFor="first-test-term">Planned First Test Term</FieldLabel>
            <input
              id="first-test-term"
              type="text"
              value={student.plannedFirstTestTerm}
              onChange={(event) => updateStudent({ plannedFirstTestTerm: event.target.value })}
              placeholder="Example: Spring 10th"
              style={inputStyle}
            />
          </div>
        </div>
      </section>

      <section className="profile-section">
        <h2>Activities and Availability</h2>
        <div style={fieldGroupStyle}>
          <div>
            <FieldLabel htmlFor="activity-interests">Clubs, Sports, and Service Interests</FieldLabel>
            <textarea
              id="activity-interests"
              value={student.activityInterests}
              onChange={(event) => updateStudent({ activityInterests: event.target.value })}
              placeholder="Optional"
              rows={4}
              style={inputStyle}
            />
          </div>
          <div>
            <FieldLabel htmlFor="weekly-hours">Weekly Activity Availability</FieldLabel>
            <input
              id="weekly-hours"
              type="text"
              value={student.weeklyActivityHours}
              onChange={(event) => updateStudent({ weeklyActivityHours: event.target.value })}
              placeholder="Example: 6-8 hours"
              style={inputStyle}
            />
          </div>
        </div>
      </section>

      {validationError || profileError ? (
        <p className="form-error" role="alert">{validationError || profileError}</p>
      ) : null}

      <div className="profile-actions">
        <span className="text-secondary text-sm" aria-live="polite">
          {profileSyncStatus === 'saving' ? 'Saving to Firestore...' : profileSyncStatus === 'ready' ? 'Cloud profile synced' : 'Device draft saved'}
        </span>
        <button type="submit" className="primary-btn">
          {saved ? (
            <span className="icon-text">
              <Icon className="ui-icon" name="check" size={16} />
              {isOnboarding ? 'Profile ready' : 'Saved'}
            </span>
          ) : isOnboarding ? 'Finish setup' : 'Save profile'}
        </button>
      </div>
    </form>
  );
}

export default ProfileForm;
