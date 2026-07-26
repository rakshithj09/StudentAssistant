import { useEffect, useMemo, useState } from 'react';
import { ApiClientError, apiFetch } from '../api';
import {
  careerClusters,
  defaultProfile,
  generatedScheduleSchema,
  type GeneratedSchedule,
  mathLevels,
  rigorPreferences,
  schoolSystems,
  studentProfileSchema,
  type StudentProfile,
  type ScheduleTerm,
  testStatuses,
} from '../shared/planner';

interface User {
  id: string;
  email: string;
}

interface SavedSchedule {
  id: string;
  title: string;
  profileSnapshot: StudentProfile;
  generatedSchedule: GeneratedSchedule;
  createdAt: string;
  updatedAt: string;
}

const clusterLabels: Record<(typeof careerClusters)[number], string> = {
  stem: 'STEM',
  health: 'Health',
  business: 'Business',
  'arts-media': 'Arts / Media',
  'humanities-law': 'Humanities / Law',
  trades: 'Trades',
  undecided: 'Undecided',
};

function Planner() {
  const [user, setUser] = useState<User | null>(null);
  const [authMode, setAuthMode] = useState<'login' | 'register'>('register');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [profile, setProfile] = useState<StudentProfile>(defaultProfile);
  const [schedule, setSchedule] = useState<GeneratedSchedule | null>(null);
  const [savedSchedules, setSavedSchedules] = useState<SavedSchedule[]>([]);
  const [selectedScheduleId, setSelectedScheduleId] = useState<string | null>(null);
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    apiFetch<User>('/api/auth/me')
      .then((currentUser) => {
        setUser(currentUser);
        return Promise.all([
          apiFetch<StudentProfile | null>('/api/profile'),
          apiFetch<SavedSchedule[]>('/api/schedules'),
        ]);
      })
      .then(([savedProfile, schedules]) => {
        if (savedProfile) setProfile(savedProfile);
        setSavedSchedules(schedules);
      })
      .catch(() => undefined);
  }, []);

  const title = useMemo(() => {
    return `${profile.grade}th grade ${clusterLabels[profile.careerCluster]} plan`;
  }, [profile.grade, profile.careerCluster]);

  const handleAuth = async (event: React.FormEvent) => {
    event.preventDefault();
    setLoading(true);
    setMessage('');
    try {
      const endpoint = authMode === 'register' ? '/api/auth/register' : '/api/auth/login';
      const currentUser = await apiFetch<User>(endpoint, {
        method: 'POST',
        body: JSON.stringify({ email, password }),
      });
      setUser(currentUser);
      const [savedProfile, schedules] = await Promise.all([
        apiFetch<StudentProfile | null>('/api/profile'),
        apiFetch<SavedSchedule[]>('/api/schedules'),
      ]);
      if (savedProfile) setProfile(savedProfile);
      setSavedSchedules(schedules);
      setMessage('Signed in. Your planner is ready.');
    } catch (error) {
      setMessage(getErrorMessage(error));
    } finally {
      setLoading(false);
    }
  };

  const handleGenerate = async (event: React.FormEvent) => {
    event.preventDefault();
    setLoading(true);
    setMessage('');

    const parsed = studentProfileSchema.safeParse(profile);
    if (!parsed.success) {
      setMessage('Check the profile fields before generating a plan.');
      setLoading(false);
      return;
    }

    try {
      const generated = await apiFetch<GeneratedSchedule>('/api/schedules/generate', {
        method: 'POST',
        body: JSON.stringify(parsed.data),
      });
      setProfile(parsed.data);
      setSchedule(generated);
      setSelectedScheduleId(null);
      setMessage('Generated a personalized semester-by-semester plan.');
    } catch (error) {
      setMessage(getErrorMessage(error));
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {
    if (!schedule) return;
    setLoading(true);
    setMessage('');
    try {
      const parsed = generatedScheduleSchema.parse(schedule);
      const saved = selectedScheduleId
        ? await apiFetch<SavedSchedule>(`/api/schedules/${selectedScheduleId}`, {
            method: 'PUT',
            body: JSON.stringify({ title: parsed.title, generatedSchedule: parsed }),
          })
        : await apiFetch<SavedSchedule>('/api/schedules', {
            method: 'POST',
            body: JSON.stringify({ title: parsed.title || title, profileSnapshot: profile, generatedSchedule: parsed }),
          });
      setSelectedScheduleId(saved.id);
      setSavedSchedules((current) => [saved, ...current.filter((item) => item.id !== saved.id)]);
      setMessage('Schedule saved to your account.');
    } catch (error) {
      setMessage(getErrorMessage(error));
    } finally {
      setLoading(false);
    }
  };

  const loadSavedSchedule = (saved: SavedSchedule) => {
    setProfile(saved.profileSnapshot);
    setSchedule(saved.generatedSchedule);
    setSelectedScheduleId(saved.id);
    setMessage('Loaded saved schedule.');
  };

  const updateTerm = (index: number, term: ScheduleTerm) => {
    setSchedule((current) => {
      if (!current) return current;
      const terms = current.terms.map((item, itemIndex) => (itemIndex === index ? term : item));
      return { ...current, terms };
    });
  };

  if (!user) {
    return (
      <div className="container mt-8 mb-8 planner-page">
        <section className="planner-intro">
          <h1 className="heading-lg mb-2">Personalized Schedule Generator</h1>
          <p className="text-secondary">
            Create an account to save a private academic profile and generate a semester-by-semester college readiness plan.
          </p>
        </section>

        <form onSubmit={handleAuth} className="planner-card auth-card">
          <div className="segmented-control" aria-label="Authentication mode">
            <button type="button" className={authMode === 'register' ? 'active' : ''} onClick={() => setAuthMode('register')}>Create account</button>
            <button type="button" className={authMode === 'login' ? 'active' : ''} onClick={() => setAuthMode('login')}>Sign in</button>
          </div>
          <label>
            Email
            <input value={email} onChange={(event) => setEmail(event.target.value)} type="email" required autoComplete="email" />
          </label>
          <label>
            Password
            <input value={password} onChange={(event) => setPassword(event.target.value)} type="password" required minLength={10} autoComplete={authMode === 'register' ? 'new-password' : 'current-password'} />
          </label>
          <button type="submit" className="btn btn-primary" disabled={loading}>{loading ? 'Working...' : authMode === 'register' ? 'Create account' : 'Sign in'}</button>
          <p className="text-muted privacy-note">Academic scores are sensitive. They are used only for your authenticated planner profile.</p>
          {message && <p className="form-message">{message}</p>}
        </form>
      </div>
    );
  }

  return (
    <div className="container mt-8 mb-8 planner-page">
      <div className="planner-toolbar">
        <div>
          <h1 className="heading-lg mb-1">Personalized Schedule Generator</h1>
          <p className="text-secondary">Signed in as {user.email}</p>
        </div>
        <button
          type="button"
          className="btn btn-secondary no-print"
          onClick={() => apiFetch('/api/auth/logout', { method: 'POST' }).then(() => window.location.reload())}
        >
          Sign out
        </button>
      </div>

      {message && <div className="planner-alert no-print">{message}</div>}

      <div className="planner-layout">
        <form onSubmit={handleGenerate} className="planner-card profile-form no-print">
          <h2 className="heading-sm">Student Profile</h2>
          <div className="form-grid">
            <label>Current grade<select value={profile.grade} onChange={(event) => setProfile({ ...profile, grade: Number(event.target.value) })}>{[7, 8, 9, 10, 11, 12].map((grade) => <option key={grade} value={grade}>{grade}th grade</option>)}</select></label>
            <label>School system<select value={profile.schoolSystem} onChange={(event) => setProfile({ ...profile, schoolSystem: event.target.value as StudentProfile['schoolSystem'] })}>{schoolSystems.map((school) => <option key={school} value={school}>{school === 'bentonville' ? 'Bentonville Public' : 'Haas Hall Academy'}</option>)}</select></label>
            <label>Transfer preference<select value={profile.transferPreference} onChange={(event) => setProfile({ ...profile, transferPreference: event.target.value as StudentProfile['transferPreference'] })}><option value="haas-then-public">Haas math, then public school</option><option value="public">Public school route</option><option value="stay">Stay in current system</option></select></label>
            <label>Current math<select value={profile.currentMath} onChange={(event) => setProfile({ ...profile, currentMath: event.target.value as StudentProfile['currentMath'] })}>{mathLevels.map((math) => <option key={math} value={math}>{formatOption(math)}</option>)}</select></label>
            <label>GPA<input type="number" min="0" max="4" step="0.01" value={profile.gpa} onChange={(event) => setProfile({ ...profile, gpa: Number(event.target.value) })} required /></label>
            <label>Math grade<input type="number" min="0" max="100" value={profile.mathGrade} onChange={(event) => setProfile({ ...profile, mathGrade: Number(event.target.value) })} required /></label>
            <label>English grade<input type="number" min="0" max="100" value={profile.englishGrade} onChange={(event) => setProfile({ ...profile, englishGrade: Number(event.target.value) })} required /></label>
            <label>Science grade<input type="number" min="0" max="100" value={profile.scienceGrade} onChange={(event) => setProfile({ ...profile, scienceGrade: Number(event.target.value) })} required /></label>
            <label>Social studies grade<input type="number" min="0" max="100" value={profile.socialStudiesGrade} onChange={(event) => setProfile({ ...profile, socialStudiesGrade: Number(event.target.value) })} required /></label>
            <label>Test status<select value={profile.testStatus} onChange={(event) => setProfile({ ...profile, testStatus: event.target.value as StudentProfile['testStatus'] })}>{testStatuses.map((status) => <option key={status} value={status}>{formatOption(status)}</option>)}</select></label>
            <label>ACT composite<input type="number" min="1" max="36" value={profile.actComposite ?? ''} onChange={(event) => setProfile({ ...profile, actComposite: event.target.value ? Number(event.target.value) : undefined })} /></label>
            <label>SAT total<input type="number" min="400" max="1600" value={profile.satTotal ?? ''} onChange={(event) => setProfile({ ...profile, satTotal: event.target.value ? Number(event.target.value) : undefined })} /></label>
            <label>Career cluster<select value={profile.careerCluster} onChange={(event) => setProfile({ ...profile, careerCluster: event.target.value as StudentProfile['careerCluster'] })}>{careerClusters.map((cluster) => <option key={cluster} value={cluster}>{clusterLabels[cluster]}</option>)}</select></label>
            <label>Rigor preference<select value={profile.rigorPreference} onChange={(event) => setProfile({ ...profile, rigorPreference: event.target.value as StudentProfile['rigorPreference'] })}>{rigorPreferences.map((rigor) => <option key={rigor} value={rigor}>{formatOption(rigor)}</option>)}</select></label>
          </div>
          <label>Completed courses<input value={profile.completedCourses.join(', ')} onChange={(event) => setProfile({ ...profile, completedCourses: splitList(event.target.value) })} placeholder="Algebra I, Biology, Spanish I" /></label>
          <label>Extracurricular interests<input value={profile.extracurricularInterests.join(', ')} onChange={(event) => setProfile({ ...profile, extracurricularInterests: splitList(event.target.value) })} placeholder="Robotics, debate, volunteering" /></label>
          <button type="submit" className="btn btn-primary" disabled={loading}>{loading ? 'Generating...' : 'Generate personalized schedule'}</button>
        </form>

        <aside className="planner-card saved-list no-print">
          <h2 className="heading-sm">Saved Plans</h2>
          {savedSchedules.length === 0 ? <p className="text-muted">No saved schedules yet.</p> : savedSchedules.map((saved) => (
            <button key={saved.id} type="button" className="saved-plan-button" onClick={() => loadSavedSchedule(saved)}>
              <strong>{saved.title}</strong>
              <span>{new Date(saved.updatedAt).toLocaleDateString()}</span>
            </button>
          ))}
        </aside>
      </div>

      {schedule && (
        <section className="schedule-output">
          <div className="schedule-header">
            <div>
              <input className="schedule-title" value={schedule.title} onChange={(event) => setSchedule({ ...schedule, title: event.target.value })} />
              <p className="text-secondary">Readiness band: <strong>{schedule.readinessBand}</strong></p>
            </div>
            <div className="button-row no-print">
              <button type="button" className="btn btn-secondary" onClick={() => window.print()}>Print / export PDF</button>
              <button type="button" className="btn btn-primary" onClick={handleSave} disabled={loading}>Save plan</button>
            </div>
          </div>

          <div className="term-grid">
            {schedule.terms.map((term, index) => (
              <TermEditor key={`${term.grade}-${term.semester}`} term={term} onChange={(nextTerm) => updateTerm(index, nextTerm)} />
            ))}
          </div>

          <div className="planner-footnotes">
            {[...schedule.assumptions, ...schedule.warnings].map((note) => <p key={note}>{note}</p>)}
          </div>
        </section>
      )}
    </div>
  );
}

function TermEditor({ term, onChange }: { term: ScheduleTerm; onChange: (term: ScheduleTerm) => void }) {
  return (
    <article className="term-card">
      <div className="term-card-header">
        <h3>{term.grade}th Grade {term.semester}</h3>
        <span>{term.schoolSystem}</span>
      </div>
      <label>Courses<textarea value={term.courses.join('\n')} onChange={(event) => onChange({ ...term, courses: splitLines(event.target.value) })} /></label>
      <label>Milestones<textarea value={term.milestones.join('\n')} onChange={(event) => onChange({ ...term, milestones: splitLines(event.target.value) })} /></label>
      <label>Extracurricular focus<textarea value={term.extracurricularFocus} onChange={(event) => onChange({ ...term, extracurricularFocus: event.target.value })} /></label>
      <label>Why this term<textarea value={term.explanation} onChange={(event) => onChange({ ...term, explanation: event.target.value })} /></label>
    </article>
  );
}

function splitList(value: string) {
  return value.split(',').map((item) => item.trim()).filter(Boolean);
}

function splitLines(value: string) {
  return value.split('\n').map((item) => item.trim()).filter(Boolean);
}

function formatOption(value: string) {
  return value.split('-').map((word) => word[0].toUpperCase() + word.slice(1)).join(' ');
}

function getErrorMessage(error: unknown) {
  if (error instanceof ApiClientError) return error.message;
  if (error instanceof Error) return error.message;
  return 'Something went wrong.';
}

export default Planner;
