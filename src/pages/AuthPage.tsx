import { useState, type FormEvent } from 'react';
import { useAuth } from '../context/AuthContext';

function AuthPage() {
  const { authError, clearAuthError, createAccountWithEmail, signInWithEmail, signInWithGoogle } = useAuth();
  const [mode, setMode] = useState<'signin' | 'signup'>('signin');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const handleEmailSubmit = async (event: FormEvent) => {
    event.preventDefault();
    setSubmitting(true);
    try {
      if (mode === 'signup') {
        await createAccountWithEmail(email, password);
      } else {
        await signInWithEmail(email, password);
      }
    } catch {
      // AuthContext turns Firebase errors into user-facing form text.
    } finally {
      setSubmitting(false);
    }
  };

  const handleGoogleSignIn = async () => {
    setSubmitting(true);
    try {
      await signInWithGoogle();
    } catch {
      // AuthContext turns Firebase errors into user-facing form text.
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <main className="auth-shell">
      <section className="auth-card" aria-labelledby="auth-title">
        <img className="auth-brand-mark" src="/favicon.svg" alt="" />
        <h1 id="auth-title" className="font-serif">Bentonville Student Assistant</h1>
        <p className="text-secondary">Sign in to save your planner profile to your Firebase account.</p>

        <button type="button" className="google-btn" onClick={handleGoogleSignIn} disabled={submitting}>
          Continue with Google
        </button>

        <div className="auth-divider"><span>or</span></div>

        <form onSubmit={handleEmailSubmit} className="auth-form">
          <div>
            <label htmlFor="auth-email">Email</label>
            <input
              id="auth-email"
              type="email"
              value={email}
              onChange={(event) => {
                clearAuthError();
                setEmail(event.target.value);
              }}
              autoComplete="email"
              required
            />
          </div>

          <div>
            <label htmlFor="auth-password">Password</label>
            <input
              id="auth-password"
              type="password"
              value={password}
              onChange={(event) => {
                clearAuthError();
                setPassword(event.target.value);
              }}
              autoComplete={mode === 'signup' ? 'new-password' : 'current-password'}
              minLength={6}
              required
            />
          </div>

          {authError ? <p className="form-error" role="alert">{authError}</p> : null}

          <button type="submit" className="primary-btn" disabled={submitting}>
            {submitting ? 'Please wait...' : mode === 'signup' ? 'Create account' : 'Sign in'}
          </button>
        </form>

        <button
          type="button"
          className="text-btn"
          onClick={() => {
            clearAuthError();
            setMode(mode === 'signup' ? 'signin' : 'signup');
          }}
        >
          {mode === 'signup' ? 'Already have an account? Sign in' : 'Need an account? Create one'}
        </button>
      </section>
    </main>
  );
}

export default AuthPage;
