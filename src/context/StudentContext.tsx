import { doc, getDoc, serverTimestamp, setDoc } from 'firebase/firestore';
import { createContext, useContext, useEffect, useMemo, useRef, useState, type ReactNode } from 'react';
import { db } from '../lib/firebase';
import { useAuth } from './AuthContext';

export interface GradRequirement {
  earned: number;
  needed: number;
}

export type SchoolPathwayOption = 'haas_to_public' | 'haas_all' | 'public_all';
export type PublicSchoolTarget = 'bhs' | 'bwhs';
export type DiplomaPathway = 'high_honors' | 'honors' | 'standard';
export type CourseRigorPreference = 'balanced' | 'advanced' | 'maximum';
export type TestPreference = 'ACT' | 'SAT' | 'both' | 'undecided';
export type ApDualEnrollmentInterest = 'yes' | 'no' | 'undecided';
export type ScheduleLoadPreference = 'balanced' | 'rigorous' | 'lighter';

export interface TestAttempt {
  id: string;
  testType: 'ACT' | 'SAT' | 'PSAT';
  date: string;
  english: number;
  math: number;
  reading: number;
  science: number;
  composite: number;
  notes?: string;
}

export interface ActScores {
  composite: number;
  targetFirstAttempt: number;
  targetFinal: number;
  english: number;
  math: number;
  reading: number;
  science: number;
}

export interface StudentState {
  profileComplete: boolean;
  name: string;
  grade: string;
  currentSchool: 'haas' | 'bhs' | 'bwhs';
  schoolPathway: SchoolPathwayOption;
  publicTarget: PublicSchoolTarget;
  diplomaPathway: DiplomaPathway;
  mathLevel: string;
  gpa: string;
  targetCollege: string;
  careerInterest: string;
  courseRigorPreference: CourseRigorPreference;
  testPreference: TestPreference;
  satScore: string;
  targetSatScore: string;
  psatScore: string;
  plannedFirstTestTerm: string;
  weeklyActivityHours: string;
  activityInterests: string;
  transferTiming: string;
  apDualEnrollmentInterest: ApDualEnrollmentInterest;
  scheduleLoadPreference: ScheduleLoadPreference;
  coursePlanNotesByGrade: Record<string, string>;
  actScores: ActScores;
  testAttempts: TestAttempt[];
  gradRequirements: Record<string, GradRequirement>;
  selectedCourses: Record<string, string[]>;
  selectedActivities: string[];
  selectedSports: string[];
  selectedServices: string[];
}

export type ProfileSyncStatus = 'local' | 'loading' | 'ready' | 'saving' | 'error';

interface StudentContextType {
  student: StudentState;
  profileLoading: boolean;
  profileSyncStatus: ProfileSyncStatus;
  profileError: string;
  hasLocalDraft: boolean;
  importLocalDraft: () => void;
  updateStudent: (updates: Partial<StudentState>) => void;
  updateActScores: (scores: Partial<ActScores>) => void;
  addTestAttempt: (attempt: Omit<TestAttempt, 'id'>) => void;
  deleteTestAttempt: (id: string) => void;
  toggleCourse: (grade: string, courseId: string) => void;
  toggleActivity: (id: string) => void;
  toggleSport: (id: string) => void;
  toggleService: (id: string) => void;
  updateGradReq: (subject: string, field: 'earned' | 'needed', value: number) => void;
}

export const DIPLOMA_REQUIREMENTS: Record<DiplomaPathway, Record<string, number>> = {
  high_honors: {
    'English': 4,
    'Math': 4,
    'Science': 4,
    'Social Studies': 5,
    'World Language': 4,
    'Fine Arts': 1,
    'CTE': 1,
    'PE/Health': 1,
  },
  honors: {
    'English': 4,
    'Math': 4,
    'Science': 3,
    'Social Studies': 3,
    'World Language': 2,
    'Fine Arts': 1,
    'CTE': 1,
    'PE/Health': 1,
  },
  standard: {
    'English': 4,
    'Math': 3,
    'Science': 3,
    'Social Studies': 3,
    'World Language': 0,
    'Fine Arts': 0.5,
    'CTE': 1,
    'PE/Health': 1,
  }
};

const STORAGE_KEY = 'bentonville-student-planner-profile';

const defaultGradRequirements: Record<string, GradRequirement> = {
  'English': { earned: 0, needed: 4 },
  'Math': { earned: 0, needed: 4 },
  'Science': { earned: 0, needed: 4 },
  'Social Studies': { earned: 0, needed: 5 },
  'World Language': { earned: 0, needed: 4 },
  'Fine Arts': { earned: 0, needed: 1 },
  'CTE': { earned: 0, needed: 1 },
  'PE/Health': { earned: 0, needed: 1 },
};

const defaultState: StudentState = {
  profileComplete: false,
  name: '',
  grade: '9',
  currentSchool: 'haas',
  schoolPathway: 'haas_to_public',
  publicTarget: 'bhs',
  diplomaPathway: 'high_honors',
  mathLevel: 'pre-algebra',
  gpa: '',
  targetCollege: '',
  careerInterest: '',
  courseRigorPreference: 'balanced',
  testPreference: 'undecided',
  satScore: '',
  targetSatScore: '',
  psatScore: '',
  plannedFirstTestTerm: '',
  weeklyActivityHours: '',
  activityInterests: '',
  transferTiming: '',
  apDualEnrollmentInterest: 'undecided',
  scheduleLoadPreference: 'balanced',
  coursePlanNotesByGrade: { '9': '', '10': '', '11': '', '12': '' },
  actScores: {
    composite: 0,
    targetFirstAttempt: 0,
    targetFinal: 0,
    english: 0,
    math: 0,
    reading: 0,
    science: 0,
  },
  testAttempts: [],
  gradRequirements: defaultGradRequirements,
  selectedCourses: { '9': [], '10': [], '11': [], '12': [] },
  selectedActivities: [],
  selectedSports: [],
  selectedServices: [],
};

const isRecord = (value: unknown): value is Record<string, unknown> => (
  typeof value === 'object' && value !== null && !Array.isArray(value)
);

const mergeStoredState = (stored: unknown): StudentState => {
  if (!isRecord(stored)) return defaultState;

  return {
    ...defaultState,
    ...stored,
    profileComplete: stored.profileComplete === true,
    actScores: isRecord(stored.actScores)
      ? { ...defaultState.actScores, ...stored.actScores }
      : defaultState.actScores,
    testAttempts: Array.isArray(stored.testAttempts) ? stored.testAttempts as TestAttempt[] : defaultState.testAttempts,
    gradRequirements: isRecord(stored.gradRequirements)
      ? { ...defaultState.gradRequirements, ...stored.gradRequirements as Record<string, GradRequirement> }
      : defaultState.gradRequirements,
    selectedCourses: isRecord(stored.selectedCourses)
      ? { ...defaultState.selectedCourses, ...stored.selectedCourses as Record<string, string[]> }
      : defaultState.selectedCourses,
    coursePlanNotesByGrade: isRecord(stored.coursePlanNotesByGrade)
      ? { ...defaultState.coursePlanNotesByGrade, ...stored.coursePlanNotesByGrade as Record<string, string> }
      : defaultState.coursePlanNotesByGrade,
    selectedActivities: Array.isArray(stored.selectedActivities) ? stored.selectedActivities as string[] : defaultState.selectedActivities,
    selectedSports: Array.isArray(stored.selectedSports) ? stored.selectedSports as string[] : defaultState.selectedSports,
    selectedServices: Array.isArray(stored.selectedServices) ? stored.selectedServices as string[] : defaultState.selectedServices,
  };
};

const loadStudentState = (): StudentState => {
  try {
    const stored = window.localStorage.getItem(STORAGE_KEY);
    if (!stored) return defaultState;
    return mergeStoredState(JSON.parse(stored));
  } catch {
    return defaultState;
  }
};

const hasStoredDraft = () => {
  try {
    return Boolean(window.localStorage.getItem(STORAGE_KEY));
  } catch {
    return false;
  }
};

const stripFirestoreMetadata = (data: Record<string, unknown>) => {
  const { updatedAt: _updatedAt, ...studentData } = data;
  return studentData;
};

const StudentContext = createContext<StudentContextType | undefined>(undefined);

export function StudentProvider({ children }: { children: ReactNode }) {
  const { user, loading: authLoading } = useAuth();
  const [student, setStudent] = useState<StudentState>(loadStudentState);
  const [profileSyncStatus, setProfileSyncStatus] = useState<ProfileSyncStatus>('local');
  const [profileError, setProfileError] = useState('');
  const [hasLocalDraft, setHasLocalDraft] = useState(hasStoredDraft);
  const loadedCloudUserRef = useRef<string | null>(null);
  const localDraftRef = useRef<StudentState | null>(hasStoredDraft() ? loadStudentState() : null);
  const lastCloudStateRef = useRef<string>('');

  const profileLoading = authLoading || profileSyncStatus === 'loading';

  useEffect(() => {
    setHasLocalDraft(hasStoredDraft());
  }, [user]);

  useEffect(() => {
    if (authLoading) return;

    if (!user) {
      loadedCloudUserRef.current = null;
      lastCloudStateRef.current = '';
      setStudent(loadStudentState());
      setProfileSyncStatus('local');
      setProfileError('');
      return;
    }

    let cancelled = false;
    localDraftRef.current = hasStoredDraft() ? loadStudentState() : null;
    setHasLocalDraft(Boolean(localDraftRef.current));
    setProfileSyncStatus('loading');
    setProfileError('');

    const loadCloudProfile = async () => {
      try {
        const profileRef = doc(db, 'users', user.uid, 'planner', 'state');
        const snapshot = await getDoc(profileRef);
        if (cancelled) return;

        if (snapshot.exists()) {
          const snapshotData = stripFirestoreMetadata(snapshot.data());
          const cloudState = mergeStoredState(snapshotData);
          setStudent(cloudState);
          lastCloudStateRef.current = JSON.stringify(cloudState);
        } else {
          const localState = loadStudentState();
          setStudent(localState);
          lastCloudStateRef.current = JSON.stringify(localState);
        }

        loadedCloudUserRef.current = user.uid;
        setProfileSyncStatus('ready');
      } catch {
        if (cancelled) return;
        loadedCloudUserRef.current = null;
        setProfileSyncStatus('error');
        setProfileError('Could not load your cloud profile. Your device copy is still available.');
        setStudent(loadStudentState());
      }
    };

    void loadCloudProfile();

    return () => {
      cancelled = true;
    };
  }, [authLoading, user]);

  useEffect(() => {
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(student));
      if (!user) {
        setHasLocalDraft(true);
      }
    } catch {
      // Local storage can fail in private browsing or restricted environments.
    }
  }, [student, user]);

  useEffect(() => {
    if (!user || loadedCloudUserRef.current !== user.uid || profileSyncStatus === 'loading') {
      return;
    }

    const serializedStudent = JSON.stringify(student);
    if (serializedStudent === lastCloudStateRef.current) {
      return;
    }

    let cancelled = false;
    setProfileSyncStatus('saving');

    const saveCloudProfile = async () => {
      try {
        const profileRef = doc(db, 'users', user.uid, 'planner', 'state');
        await setDoc(profileRef, { ...student, updatedAt: serverTimestamp() }, { merge: true });
        if (!cancelled) {
          lastCloudStateRef.current = serializedStudent;
          setProfileSyncStatus('ready');
        }
      } catch {
        if (!cancelled) {
          setProfileSyncStatus('error');
          setProfileError('Could not save to Firestore. Changes remain saved on this device.');
        }
      }
    };

    const timeoutId = window.setTimeout(() => {
      void saveCloudProfile();
    }, 500);

    return () => {
      cancelled = true;
      window.clearTimeout(timeoutId);
    };
  }, [profileSyncStatus, student, user]);

  const updateStudent = (updates: Partial<StudentState>) => {
    setStudent(prev => {
      const nextState = { ...prev, ...updates };

      if (updates.diplomaPathway && updates.diplomaPathway !== prev.diplomaPathway) {
        const neededTemplate = DIPLOMA_REQUIREMENTS[updates.diplomaPathway];
        const updatedGradReqs: Record<string, GradRequirement> = {};

        Object.keys(prev.gradRequirements).forEach(subject => {
          updatedGradReqs[subject] = {
            earned: prev.gradRequirements[subject].earned,
            needed: neededTemplate[subject] ?? prev.gradRequirements[subject].needed,
          };
        });
        nextState.gradRequirements = updatedGradReqs;
      }

      return nextState;
    });
  };

  const value = useMemo<StudentContextType>(() => ({
    student,
    profileLoading,
    profileSyncStatus,
    profileError,
    hasLocalDraft,
    importLocalDraft: () => {
      const draft = localDraftRef.current ?? loadStudentState();
      setStudent(draft);
      setHasLocalDraft(false);
    },
    updateStudent,
    updateActScores: (scores) => {
      setStudent(prev => ({
        ...prev,
        actScores: { ...prev.actScores, ...scores },
      }));
    },
    addTestAttempt: (attempt) => {
      const newAttempt: TestAttempt = {
        ...attempt,
        id: `att-${Date.now()}`
      };
      setStudent(prev => ({
        ...prev,
        testAttempts: [newAttempt, ...prev.testAttempts]
      }));
    },
    deleteTestAttempt: (id) => {
      setStudent(prev => ({
        ...prev,
        testAttempts: prev.testAttempts.filter(a => a.id !== id)
      }));
    },
    toggleCourse: (grade, courseId) => {
      setStudent(prev => {
        const current = prev.selectedCourses[grade] || [];
        const updated = current.includes(courseId)
          ? current.filter(id => id !== courseId)
          : [...current, courseId];
        return { ...prev, selectedCourses: { ...prev.selectedCourses, [grade]: updated } };
      });
    },
    toggleActivity: (id) => {
      setStudent(prev => ({
        ...prev,
        selectedActivities: prev.selectedActivities.includes(id)
          ? prev.selectedActivities.filter(x => x !== id)
          : [...prev.selectedActivities, id],
      }));
    },
    toggleSport: (id) => {
      setStudent(prev => ({
        ...prev,
        selectedSports: prev.selectedSports.includes(id)
          ? prev.selectedSports.filter(x => x !== id)
          : [...prev.selectedSports, id],
      }));
    },
    toggleService: (id) => {
      setStudent(prev => ({
        ...prev,
        selectedServices: prev.selectedServices.includes(id)
          ? prev.selectedServices.filter(x => x !== id)
          : [...prev.selectedServices, id],
      }));
    },
    updateGradReq: (subject, field, value) => {
      setStudent(prev => ({
        ...prev,
        gradRequirements: {
          ...prev.gradRequirements,
          [subject]: { ...prev.gradRequirements[subject], [field]: Math.max(0, value) },
        },
      }));
    },
  }), [hasLocalDraft, profileError, profileLoading, profileSyncStatus, student]);

  return (
    <StudentContext.Provider value={value}>
      {children}
    </StudentContext.Provider>
  );
}

export function useStudent() {
  const context = useContext(StudentContext);
  if (context === undefined) {
    throw new Error('useStudent must be used within a StudentProvider');
  }
  return context;
}
