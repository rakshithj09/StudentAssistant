import { createContext, useContext, useState, type ReactNode } from 'react';

export interface GradRequirement {
  earned: number;
  needed: number;
}

export type SchoolPathwayOption = 'haas_to_public' | 'haas_all' | 'public_all';
export type PublicSchoolTarget = 'bhs' | 'bwhs';
export type DiplomaPathway = 'high_honors' | 'honors' | 'standard';

export interface TestAttempt {
  id: string;
  testType: 'ACT' | 'SAT' | 'PSAT';
  date: string; // e.g. "April 2026"
  english: number;
  math: number;
  reading: number;
  science: number; // for ACT
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
  name: string;
  grade: string;
  currentSchool: 'haas' | 'bhs' | 'bwhs';
  schoolPathway: SchoolPathwayOption;
  publicTarget: PublicSchoolTarget;
  diplomaPathway: DiplomaPathway;
  mathLevel: string;
  gpa: string;
  targetCollege: string;
  actScores: ActScores;
  testAttempts: TestAttempt[]; // Logged test attempts
  gradRequirements: Record<string, GradRequirement>;
  selectedCourses: Record<string, string[]>;
  selectedActivities: string[];
  selectedSports: string[];
  selectedServices: string[];
}

interface StudentContextType {
  student: StudentState;
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

const defaultState: StudentState = {
  name: 'Maya Chen',
  grade: '10',
  currentSchool: 'haas',
  schoolPathway: 'haas_to_public',
  publicTarget: 'bhs',
  diplomaPathway: 'high_honors',
  mathLevel: 'algebra2',
  gpa: '4.2',
  targetCollege: 'University of Arkansas Honors',
  actScores: {
    composite: 28,
    targetFirstAttempt: 30,
    targetFinal: 33,
    english: 28,
    math: 30,
    reading: 26,
    science: 27,
  },
  testAttempts: [
    {
      id: 'att-1',
      testType: 'PSAT',
      date: 'October 2025',
      english: 28,
      math: 29,
      reading: 27,
      science: 0,
      composite: 28,
      notes: '10th grade PSAT practice benchmark'
    },
    {
      id: 'att-2',
      testType: 'ACT',
      date: 'April 2026',
      english: 28,
      math: 30,
      reading: 26,
      science: 27,
      composite: 28,
      notes: 'First official ACT attempt'
    }
  ],
  gradRequirements: {
    'English':        { earned: 2, needed: 4 },
    'Math':           { earned: 2, needed: 4 },
    'Science':        { earned: 2, needed: 4 },
    'Social Studies':  { earned: 1, needed: 5 },
    'World Language':  { earned: 2, needed: 4 },
    'Fine Arts':       { earned: 0, needed: 1 },
    'CTE':            { earned: 0, needed: 1 },
    'PE/Health':       { earned: 0, needed: 1 },
  },
  selectedCourses: { '9': [], '10': [], '11': [], '12': [] },
  selectedActivities: [],
  selectedSports: [],
  selectedServices: [],
};

const StudentContext = createContext<StudentContextType | undefined>(undefined);

export function StudentProvider({ children }: { children: ReactNode }) {
  const [student, setStudent] = useState<StudentState>(defaultState);

  const updateStudent = (updates: Partial<StudentState>) => {
    setStudent(prev => {
      const nextState = { ...prev, ...updates };

      if (updates.diplomaPathway && updates.diplomaPathway !== prev.diplomaPathway) {
        const neededTemplate = DIPLOMA_REQUIREMENTS[updates.diplomaPathway];
        const updatedGradReqs: Record<string, GradRequirement> = {};
        
        Object.keys(prev.gradRequirements).forEach(subj => {
          updatedGradReqs[subj] = {
            earned: prev.gradRequirements[subj].earned,
            needed: neededTemplate[subj] ?? prev.gradRequirements[subj].needed,
          };
        });
        nextState.gradRequirements = updatedGradReqs;
      }

      return nextState;
    });
  };

  const updateActScores = (scores: Partial<ActScores>) => {
    setStudent(prev => ({
      ...prev,
      actScores: { ...prev.actScores, ...scores },
    }));
  };

  const addTestAttempt = (attempt: Omit<TestAttempt, 'id'>) => {
    const newAttempt: TestAttempt = {
      ...attempt,
      id: `att-${Date.now()}`
    };
    setStudent(prev => ({
      ...prev,
      testAttempts: [newAttempt, ...prev.testAttempts]
    }));
  };

  const deleteTestAttempt = (id: string) => {
    setStudent(prev => ({
      ...prev,
      testAttempts: prev.testAttempts.filter(a => a.id !== id)
    }));
  };

  const toggleCourse = (grade: string, courseId: string) => {
    setStudent(prev => {
      const current = prev.selectedCourses[grade] || [];
      const updated = current.includes(courseId)
        ? current.filter(id => id !== courseId)
        : [...current, courseId];
      return { ...prev, selectedCourses: { ...prev.selectedCourses, [grade]: updated } };
    });
  };

  const toggleActivity = (id: string) => {
    setStudent(prev => ({
      ...prev,
      selectedActivities: prev.selectedActivities.includes(id)
        ? prev.selectedActivities.filter(x => x !== id)
        : [...prev.selectedActivities, id],
    }));
  };

  const toggleSport = (id: string) => {
    setStudent(prev => ({
      ...prev,
      selectedSports: prev.selectedSports.includes(id)
        ? prev.selectedSports.filter(x => x !== id)
        : [...prev.selectedSports, id],
    }));
  };

  const toggleService = (id: string) => {
    setStudent(prev => ({
      ...prev,
      selectedServices: prev.selectedServices.includes(id)
        ? prev.selectedServices.filter(x => x !== id)
        : [...prev.selectedServices, id],
    }));
  };

  const updateGradReq = (subject: string, field: 'earned' | 'needed', value: number) => {
    setStudent(prev => ({
      ...prev,
      gradRequirements: {
        ...prev.gradRequirements,
        [subject]: { ...prev.gradRequirements[subject], [field]: Math.max(0, value) },
      },
    }));
  };

  return (
    <StudentContext.Provider value={{
      student, updateStudent, updateActScores, addTestAttempt, deleteTestAttempt, toggleCourse,
      toggleActivity, toggleSport, toggleService, updateGradReq,
    }}>
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
