import { z } from 'zod';

export const schoolSystems = ['bentonville', 'haas'] as const;
export const careerClusters = ['stem', 'health', 'business', 'arts-media', 'humanities-law', 'trades', 'undecided'] as const;
export const rigorPreferences = ['balanced', 'advanced', 'supportive'] as const;
export const mathLevels = ['pre-algebra', 'algebra1', 'geometry', 'algebra2', 'precalculus', 'calculus'] as const;
export const testStatuses = ['not-started', 'practice', 'official'] as const;

export const studentProfileSchema = z.object({
  grade: z.coerce.number().int().min(7).max(12),
  schoolSystem: z.enum(schoolSystems),
  transferPreference: z.enum(['stay', 'haas-then-public', 'public']).default('haas-then-public'),
  currentMath: z.enum(mathLevels),
  completedCourses: z.array(z.string().trim().min(1).max(80)).max(24).default([]),
  gpa: z.coerce.number().min(0).max(4),
  mathGrade: z.coerce.number().int().min(0).max(100),
  englishGrade: z.coerce.number().int().min(0).max(100),
  scienceGrade: z.coerce.number().int().min(0).max(100),
  socialStudiesGrade: z.coerce.number().int().min(0).max(100),
  testStatus: z.enum(testStatuses),
  actComposite: z.coerce.number().int().min(1).max(36).optional().or(z.literal('').transform(() => undefined)),
  satTotal: z.coerce.number().int().min(400).max(1600).optional().or(z.literal('').transform(() => undefined)),
  careerCluster: z.enum(careerClusters),
  rigorPreference: z.enum(rigorPreferences),
  extracurricularInterests: z.array(z.string().trim().min(1).max(60)).max(8).default([]),
}).strict();

export type StudentProfile = z.infer<typeof studentProfileSchema>;

export type ReadinessBand = 'support' | 'standard' | 'advanced';

export interface ScheduleTerm {
  grade: number;
  semester: 'Fall' | 'Spring';
  schoolSystem: 'Bentonville Public' | 'Haas Hall Academy';
  courses: string[];
  milestones: string[];
  extracurricularFocus: string;
  explanation: string;
}

export interface GeneratedSchedule {
  title: string;
  readinessBand: ReadinessBand;
  terms: ScheduleTerm[];
  assumptions: string[];
  warnings: string[];
}

export const scheduleTermSchema = z.object({
  grade: z.number().int().min(7).max(12),
  semester: z.enum(['Fall', 'Spring']),
  schoolSystem: z.enum(['Bentonville Public', 'Haas Hall Academy']),
  courses: z.array(z.string().trim().min(1).max(120)).min(1).max(8),
  milestones: z.array(z.string().trim().min(1).max(180)).max(8),
  extracurricularFocus: z.string().trim().min(1).max(240),
  explanation: z.string().trim().min(1).max(300),
});

export const generatedScheduleSchema = z.object({
  title: z.string().trim().min(1).max(140),
  readinessBand: z.enum(['support', 'standard', 'advanced']),
  terms: z.array(scheduleTermSchema).min(1).max(12),
  assumptions: z.array(z.string().trim().min(1).max(240)).max(8),
  warnings: z.array(z.string().trim().min(1).max(240)).max(8),
});

const mathSequence = ['pre-algebra', 'algebra1', 'geometry', 'algebra2', 'precalculus', 'calculus'] as const;

const courseCatalog = {
  bentonville: {
    label: 'Bentonville Public',
    english: ['English 7', 'English 8', 'English 9', 'English 10', 'AP Language / Honors English 11', 'AP Literature / English 12'],
    science: ['Life Science', 'Physical Science', 'Biology', 'Chemistry', 'Physics or AP Science', 'Advanced Science elective'],
    social: ['Arkansas History / Civics', 'U.S. History foundations', 'World History', 'U.S. History', 'Government / Economics', 'AP Government or senior social studies'],
    math: {
      'pre-algebra': 'Math 7 / Pre-Algebra',
      algebra1: 'Algebra I',
      geometry: 'Geometry',
      algebra2: 'Algebra II',
      precalculus: 'Pre-Calculus / AP Precalculus',
      calculus: 'AP Calculus or AP Statistics',
    },
  },
  haas: {
    label: 'Haas Hall Academy',
    english: ['Haas English 7', 'Haas English 8', 'Honors English 9', 'Honors English 10', 'AP English Language', 'AP English Literature'],
    science: ['Haas Life Science', 'Haas Physical Science', 'Biology', 'Chemistry', 'Advanced Science', 'AP Science elective'],
    social: ['Haas Social Studies 7', 'Haas Social Studies 8', 'World History', 'U.S. History', 'Government / Economics', 'Senior social studies'],
    math: {
      'pre-algebra': 'Pre-Algebra / placement review',
      algebra1: 'Algebra I',
      geometry: 'Geometry',
      algebra2: 'Algebra II',
      precalculus: 'Pre-Calculus',
      calculus: 'Calculus / Statistics',
    },
  },
} as const;

const clusterElectives: Record<StudentProfile['careerCluster'], string[]> = {
  stem: ['Computer Science', 'Robotics / Engineering', 'AP Computer Science when eligible'],
  health: ['Biomedical science elective', 'Anatomy or advanced biology', 'Health science pathway elective'],
  business: ['Business / marketing elective', 'DECA or FBLA aligned course', 'Economics or entrepreneurship elective'],
  'arts-media': ['Visual art / media arts', 'Theater, choir, band, or orchestra', 'Digital media elective'],
  'humanities-law': ['Debate / speech', 'Journalism or creative writing', 'AP social studies when eligible'],
  trades: ['Career technical education elective', 'Industry pathway exploration', 'Applied math or technical science'],
  undecided: ['World language', 'Computer science survey', 'Career exploration elective'],
};

const clusterActivities: Record<StudentProfile['careerCluster'], string> = {
  stem: 'Robotics, Science Olympiad, math competitions, or coding projects',
  health: 'Health volunteering, HOSA-style activities, shadowing, or service projects',
  business: 'DECA, FBLA, student enterprise, or finance competitions',
  'arts-media': 'Portfolio-building, productions, publications, or performances',
  'humanities-law': 'Debate, mock trial, journalism, student government, or service leadership',
  trades: 'CTE pathway exploration, job shadowing, certifications, or hands-on projects',
  undecided: 'Sample two activities, then narrow to 2-3 long-term commitments by 9th grade',
};

export const defaultProfile: StudentProfile = {
  grade: 7,
  schoolSystem: 'bentonville',
  transferPreference: 'haas-then-public',
  currentMath: 'pre-algebra',
  completedCourses: [],
  gpa: 3.5,
  mathGrade: 88,
  englishGrade: 88,
  scienceGrade: 88,
  socialStudiesGrade: 88,
  testStatus: 'not-started',
  careerCluster: 'stem',
  rigorPreference: 'balanced',
  extracurricularInterests: [],
};

export function generateSchedule(profile: StudentProfile): GeneratedSchedule {
  const readinessBand = getReadinessBand(profile);
  const startIndex = Math.max(mathSequence.indexOf(profile.currentMath), 0);
  const terms: ScheduleTerm[] = [];

  for (let grade = profile.grade; grade <= 12; grade += 1) {
    const schoolKey = chooseSchool(profile, grade);
    const catalog = courseCatalog[schoolKey];
    const gradeIndex = Math.min(Math.max(grade - 7, 0), 5);
    const mathCourse = chooseMathCourse(profile, grade, startIndex, readinessBand);
    const coursesBySemester = buildSemesterCourses(profile, schoolKey, grade, gradeIndex, mathCourse, readinessBand);

    terms.push({
      grade,
      semester: 'Fall',
      schoolSystem: catalog.label,
      courses: coursesBySemester.Fall,
      milestones: chooseMilestones(profile, grade, mathCourse, 'Fall'),
      extracurricularFocus: chooseActivityFocus(profile, grade),
      explanation: explainTerm(profile, readinessBand, mathCourse, grade, schoolKey),
    });
    terms.push({
      grade,
      semester: 'Spring',
      schoolSystem: catalog.label,
      courses: coursesBySemester.Spring,
      milestones: chooseMilestones(profile, grade, mathCourse, 'Spring'),
      extracurricularFocus: chooseActivityFocus(profile, grade),
      explanation: explainTerm(profile, readinessBand, mathCourse, grade, schoolKey),
    });
  }

  return {
    title: `${profile.grade}th Grade Personalized College Readiness Plan`,
    readinessBand,
    terms,
    assumptions: [
      'Catalog entries are curated seed data from the provided school catalog references and must be verified with a counselor before enrollment.',
      'Bentonville Public schedules are modeled as 7 full-year classes plus Advisory/Flex; Haas schedules are modeled as 4 semester-block courses, except Algebra I as a full-year course.',
      'The plan prioritizes graduation requirements, math readiness, ACT/SAT timing, and the selected career cluster.',
      'AI is not used; recommendations come from deterministic rules and structured course data.',
    ],
    warnings: [
      'This is informational planning support, not an official graduation audit.',
      'Required GPA, grade, and test score inputs are sensitive student data and should only be stored in the authenticated account.',
    ],
  };
}

function getReadinessBand(profile: StudentProfile): ReadinessBand {
  const gradeAverage = (profile.mathGrade + profile.englishGrade + profile.scienceGrade + profile.socialStudiesGrade) / 4;
  const testReady = (profile.actComposite ?? 0) >= 28 || (profile.satTotal ?? 0) >= 1300;

  if ((profile.gpa >= 3.7 && gradeAverage >= 90) || testReady || profile.rigorPreference === 'advanced') {
    return 'advanced';
  }
  if (profile.gpa >= 3.0 && gradeAverage >= 80 && profile.rigorPreference !== 'supportive') {
    return 'standard';
  }
  return 'support';
}

function chooseSchool(profile: StudentProfile, grade: number): keyof typeof courseCatalog {
  if (profile.transferPreference === 'public') return 'bentonville';
  if (profile.transferPreference === 'stay') return profile.schoolSystem;
  return grade <= 8 ? 'haas' : 'bentonville';
}

function chooseMathCourse(
  profile: StudentProfile,
  grade: number,
  startIndex: number,
  readinessBand: ReadinessBand,
): (typeof mathSequence)[number] {
  const acceleration = readinessBand === 'advanced' || (profile.schoolSystem === 'haas' && grade <= 8) ? 1 : 0;
  const gradeOffset = grade - profile.grade + acceleration;
  const index = Math.min(startIndex + gradeOffset, mathSequence.length - 1);
  return mathSequence[index];
}

function buildSemesterCourses(
  profile: StudentProfile,
  schoolKey: keyof typeof courseCatalog,
  grade: number,
  gradeIndex: number,
  mathCourse: (typeof mathSequence)[number],
  readinessBand: ReadinessBand,
): Record<'Fall' | 'Spring', string[]> {
  const catalog = courseCatalog[schoolKey];
  const electives = chooseElectives(profile, grade, readinessBand);
  const advanced = chooseAdvancedOption(profile, grade, readinessBand);
  const coreCourses = [
    catalog.math[mathCourse],
    catalog.english[gradeIndex],
    catalog.science[gradeIndex],
    catalog.social[gradeIndex],
  ];

  if (schoolKey === 'bentonville') {
    const bsdCourses = [
      ...coreCourses,
      electives[0],
      electives[1],
      advanced,
      'Advisory / Flex period',
    ];
    return { Fall: bsdCourses, Spring: bsdCourses };
  }

  if (mathCourse === 'algebra1') {
    return {
      Fall: [
        catalog.math.algebra1,
        catalog.english[gradeIndex],
        catalog.science[gradeIndex],
        electives[0],
      ],
      Spring: [
        catalog.math.algebra1,
        catalog.social[gradeIndex],
        electives[1],
        advanced,
      ],
    };
  }

  return {
    Fall: [
      catalog.math[mathCourse],
      catalog.english[gradeIndex],
      catalog.science[gradeIndex],
      electives[0],
    ],
    Spring: [
      catalog.social[gradeIndex],
      electives[1],
      advanced,
      chooseHaasSemesterElective(profile, grade),
    ],
  };
}

function chooseElectives(profile: StudentProfile, grade: number, readinessBand: ReadinessBand): [string, string] {
  const cluster = clusterElectives[profile.careerCluster];
  const rigor = readinessBand === 'advanced' && grade >= 10 ? 'AP or honors option where prerequisites are met' : 'Counselor-approved graduation elective';
  const worldLanguage = grade <= 10 ? 'World Language sequence' : 'Advanced elective or career pathway capstone';
  return [cluster[grade % cluster.length], grade % 2 === 0 ? worldLanguage : rigor];
}

function chooseAdvancedOption(profile: StudentProfile, grade: number, readinessBand: ReadinessBand): string {
  if (grade >= 11 && profile.schoolSystem === 'bentonville') {
    if (profile.careerCluster === 'stem' || profile.careerCluster === 'health' || profile.careerCluster === 'business') {
      return 'Ignite Professional Studies or advanced career pathway';
    }
    return 'Advanced seminar, AP elective, or Ignite pathway if aligned';
  }
  return readinessBand === 'advanced' && grade >= 10 ? 'AP / honors elective where prerequisites are met' : 'Counselor-approved elective';
}

function chooseHaasSemesterElective(profile: StudentProfile, grade: number): string {
  if (grade >= 11) {
    return 'Advanced seminar or college-readiness elective';
  }
  const cluster = clusterElectives[profile.careerCluster];
  return cluster[(grade + 1) % cluster.length];
}

function chooseMilestones(
  profile: StudentProfile,
  grade: number,
  mathCourse: (typeof mathSequence)[number],
  semester: 'Fall' | 'Spring',
): string[] {
  const milestones = ['Review graduation requirements with counselor'];
  if (grade <= 8 && profile.transferPreference === 'haas-then-public') {
    milestones.push('Consider Haas placement exam and math acceleration path');
  }
  if (mathCourse === 'geometry' || mathCourse === 'algebra2') {
    milestones.push(semester === 'Fall' ? 'Start ACT/SAT diagnostic practice' : 'Compare ACT and SAT practice results');
  }
  if (grade >= 10) {
    milestones.push(profile.testStatus === 'official' ? 'Retake ACT/SAT only if target score is not met' : 'Schedule official ACT/SAT attempt after Algebra II readiness');
  }
  if (grade >= 11) {
    milestones.push('Build college list and confirm scholarship deadlines');
  }
  return milestones;
}

function chooseActivityFocus(profile: StudentProfile, grade: number): string {
  if (profile.extracurricularInterests.length > 0) {
    return grade <= 8
      ? `Explore ${profile.extracurricularInterests.slice(0, 3).join(', ')} before narrowing commitments`
      : `Deepen leadership in ${profile.extracurricularInterests.slice(0, 2).join(', ')}`;
  }
  return clusterActivities[profile.careerCluster];
}

function explainTerm(
  profile: StudentProfile,
  readinessBand: ReadinessBand,
  mathCourse: (typeof mathSequence)[number],
  grade: number,
  schoolKey: keyof typeof courseCatalog,
): string {
  const scheduleModel = schoolKey === 'haas'
    ? 'Haas is modeled as 4 semester-block courses, with Algebra I kept as a full-year exception.'
    : 'BSD is modeled as 7 full-year classes plus Advisory/Flex, repeated across both semesters.';

  if (readinessBand === 'support') {
    return `${scheduleModel} This term protects core graduation progress while adding support before heavier honors/AP loads. Math placement targets ${mathCourse}.`;
  }
  if (grade <= 9 && profile.transferPreference === 'haas-then-public') {
    return `${scheduleModel} This term follows the optimized math-readiness route, using early acceleration before public-school ACT/SAT timing. Math placement targets ${mathCourse}.`;
  }
  return `${scheduleModel} This term balances college readiness, ${profile.careerCluster} alignment, and test timing. Math placement targets ${mathCourse}.`;
}
