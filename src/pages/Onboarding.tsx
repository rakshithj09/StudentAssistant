import ProfileForm from '../components/ProfileForm';

function Onboarding() {
  return (
    <main className="auth-shell">
      <div className="onboarding-panel">
        <div>
          <img className="auth-brand-mark" src="/favicon.svg" alt="" />
          <h1 className="font-serif" style={{ fontSize: '2.5rem', margin: '1rem 0 0.5rem', color: 'var(--bg-navy)' }}>
            Set up your planner
          </h1>
          <p className="text-secondary">
            Complete the required fields first. Optional details make the planner more useful and can be changed later in Settings.
          </p>
        </div>

        <ProfileForm mode="onboarding" />
      </div>
    </main>
  );
}

export default Onboarding;
