import ProfileForm from '../components/ProfileForm';

function Profile() {
  return (
    <div style={{ maxWidth: '900px', margin: '0 auto', width: '100%' }}>
      <h1 className="font-serif" style={{ fontSize: '2.5rem', marginBottom: '0.5rem', color: 'var(--bg-navy)' }}>
        Profile and Settings
      </h1>
      <p className="text-secondary mb-8">
        Update your planner profile. Changes save to your account and keep a device draft as a fallback.
      </p>

      <ProfileForm mode="settings" />
    </div>
  );
}

export default Profile;
