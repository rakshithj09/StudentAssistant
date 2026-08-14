import { useState, type FormEvent } from 'react';
import { useAuth } from '../context/AuthContext';

function AuthPage() {
  const { authError, clearAuthError, createAccountWithEmail, signInWithEmail, signInWithGoogle } = useAuth();
  const [mode, setMode] = useState<'signin' | 'signup'>('signin');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [googleSubmitting, setGoogleSubmitting] = useState(false);

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
    setGoogleSubmitting(true);
    try {
      await signInWithGoogle();
    } catch {
      // AuthContext turns Firebase errors into user-facing form text.
    } finally {
      setGoogleSubmitting(false);
      setSubmitting(false);
    }
  };

  return (
    <main className="auth-shell">
      <section className="auth-card" aria-labelledby="auth-title">
        <img className="auth-brand-mark" src="/favicon.svg" alt="" />
        <h1 id="auth-title" className="font-serif">Bentonville Student Assistant</h1>
        <p className="text-secondary">Sign in to save your planner profile to your  account.</p>

        <button type="button" className="google-btn" onClick={handleGoogleSignIn} disabled={submitting}>
          <svg className="google-mark" viewBox="0 0 24 24" aria-hidden="true" focusable="false">
            <path fill="#4285f4" d="M23.5 12.3c0-.8-.1-1.6-.2-2.3H12v4.4h6.5c-.3 1.5-1.1 2.8-2.4 3.6v3h3.9c2.3-2.1 3.5-5.1 3.5-8.7z" />
            <path fill="#34a853" d="M12 24c3.2 0 5.9-1.1 7.9-2.9l-3.9-3c-1.1.7-2.5 1.2-4 1.2-3.1 0-5.7-2.1-6.6-4.9h-4v3.1C3.4 21.4 7.4 24 12 24z" />
            <path fill="#fbbc05" d="M5.4 14.4c-.2-.7-.4-1.5-.4-2.4s.1-1.7.4-2.4V6.5h-4C.5 8.2 0 10.1 0 12s.5 3.8 1.4 5.5l4-3.1z" />
            <path fill="#ea4335" d="M12 4.8c1.7 0 3.3.6 4.5 1.8L20 3.2C17.9 1.2 15.2 0 12 0 7.4 0 3.4 2.6 1.4 6.5l4 3.1c.9-2.8 3.5-4.8 6.6-4.8z" />
          </svg>
          <span>{googleSubmitting ? 'Opening Google...' : 'Continue with Google'}</span>
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
