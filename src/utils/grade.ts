const SENIOR_GRADE = 12;
const ACADEMIC_YEAR_ROLLOVER_MONTH = 7;

export function getCurrentAcademicGraduationYear(date = new Date()) {
  const calendarYear = date.getFullYear();
  const isFallTerm = date.getMonth() >= ACADEMIC_YEAR_ROLLOVER_MONTH;

  return isFallTerm ? calendarYear + 1 : calendarYear;
}

export function getGraduationYearForGrade(grade: string | number, date = new Date()) {
  const gradeNumber = Number.parseInt(String(grade), 10);

  if (Number.isNaN(gradeNumber)) {
    return getCurrentAcademicGraduationYear(date);
  }

  return getCurrentAcademicGraduationYear(date) + Math.max(0, SENIOR_GRADE - gradeNumber);
}

export function getAcademicYearsRemaining(grade: string | number) {
  const gradeNumber = Number.parseInt(String(grade), 10);

  if (Number.isNaN(gradeNumber)) {
    return 0;
  }

  return Math.max(0, SENIOR_GRADE - gradeNumber + 1);
}
