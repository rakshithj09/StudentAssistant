import { describe, expect, it } from 'vitest';
import { generatedScheduleSchema, studentProfileSchema } from '../src/shared/planner.js';

describe('api validation contracts', () => {
  it('rejects malformed student profile input', () => {
    const parsed = studentProfileSchema.safeParse({
      grade: 13,
      schoolSystem: 'unknown',
      currentMath: 'geometry',
      gpa: 5,
    });

    expect(parsed.success).toBe(false);
  });

  it('accepts edited generated schedule payloads with bounded terms', () => {
    const parsed = generatedScheduleSchema.safeParse({
      title: 'Edited plan',
      readinessBand: 'standard',
      terms: [{
        grade: 10,
        semester: 'Fall',
        schoolSystem: 'Bentonville Public',
        courses: ['Algebra II'],
        milestones: ['Review graduation requirements with counselor'],
        extracurricularFocus: 'Robotics leadership',
        explanation: 'Balances college readiness and STEM alignment.',
      }],
      assumptions: ['Catalog data requires counselor verification.'],
      warnings: ['Informational plan only.'],
    });

    expect(parsed.success).toBe(true);
  });
});
