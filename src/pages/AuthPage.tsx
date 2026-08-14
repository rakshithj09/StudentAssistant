import { useState, type FormEvent } from 'react';
import { Icon } from '../components/Icons';
import { useAuth } from '../context/AuthContext';

type AuthNotice = {
  kind: 'success' | 'error';
  message: string;
};

function AuthPage() {
  const { authError, clearAuthError, createAccountWithEmail, resetPassword, signInWithEmail, signInWithGoogle } = useAuth();
  const [mode, setMode] = useState<'signin' | 'signup'>('signin');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [googleSubmitting, setGoogleSubmitting] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [authNotice, setAuthNotice] = useState<AuthNotice | null>(null);

  const clearMessages = () => {
    clearAuthError();
    setAuthNotice(null);
  };

  const handleEmailSubmit = async (event: FormEvent) => {
    event.preventDefault();
    setAuthNotice(null);
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
    setAuthNotice(null);
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

  const handleResetPassword = async () => {
    const resetEmail = email.trim();

    if (!resetEmail) {
      setAuthNotice({ kind: 'error', message: 'Enter your email address first, then request a reset link.' });
      return;
    }

    setAuthNotice(null);
    setSubmitting(true);
    try {
      await resetPassword(resetEmail);
      setAuthNotice({
        kind: 'success',
        message: 'If an account exists for that email, a password reset link is on the way.',
      });
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
                clearMessages();
                setEmail(event.target.value);
              }}
              autoComplete="email"
              required
            />
          </div>

          <div>
            <label htmlFor="auth-password">Password</label>
            <div className="password-field">
              <input
                id="auth-password"
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(event) => {
                  clearMessages();
                  setPassword(event.target.value);
                }}
                autoComplete={mode === 'signup' ? 'new-password' : 'current-password'}
                minLength={6}
                required
              />
              <button
                type="button"
                className="password-toggle"
                onClick={() => setShowPassword((current) => !current)}
                aria-label={showPassword ? 'Hide password' : 'Show password'}
                title={showPassword ? 'Hide password' : 'Show password'}
              >
                <Icon className="ui-icon" name={showPassword ? 'eyeOff' : 'eye'} size={18} />
              </button>
            </div>
          </div>

          {authError ? (
            <div className="auth-message auth-message-error" role="alert">
              <Icon className="ui-icon" name="x" size={16} />
              <span>{authError}</span>
            </div>
          ) : null}

          {authNotice ? (
            <div className={`auth-message auth-message-${authNotice.kind}`} role={authNotice.kind === 'error' ? 'alert' : 'status'}>
              <Icon className="ui-icon" name={authNotice.kind === 'success' ? 'mail' : 'x'} size={16} />
              <span>{authNotice.message}</span>
            </div>
          ) : null}

          <button type="submit" className="primary-btn" disabled={submitting}>
            {submitting ? 'Please wait...' : mode === 'signup' ? 'Create account' : 'Sign in'}
          </button>
        </form>

        {mode === 'signin' ? (
          <button type="button" className="text-btn auth-reset-btn" onClick={handleResetPassword} disabled={submitting}>
            Reset password
          </button>
        ) : null}

        <button
          type="button"
          className="text-btn"
          onClick={() => {
            clearMessages();
            setMode(mode === 'signup' ? 'signin' : 'signup');
            setShowPassword(false);
          }}
        >
          {mode === 'signup' ? 'Already have an account? Sign in' : 'Need an account? Create one'}
        </button>
      </section>
    </main>
  );
}

export default AuthPage;
