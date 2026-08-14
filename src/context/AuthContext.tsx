import { FirebaseError } from 'firebase/app';
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  type User,
} from 'firebase/auth';
import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from 'react';
import { auth, googleProvider } from '../lib/firebase';

interface AuthContextType {
  user: User | null;
  loading: boolean;
  authError: string;
  clearAuthError: () => void;
  createAccountWithEmail: (email: string, password: string) => Promise<void>;
  signInWithEmail: (email: string, password: string) => Promise<void>;
  signInWithGoogle: () => Promise<void>;
  logOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const getAuthMessage = (error: unknown): string => {
  if (!(error instanceof FirebaseError)) {
    return 'Authentication failed. Try again.';
  }

  switch (error.code) {
    case 'auth/email-already-in-use':
      return 'An account already exists for that email.';
    case 'auth/invalid-credential':
    case 'auth/wrong-password':
    case 'auth/user-not-found':
      return 'Email or password is incorrect.';
    case 'auth/popup-closed-by-user':
      return 'Google sign-in was closed before it finished.';
    case 'auth/operation-not-allowed':
      return 'Google sign-in is not enabled yet. In Firebase Console, enable Authentication > Sign-in method > Google.';
    case 'auth/unauthorized-domain':
      return `This domain is not authorized for Firebase Auth. Add ${window.location.hostname} in Firebase Authentication > Settings > Authorized domains.`;
    case 'auth/popup-blocked':
      return 'The Google sign-in popup was blocked. Allow popups for this site and try again.';
    case 'auth/cancelled-popup-request':
      return 'Another Google sign-in popup is already open. Close it and try again.';
    case 'auth/api-key-not-valid.-please-pass-a-valid-api-key.':
    case 'auth/invalid-api-key':
      return 'The Firebase API key in the deployed app is invalid. Check the VITE_FIREBASE_API_KEY GitHub secret.';
    case 'auth/weak-password':
      return 'Use a password with at least 6 characters.';
    default:
      return `Authentication failed (${error.code}). Check your Firebase setup and try again.`;
  }
};

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [authError, setAuthError] = useState('');

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (nextUser) => {
      setUser(nextUser);
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  const value = useMemo<AuthContextType>(() => ({
    user,
    loading,
    authError,
    clearAuthError: () => setAuthError(''),
    createAccountWithEmail: async (email, password) => {
      setAuthError('');
      try {
        await createUserWithEmailAndPassword(auth, email, password);
      } catch (error) {
        setAuthError(getAuthMessage(error));
        throw error;
      }
    },
    signInWithEmail: async (email, password) => {
      setAuthError('');
      try {
        await signInWithEmailAndPassword(auth, email, password);
      } catch (error) {
        setAuthError(getAuthMessage(error));
        throw error;
      }
    },
    signInWithGoogle: async () => {
      setAuthError('');
      try {
        await signInWithPopup(auth, googleProvider);
      } catch (error) {
        setAuthError(getAuthMessage(error));
        throw error;
      }
    },
    logOut: async () => {
      setAuthError('');
      await signOut(auth);
    },
  }), [authError, loading, user]);

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
