import { describe, expect, it } from 'vitest';
import { defaultProfile, generateSchedule, studentProfileSchema } from '../src/shared/planner.js';

describe('generateSchedule', () => {
  it('creates semester plans through 12th grade', () => {
    const profile = studentProfileSchema.parse({
      ...defaultProfile,
      grade: 10,
      currentMath: 'geometry',
      gpa: 3.8,
      mathGrade: 94,
      englishGrade: 91,
      scienceGrade: 92,
      socialStudiesGrade: 90,
      careerCluster: 'stem',
    });

    const schedule = generateSchedule(profile);

    expect(schedule.readinessBand).toBe('advanced');
    expect(schedule.terms).toHaveLength(6);
    expect(schedule.terms[0].courses.join(' ')).toContain('Algebra II');
    expect(schedule.terms[0].courses).toHaveLength(8);
    expect(schedule.terms[0].courses).toContain('Advisory / Flex period');
    expect(schedule.terms.some((term) => term.milestones.some((item) => item.includes('ACT/SAT')))).toBe(true);
  });

  it('uses support readiness for lower grades and supportive rigor', () => {
    const profile = studentProfileSchema.parse({
      ...defaultProfile,
      gpa: 2.4,
      mathGrade: 70,
      englishGrade: 74,
      scienceGrade: 73,
      socialStudiesGrade: 71,
      rigorPreference: 'supportive',
      careerCluster: 'health',
    });

    const schedule = generateSchedule(profile);

    expect(schedule.readinessBand).toBe('support');
    expect(schedule.terms[0].explanation).toContain('protects core graduation progress');
  });

  it('models Haas as 4 courses each semester with Algebra I as a full-year exception', () => {
    const profile = studentProfileSchema.parse({
      ...defaultProfile,
      schoolSystem: 'haas',
      transferPreference: 'stay',
      currentMath: 'pre-algebra',
      gpa: 3.1,
      mathGrade: 84,
      englishGrade: 85,
      scienceGrade: 86,
      socialStudiesGrade: 84,
      rigorPreference: 'balanced',
    });

    const schedule = generateSchedule(profile);
    const fall = schedule.terms[0];
    const spring = schedule.terms[1];

    expect(fall.schoolSystem).toBe('Haas Hall Academy');
    expect(fall.courses).toHaveLength(4);
    expect(spring.courses).toHaveLength(4);
    expect(fall.courses).toContain('Algebra I');
    expect(spring.courses).toContain('Algebra I');
  });

  it('models BSD as 7 full-year classes plus advisory or flex', () => {
    const profile = studentProfileSchema.parse({
      ...defaultProfile,
      schoolSystem: 'bentonville',
      transferPreference: 'public',
      currentMath: 'algebra2',
      grade: 11,
      careerCluster: 'business',
      gpa: 3.9,
      mathGrade: 95,
      englishGrade: 94,
      scienceGrade: 93,
      socialStudiesGrade: 92,
    });

    const schedule = generateSchedule(profile);
    const fall = schedule.terms[0];
    const spring = schedule.terms[1];

    expect(fall.schoolSystem).toBe('Bentonville Public');
    expect(fall.courses).toHaveLength(8);
    expect(spring.courses).toEqual(fall.courses);
    expect(fall.courses).toContain('Advisory / Flex period');
    expect(fall.courses).toContain('Ignite Professional Studies or advanced career pathway');
  });
});
