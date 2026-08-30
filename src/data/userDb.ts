/**
 * ============================================================
 *  USER DATABASE  (src/data/userDb.ts)
 * ============================================================
 *
 *  Stores all user-specific, mutable state: enrolments,
 *  lesson completions, quiz attempts and confidence scores.
 *
 *  PostgreSQL migration path:
 *    Table: users                → UserProfile
 *    Table: enrolments           → Enrolment
 *    Table: lesson_progress      → LessonProgress
 *    Table: quiz_attempts        → QuizAttempt
 *    Table: section_confidence   → SectionConfidence  (computed)
 *
 *  All IDs are foreign keys into contentDb.ts entities.
 *  The "db" is simulated as mutable module-level state so that
 *  page navigations within the same session persist progress.
 */

/* ------------------------------------------------------------------ */
/*  USER PROFILE                                                        */
/* ------------------------------------------------------------------ */
export interface UserProfile {
  id: string;
  name: string;
  email: string;
  designation: string;
  organisation: string;
  profileCompletion: number; // 0-100
  learningHoursTotal: number; // minutes
  karmaPoints: number;
  leaderboardRank: string;
  badges: string[]; // badge ids
  weeklyClaps: number;
  certificates: string[]; // courseIds with certificate earned
}

/* ------------------------------------------------------------------ */
/*  ENROLMENT  (user ↔ course relationship)                            */
/* ------------------------------------------------------------------ */
export interface Enrolment {
  id: string;
  userId: string;   // FK → UserProfile.id
  courseId: string; // FK → Course.id
  enrolledAt: string; // ISO date string
  completedAt?: string;
  overallProgressPct: number; // 0-100, computed from lessons
}

/* ------------------------------------------------------------------ */
/*  LESSON PROGRESS  (granular completion per lesson)                  */
/* ------------------------------------------------------------------ */
export interface LessonProgress {
  id: string;
  userId: string;    // FK → UserProfile.id
  courseId: string;  // FK → Course.id
  sectionId: string; // FK → CourseSection.id
  lessonId: string;  // FK → Lesson.id
  completedAt: string; // ISO date string
}

/* ------------------------------------------------------------------ */
/*  QUIZ ATTEMPT  (one row per quiz submission)                        */
/* ------------------------------------------------------------------ */
export interface QuizAttempt {
  id: string;
  userId: string;   // FK → UserProfile.id
  quizId: string;   // FK → Quiz.id
  courseId: string; // FK → Course.id
  sectionId: string;// FK → CourseSection.id
  attemptedAt: string; // ISO date string
  answers: Record<string, number>; // questionId → chosen option index
  score: number;   // 0-100 percentage
  passed: boolean;
}

/* ------------------------------------------------------------------ */
/*  SECTION CONFIDENCE  (derived from best quiz attempt score)         */
/*  confidence = best quiz score for the section's quiz                */
/*  Range: 0-100. Used to render the colour bar in course content.    */
/* ------------------------------------------------------------------ */
export interface SectionConfidence {
  userId: string;
  courseId: string;
  sectionId: string;
  quizId: string;
  confidenceScore: number; // 0-100
  lastAttemptedAt: string;
}

/* ================================================================== */
/*  MOCK STATE  (replaces a real DB)                                   */
/* ================================================================== */

export const CURRENT_USER: UserProfile = {
  id: "user-1",
  name: "Dheeraj Kumar Gautam",
  email: "dheeraj.gautam@gov.in",
  designation: "Deputy Secretary",
  organisation: "Ministry of Education",
  profileCompletion: 33.4,
  learningHoursTotal: 745, // minutes  → "12h 25m"
  karmaPoints: 148,
  leaderboardRank: "12th Rank",
  badges: [],
  weeklyClaps: 1,
  certificates: [],
};

/** Simulated enrolment records */
export const ENROLMENTS: Enrolment[] = [
  {
    id: "enr-1",
    userId: "user-1",
    courseId: "course-3",
    enrolledAt: "2026-01-10",
    overallProgressPct: 65,
  },
  {
    id: "enr-2",
    userId: "user-1",
    courseId: "course-1",
    enrolledAt: "2026-02-05",
    overallProgressPct: 80,
  },
];

/** Simulated lesson completions */
export const LESSON_PROGRESS: LessonProgress[] = [
  // Course-3 Section 1 — fully completed
  { id: "lp-1", userId: "user-1", courseId: "course-3", sectionId: "c3-s1", lessonId: "c3-s1-l1", completedAt: "2026-01-10" },
  { id: "lp-2", userId: "user-1", courseId: "course-3", sectionId: "c3-s1", lessonId: "c3-s1-l2", completedAt: "2026-01-10" },
  { id: "lp-3", userId: "user-1", courseId: "course-3", sectionId: "c3-s1", lessonId: "c3-s1-l3", completedAt: "2026-01-11" },
  { id: "lp-4", userId: "user-1", courseId: "course-3", sectionId: "c3-s1", lessonId: "c3-s1-l4", completedAt: "2026-01-11" },
  { id: "lp-5", userId: "user-1", courseId: "course-3", sectionId: "c3-s1", lessonId: "c3-s1-l5", completedAt: "2026-01-12" },
  // Course-3 Section 2 — partially completed
  { id: "lp-6", userId: "user-1", courseId: "course-3", sectionId: "c3-s2", lessonId: "c3-s2-l1", completedAt: "2026-01-13" },
  { id: "lp-7", userId: "user-1", courseId: "course-3", sectionId: "c3-s2", lessonId: "c3-s2-l2", completedAt: "2026-01-14" },
  // Course-1 Section 1 — fully completed
  { id: "lp-8", userId: "user-1", courseId: "course-1", sectionId: "c1-s1", lessonId: "c1-s1-l1", completedAt: "2026-02-05" },
  { id: "lp-9", userId: "user-1", courseId: "course-1", sectionId: "c1-s1", lessonId: "c1-s1-l2", completedAt: "2026-02-05" },
  { id: "lp-10", userId: "user-1", courseId: "course-1", sectionId: "c1-s1", lessonId: "c1-s1-l3", completedAt: "2026-02-06" },
  { id: "lp-11", userId: "user-1", courseId: "course-1", sectionId: "c1-s1", lessonId: "c1-s1-l4", completedAt: "2026-02-06" },
  // Course-1 Section 2 — partially completed
  { id: "lp-12", userId: "user-1", courseId: "course-1", sectionId: "c1-s2", lessonId: "c1-s2-l1", completedAt: "2026-02-07" },
  { id: "lp-13", userId: "user-1", courseId: "course-1", sectionId: "c1-s2", lessonId: "c1-s2-l2", completedAt: "2026-02-08" },
  { id: "lp-14", userId: "user-1", courseId: "course-1", sectionId: "c1-s2", lessonId: "c1-s2-l3", completedAt: "2026-02-09" },
];

/** Simulated quiz attempts */
export const QUIZ_ATTEMPTS: QuizAttempt[] = [
  {
    id: "qa-1",
    userId: "user-1",
    quizId: "quiz-c3-s1",
    courseId: "course-3",
    sectionId: "c3-s1",
    attemptedAt: "2026-01-12",
    answers: { q1: 1, q2: 2 },
    score: 100,
    passed: true,
  },
  {
    id: "qa-2",
    userId: "user-1",
    quizId: "quiz-c3-s2",
    courseId: "course-3",
    sectionId: "c3-s2",
    attemptedAt: "2026-01-15",
    answers: { q1: 1, q2: 0, q3: 1 },
    score: 67,
    passed: true,
  },
  {
    id: "qa-3",
    userId: "user-1",
    quizId: "quiz-c1-s1",
    courseId: "course-1",
    sectionId: "c1-s1",
    attemptedAt: "2026-02-06",
    answers: { q1: 1, q2: 0 },
    score: 50,
    passed: true,
  },
];

/* ------------------------------------------------------------------ */
/*  DERIVED: SECTION CONFIDENCE  (computed from best attempt per quiz) */
/* ------------------------------------------------------------------ */
export const SECTION_CONFIDENCE: SectionConfidence[] = QUIZ_ATTEMPTS.map((a) => ({
  userId: a.userId,
  courseId: a.courseId,
  sectionId: a.sectionId,
  quizId: a.quizId,
  confidenceScore: a.score,
  lastAttemptedAt: a.attemptedAt,
}));

/* ------------------------------------------------------------------ */
/*  HELPER FUNCTIONS  (simulate DB queries)                            */
/* ------------------------------------------------------------------ */

/** Check if user is enrolled in a course */
export const isEnrolled = (courseId: string): boolean =>
  ENROLMENTS.some((e) => e.userId === CURRENT_USER.id && e.courseId === courseId);

/** Get confidence score for a specific section (undefined = not attempted) */
export const getSectionConfidence = (sectionId: string): number | undefined => {
  const entry = SECTION_CONFIDENCE.find(
    (sc) => sc.userId === CURRENT_USER.id && sc.sectionId === sectionId
  );
  return entry?.confidenceScore;
};

/** Check if a specific lesson is completed */
export const isLessonCompleted = (lessonId: string): boolean =>
  LESSON_PROGRESS.some((lp) => lp.userId === CURRENT_USER.id && lp.lessonId === lessonId);

/** Get the best quiz attempt for a section */
export const getBestAttempt = (quizId: string): QuizAttempt | undefined => {
  const attempts = QUIZ_ATTEMPTS.filter(
    (a) => a.userId === CURRENT_USER.id && a.quizId === quizId
  );
  if (!attempts.length) return undefined;
  return attempts.reduce((best, curr) => (curr.score > best.score ? curr : best));
};

/** Record a new quiz attempt (mutates in-place for session persistence) */
export const recordQuizAttempt = (attempt: Omit<QuizAttempt, "id">): QuizAttempt => {
  const newAttempt: QuizAttempt = { ...attempt, id: `qa-${Date.now()}` };
  QUIZ_ATTEMPTS.push(newAttempt);
  // Update or insert SECTION_CONFIDENCE
  const idx = SECTION_CONFIDENCE.findIndex(
    (sc) => sc.userId === attempt.userId && sc.sectionId === attempt.sectionId
  );
  const conf: SectionConfidence = {
    userId: attempt.userId,
    courseId: attempt.courseId,
    sectionId: attempt.sectionId,
    quizId: attempt.quizId,
    confidenceScore: Math.max(attempt.score, idx >= 0 ? SECTION_CONFIDENCE[idx].confidenceScore : 0),
    lastAttemptedAt: attempt.attemptedAt,
  };
  if (idx >= 0) SECTION_CONFIDENCE[idx] = conf;
  else SECTION_CONFIDENCE.push(conf);
  return newAttempt;
};

/** Mark a lesson as completed */
export const markLessonComplete = (
  courseId: string,
  sectionId: string,
  lessonId: string
): void => {
  if (isLessonCompleted(lessonId)) return;
  LESSON_PROGRESS.push({
    id: `lp-${Date.now()}`,
    userId: CURRENT_USER.id,
    courseId,
    sectionId,
    lessonId,
    completedAt: new Date().toISOString().split("T")[0],
  });
};

/** Compute how many lessons in a section are complete */
export const getSectionProgress = (sectionId: string, totalLessons: number): number => {
  const done = LESSON_PROGRESS.filter(
    (lp) => lp.userId === CURRENT_USER.id && lp.sectionId === sectionId
  ).length;
  return totalLessons > 0 ? Math.round((done / totalLessons) * 100) : 0;
};
