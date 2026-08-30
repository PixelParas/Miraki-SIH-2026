/**
 * ============================================================
 *  CONTENT DATABASE  (src/data/contentDb.ts)
 * ============================================================
 *
 *  This file contains ONLY immutable course content — the "CMS"
 *  side of the system. Nothing here is user-specific.
 *
 *  PostgreSQL migration path:
 *    Table: courses         → Course
 *    Table: sections        → CourseSection
 *    Table: lessons         → Lesson
 *    Table: quizzes         → Quiz
 *    Table: quiz_questions  → QuizQuestion
 *    Table: providers       → Provider
 *
 *  Every entity has a stable `id` string that maps 1-to-1 with
 *  future DB primary keys (UUID format when moving to Postgres).
 */

/* ------------------------------------------------------------------ */
/*  PROVIDERS                                                           */
/* ------------------------------------------------------------------ */
export interface Provider {
  id: string;
  name: string;
  bgColor: string;
  textColor: string;
  logoText: string;
}

export const PROVIDERS: Provider[] = [
  { id: "prov-1", name: "Fractal", bgColor: "#1E40AF", textColor: "#FFFFFF", logoText: "Fractal" },
  { id: "prov-2", name: "Indian Institute of Management", bgColor: "#7C3AED", textColor: "#FFFFFF", logoText: "IIM" },
  { id: "prov-3", name: "Kyndryl", bgColor: "#0F766E", textColor: "#FFFFFF", logoText: "Kyndryl" },
  { id: "prov-4", name: "NASSCOM", bgColor: "#B45309", textColor: "#FFFFFF", logoText: "NASSCOM" },
  { id: "prov-5", name: "Coursera", bgColor: "#F59E0B", textColor: "#FFFFFF", logoText: "coursera" },
  { id: "prov-6", name: "Harvard Business", bgColor: "#EF4444", textColor: "#FFFFFF", logoText: "HARVARD" },
  { id: "prov-7", name: "NPTEL", bgColor: "#3B82F6", textColor: "#FFFFFF", logoText: "NPTEL" },
  { id: "prov-8", name: "Infosys Springboard", bgColor: "#10B981", textColor: "#FFFFFF", logoText: "Infosys" },
];

/* ------------------------------------------------------------------ */
/*  LESSONS (atomic content unit inside a section)                     */
/* ------------------------------------------------------------------ */
export type LessonType = "video" | "reading" | "interactive";

export interface Lesson {
  id: string;
  sectionId: string; // FK → CourseSection.id
  order: number;
  title: string;
  type: LessonType;
  duration?: string; // "5m 30s" for videos
  description?: string;
}

/* ------------------------------------------------------------------ */
/*  QUIZ QUESTIONS                                                      */
/* ------------------------------------------------------------------ */
export interface QuizQuestion {
  id: string;
  quizId: string; // FK → Quiz.id
  order: number;
  question: string;
  options: string[];
  correctAnswer: number; // index of correct option
}

/* ------------------------------------------------------------------ */
/*  QUIZZES  (each section ends with exactly one confidence quiz)      */
/* ------------------------------------------------------------------ */
export interface Quiz {
  id: string;
  sectionId: string; // FK → CourseSection.id (1-to-1 per section)
  courseId: string;  // FK → Course.id (denormalised for convenience)
  title: string;
  timeLimit?: number; // seconds; null = untimed
  passingScore: number; // 0-100 percentage
  questions: QuizQuestion[];
}

/* ------------------------------------------------------------------ */
/*  COURSE SECTIONS  (expandable "chapters")                           */
/* ------------------------------------------------------------------ */
export interface CourseSection {
  id: string;
  courseId: string; // FK → Course.id
  order: number;
  title: string;
  lessons: Lesson[];
  quizId: string;   // FK → Quiz.id  (always present — confidence quiz)
}

/* ------------------------------------------------------------------ */
/*  COURSES                                                             */
/* ------------------------------------------------------------------ */
export interface Course {
  id: string;
  providerId: string; // FK → Provider.id
  provider: string;
  title: string;
  providerAvatar: string;
  rating: number;
  enrollmentCount: number;
  level: "Beginner" | "Intermediate" | "Advanced";
  duration: string;
  thumbnailColor: string;
  thumbnailImage?: string;
  category: string;
  lastUpdated: string;
  description: string;
  learningOutcome: string;
  competencies: string[];
  sections: CourseSection[];
}

/* ================================================================== */
/*  DATA                                                                */
/* ================================================================== */

/* ------------------------------------------------------------------ */
/*  COURSE 1 – Human Decision Making and its Biases                    */
/* ------------------------------------------------------------------ */
const COURSE1_QUIZZES: Quiz[] = [
  {
    id: "quiz-c1-s1",
    sectionId: "c1-s1",
    courseId: "course-1",
    title: "Confidence Quiz: Introduction to Decision Making",
    timeLimit: 120,
    passingScore: 40,
    questions: [
      { id: "q1", quizId: "quiz-c1-s1", order: 1, question: "What is the primary focus of behavioral economics?", options: ["How markets set prices", "How psychological factors influence economic decisions", "How governments regulate trade", "How businesses maximise profit"], correctAnswer: 1 },
      { id: "q2", quizId: "quiz-c1-s1", order: 2, question: "Which part of the brain is associated with fast, automatic thinking?", options: ["Prefrontal cortex", "Cerebellum", "Amygdala / System 1", "Hippocampus"], correctAnswer: 2 },
    ],
  },
  {
    id: "quiz-c1-s2",
    sectionId: "c1-s2",
    courseId: "course-1",
    title: "Confidence Quiz: Cognitive Biases",
    timeLimit: 150,
    passingScore: 40,
    questions: [
      { id: "q1", quizId: "quiz-c1-s2", order: 1, question: "What is confirmation bias?", options: ["Tendency to seek information that confirms existing beliefs", "Tendency to make quick decisions", "Tendency to follow group decisions", "Tendency to avoid making decisions"], correctAnswer: 0 },
      { id: "q2", quizId: "quiz-c1-s2", order: 2, question: "Which cognitive bias involves relying too heavily on the first piece of information encountered?", options: ["Availability bias", "Anchoring bias", "Hindsight bias", "Sunk cost fallacy"], correctAnswer: 1 },
      { id: "q3", quizId: "quiz-c1-s2", order: 3, question: "The 'halo effect' refers to?", options: ["Being blinded by someone's fame", "Letting one positive trait influence overall judgement", "Overestimating one's own abilities", "Remembering only recent events"], correctAnswer: 1 },
    ],
  },
  {
    id: "quiz-c1-s3",
    sectionId: "c1-s3",
    courseId: "course-1",
    title: "Confidence Quiz: Decision Frameworks",
    timeLimit: 180,
    passingScore: 40,
    questions: [
      { id: "q1", quizId: "quiz-c1-s3", order: 1, question: "What is the best strategy to mitigate decision-making biases in governance?", options: ["Make decisions faster", "Always follow your first instinct", "Use structured frameworks and seek diverse perspectives", "Avoid making decisions altogether"], correctAnswer: 2 },
      { id: "q2", quizId: "quiz-c1-s3", order: 2, question: "Pre-mortem analysis is used to?", options: ["Review a project after it fails", "Imagine future failure and plan accordingly", "Evaluate financial performance", "Assess employee satisfaction"], correctAnswer: 1 },
    ],
  },
];

const COURSE1: Course = {
  id: "course-1",
  providerId: "prov-1",
  provider: "Fractal",
  title: "Human Decision Making and its Biases",
  providerAvatar: "🎓",
  rating: 4.3,
  enrollmentCount: 102060,
  level: "Intermediate",
  duration: "2h 18m",
  thumbnailColor: "#8B7355",
  thumbnailImage: "/courses/course-1.jpg",
  category: "Course",
  lastUpdated: "Jan 05, 2026",
  description: "In an era of rapid technological advancement, understanding human decision-making biases is critical for effective governance. This course is designed to provide government professionals with tools to identify and mitigate cognitive biases.",
  learningOutcome: "Analyze the core concepts of cognitive biases, including anchoring, confirmation bias, and their applications in governance and public policy decision-making.",
  competencies: ["Critical Thinking", "Decision Making", "Governance"],
  sections: [
    {
      id: "c1-s1",
      courseId: "course-1",
      order: 1,
      title: "Introduction to Decision Making",
      quizId: "quiz-c1-s1",
      lessons: [
        { id: "c1-s1-l1", sectionId: "c1-s1", order: 1, title: "Welcome & Course Overview", type: "video", duration: "2m 4s" },
        { id: "c1-s1-l2", sectionId: "c1-s1", order: 2, title: "How the Human Brain Makes Decisions", type: "video", duration: "6m 30s" },
        { id: "c1-s1-l3", sectionId: "c1-s1", order: 3, title: "System 1 vs System 2 Thinking", type: "video", duration: "5m 45s" },
        { id: "c1-s1-l4", sectionId: "c1-s1", order: 4, title: "Reading: Behavioural Economics Primer", type: "reading" },
      ],
    },
    {
      id: "c1-s2",
      courseId: "course-1",
      order: 2,
      title: "Cognitive Biases in Practice",
      quizId: "quiz-c1-s2",
      lessons: [
        { id: "c1-s2-l1", sectionId: "c1-s2", order: 1, title: "Anchoring and Adjustment", type: "video", duration: "7m 10s" },
        { id: "c1-s2-l2", sectionId: "c1-s2", order: 2, title: "Confirmation Bias in Policy Making", type: "video", duration: "8m 20s" },
        { id: "c1-s2-l3", sectionId: "c1-s2", order: 3, title: "Availability Heuristic & Recency Bias", type: "video", duration: "6m 55s" },
        { id: "c1-s2-l4", sectionId: "c1-s2", order: 4, title: "The Halo Effect and Attribution Errors", type: "video", duration: "5m 40s" },
        { id: "c1-s2-l5", sectionId: "c1-s2", order: 5, title: "Reading: Bias Case Studies in Governance", type: "reading" },
      ],
    },
    {
      id: "c1-s3",
      courseId: "course-1",
      order: 3,
      title: "Decision Frameworks & Mitigation",
      quizId: "quiz-c1-s3",
      lessons: [
        { id: "c1-s3-l1", sectionId: "c1-s3", order: 1, title: "Structured Decision Making Models", type: "video", duration: "9m 15s" },
        { id: "c1-s3-l2", sectionId: "c1-s3", order: 2, title: "Pre-mortem Analysis Technique", type: "video", duration: "6m 30s" },
        { id: "c1-s3-l3", sectionId: "c1-s3", order: 3, title: "Building Debiasing Habits", type: "video", duration: "7m 00s" },
        { id: "c1-s3-l4", sectionId: "c1-s3", order: 4, title: "Reading: Applying Frameworks in Your Role", type: "reading" },
      ],
    },
  ],
};

/* ------------------------------------------------------------------ */
/*  COURSE 2 – Mastering Feedback: A Leadership Tool                   */
/* ------------------------------------------------------------------ */
const COURSE2_QUIZZES: Quiz[] = [
  {
    id: "quiz-c2-s1",
    sectionId: "c2-s1",
    courseId: "course-2",
    title: "Confidence Quiz: Foundations of Feedback",
    timeLimit: 120,
    passingScore: 40,
    questions: [
      { id: "q1", quizId: "quiz-c2-s1", order: 1, question: "What is the primary purpose of feedback in a professional setting?", options: ["To judge an employee's character", "To improve performance and encourage growth", "To document disciplinary actions", "To compare employees against each other"], correctAnswer: 1 },
      { id: "q2", quizId: "quiz-c2-s1", order: 2, question: "Which of the following is NOT a type of feedback?", options: ["Corrective feedback", "Appreciative feedback", "Directive feedback", "Competitive feedback"], correctAnswer: 3 },
    ],
  },
  {
    id: "quiz-c2-s2",
    sectionId: "c2-s2",
    courseId: "course-2",
    title: "Confidence Quiz: Giving Effective Feedback",
    timeLimit: 150,
    passingScore: 40,
    questions: [
      { id: "q1", quizId: "quiz-c2-s2", order: 1, question: "The SBI (Situation-Behavior-Impact) model focuses on?", options: ["Personality traits", "Past failures", "Specific observable behaviors and their impact", "Future potential"], correctAnswer: 2 },
      { id: "q2", quizId: "quiz-c2-s2", order: 2, question: "When giving constructive feedback, you should?", options: ["Focus on the person, not the action", "Use vague language to soften the message", "Be specific and focus on behavior", "Avoid any positive remarks"], correctAnswer: 2 },
      { id: "q3", quizId: "quiz-c2-s2", order: 3, question: "The 'sandwich method' of feedback refers to?", options: ["Giving feedback during lunch", "Placing criticism between two pieces of praise", "Giving feedback in writing only", "Delivering feedback anonymously"], correctAnswer: 1 },
    ],
  },
  {
    id: "quiz-c2-s3",
    sectionId: "c2-s3",
    courseId: "course-2",
    title: "Confidence Quiz: Receiving & Acting on Feedback",
    timeLimit: 120,
    passingScore: 40,
    questions: [
      { id: "q1", quizId: "quiz-c2-s3", order: 1, question: "When receiving critical feedback, the best first response is to?", options: ["Immediately defend yourself", "Listen actively and ask clarifying questions", "Dismiss it if you disagree", "Change the subject"], correctAnswer: 1 },
      { id: "q2", quizId: "quiz-c2-s3", order: 2, question: "A 360-degree feedback system collects input from?", options: ["Only the direct manager", "External consultants", "Peers, subordinates, supervisors, and self", "HR department only"], correctAnswer: 2 },
    ],
  },
];

const COURSE2: Course = {
  id: "course-2",
  providerId: "prov-2",
  provider: "Indian Institute of Management",
  title: "Mastering Feedback: A Leadership Tool",
  providerAvatar: "🏛️",
  rating: 4.2,
  enrollmentCount: 87500,
  level: "Beginner",
  duration: "4h 22m",
  thumbnailColor: "#D97706",
  thumbnailImage: "/courses/course-2.jpg",
  category: "Course",
  lastUpdated: "Feb 12, 2026",
  description: "Feedback is an essential leadership skill. This course teaches how to give, receive, and act on feedback to drive team performance and organisational growth.",
  learningOutcome: "Master the art of constructive feedback, understand feedback loops, and apply feedback techniques in organisational and governance settings.",
  competencies: ["Leadership", "Communication", "Team Management"],
  sections: [
    {
      id: "c2-s1",
      courseId: "course-2",
      order: 1,
      title: "Foundations of Feedback",
      quizId: "quiz-c2-s1",
      lessons: [
        { id: "c2-s1-l1", sectionId: "c2-s1", order: 1, title: "Why Feedback Matters in Leadership", type: "video", duration: "5m 20s" },
        { id: "c2-s1-l2", sectionId: "c2-s1", order: 2, title: "Types of Feedback: Corrective vs Appreciative", type: "video", duration: "6m 10s" },
        { id: "c2-s1-l3", sectionId: "c2-s1", order: 3, title: "The Feedback Loop Model", type: "video", duration: "4m 45s" },
        { id: "c2-s1-l4", sectionId: "c2-s1", order: 4, title: "Reading: Feedback Culture in Government", type: "reading" },
      ],
    },
    {
      id: "c2-s2",
      courseId: "course-2",
      order: 2,
      title: "Giving Effective Feedback",
      quizId: "quiz-c2-s2",
      lessons: [
        { id: "c2-s2-l1", sectionId: "c2-s2", order: 1, title: "The SBI Feedback Model", type: "video", duration: "8m 15s" },
        { id: "c2-s2-l2", sectionId: "c2-s2", order: 2, title: "Delivering Difficult Feedback", type: "video", duration: "9m 00s" },
        { id: "c2-s2-l3", sectionId: "c2-s2", order: 3, title: "Feedback in Performance Reviews", type: "video", duration: "7m 30s" },
        { id: "c2-s2-l4", sectionId: "c2-s2", order: 4, title: "Reading: Common Feedback Mistakes to Avoid", type: "reading" },
      ],
    },
    {
      id: "c2-s3",
      courseId: "course-2",
      order: 3,
      title: "Receiving & Acting on Feedback",
      quizId: "quiz-c2-s3",
      lessons: [
        { id: "c2-s3-l1", sectionId: "c2-s3", order: 1, title: "How to Receive Feedback Gracefully", type: "video", duration: "6m 20s" },
        { id: "c2-s3-l2", sectionId: "c2-s3", order: 2, title: "Building a Personal Development Plan", type: "video", duration: "8m 40s" },
        { id: "c2-s3-l3", sectionId: "c2-s3", order: 3, title: "360-Degree Feedback Systems", type: "video", duration: "7m 10s" },
        { id: "c2-s3-l4", sectionId: "c2-s3", order: 4, title: "Reading: Creating a Feedback-Safe Culture", type: "reading" },
      ],
    },
  ],
};

/* ------------------------------------------------------------------ */
/*  COURSE 3 – AI for Social Sector Transformation                     */
/* ------------------------------------------------------------------ */
const COURSE3_QUIZZES: Quiz[] = [
  {
    id: "quiz-c3-s1",
    sectionId: "c3-s1",
    courseId: "course-3",
    title: "Confidence Quiz: AI Fundamentals",
    timeLimit: 120,
    passingScore: 40,
    questions: [
      { id: "q1", quizId: "quiz-c3-s1", order: 1, question: "What does 'Machine Learning' primarily involve?", options: ["Programming explicit rules for every scenario", "Systems learning patterns from data", "Manual data entry by engineers", "Static rule-based automation"], correctAnswer: 1 },
      { id: "q2", quizId: "quiz-c3-s1", order: 2, question: "Which technology is fundamental to most generative AI models?", options: ["Decision Trees", "Linear Regression", "Neural Networks", "K-Means Clustering"], correctAnswer: 2 },
    ],
  },
  {
    id: "quiz-c3-s2",
    sectionId: "c3-s2",
    courseId: "course-3",
    title: "Confidence Quiz: AI in Agriculture & Healthcare",
    timeLimit: 150,
    passingScore: 40,
    questions: [
      { id: "q1", quizId: "quiz-c3-s2", order: 1, question: "Which is a primary application of AI in agriculture?", options: ["Building social media platforms for farmers", "Precision farming using satellite imagery", "Replacing all manual labour with robots", "Creating video games about farming"], correctAnswer: 1 },
      { id: "q2", quizId: "quiz-c3-s2", order: 2, question: "How does AI assist in healthcare diagnostics?", options: ["By performing complex surgeries independently", "By analysing medical images to detect anomalies early", "By prescribing medications without doctor approval", "By replacing nurses in hospitals"], correctAnswer: 1 },
      { id: "q3", quizId: "quiz-c3-s2", order: 3, question: "What is the key advantage of AI-powered drones in crop monitoring?", options: ["They provide entertainment for farmers", "They detect crop stress, diseases, and irrigation gaps early", "They collect data only for government reports", "They control rainfall prediction"], correctAnswer: 1 },
    ],
  },
  {
    id: "quiz-c3-s3",
    sectionId: "c3-s3",
    courseId: "course-3",
    title: "Confidence Quiz: Responsible AI in Government",
    timeLimit: 150,
    passingScore: 40,
    questions: [
      { id: "q1", quizId: "quiz-c3-s3", order: 1, question: "What is a major challenge in implementing AI in the public sector?", options: ["AI systems are too cheap", "Lack of data privacy concerns", "Ensuring algorithmic fairness and transparency", "AI models learn too quickly"], correctAnswer: 2 },
      { id: "q2", quizId: "quiz-c3-s3", order: 2, question: "Why is data anonymisation important in AI?", options: ["To make the data file smaller", "To protect individual privacy in datasets", "To speed up the training process", "To increase accuracy of the model"], correctAnswer: 1 },
      { id: "q3", quizId: "quiz-c3-s3", order: 3, question: "Which reflects responsible AI use in the social sector?", options: ["Using anonymised, bias-free data and ensuring transparency", "Focusing only on automation to reduce workforce size", "Sharing personal citizen data for faster analytics", "Deploying AI without explaining decisions"], correctAnswer: 0 },
    ],
  },
];

const COURSE3: Course = {
  id: "course-3",
  providerId: "prov-3",
  provider: "Kyndryl",
  title: "AI for Social Sector Transformation",
  providerAvatar: "💻",
  rating: 4.3,
  enrollmentCount: 102060,
  level: "Beginner",
  duration: "2h 42m",
  thumbnailColor: "#1E40AF",
  thumbnailImage: "/courses/course-3.jpg",
  category: "Course",
  lastUpdated: "Jan 05, 2026",
  description: "Artificial Intelligence presents a transformative opportunity for public administration. This course provides government professionals with a comprehensive understanding of AI concepts and their applications across agriculture, healthcare, and education.",
  learningOutcome: "Analyse core AI concepts including generative AI, model architectures, and their applications in governance, with a focus on responsible and ethical deployment.",
  competencies: ["AI & Machine Learning", "Public Policy", "Digital Governance"],
  sections: [
    {
      id: "c3-s1",
      courseId: "course-3",
      order: 1,
      title: "AI Fundamentals for Civil Servants",
      quizId: "quiz-c3-s1",
      lessons: [
        { id: "c3-s1-l1", sectionId: "c3-s1", order: 1, title: "What is Artificial Intelligence?", type: "video", duration: "4m 30s" },
        { id: "c3-s1-l2", sectionId: "c3-s1", order: 2, title: "Machine Learning vs Rule-Based Systems", type: "video", duration: "6m 15s" },
        { id: "c3-s1-l3", sectionId: "c3-s1", order: 3, title: "Neural Networks Explained Simply", type: "video", duration: "7m 00s" },
        { id: "c3-s1-l4", sectionId: "c3-s1", order: 4, title: "Generative AI and Large Language Models", type: "video", duration: "8m 20s" },
        { id: "c3-s1-l5", sectionId: "c3-s1", order: 5, title: "Reading: AI Landscape in Indian Government", type: "reading" },
      ],
    },
    {
      id: "c3-s2",
      courseId: "course-3",
      order: 2,
      title: "AI in Agriculture & Healthcare",
      quizId: "quiz-c3-s2",
      lessons: [
        { id: "c3-s2-l1", sectionId: "c3-s2", order: 1, title: "Precision Farming with AI", type: "video", duration: "6m 40s" },
        { id: "c3-s2-l2", sectionId: "c3-s2", order: 2, title: "AI-Powered Drone Crop Monitoring", type: "video", duration: "5m 55s" },
        { id: "c3-s2-l3", sectionId: "c3-s2", order: 3, title: "AI Diagnostics in Rural Healthcare", type: "video", duration: "7m 10s" },
        { id: "c3-s2-l4", sectionId: "c3-s2", order: 4, title: "Predictive Analytics for Disease Prevention", type: "video", duration: "6m 30s" },
        { id: "c3-s2-l5", sectionId: "c3-s2", order: 5, title: "Reading: Case Studies – India's Digital Health Mission", type: "reading" },
      ],
    },
    {
      id: "c3-s3",
      courseId: "course-3",
      order: 3,
      title: "Responsible AI & Governance",
      quizId: "quiz-c3-s3",
      lessons: [
        { id: "c3-s3-l1", sectionId: "c3-s3", order: 1, title: "Algorithmic Fairness and Bias in AI", type: "video", duration: "8m 00s" },
        { id: "c3-s3-l2", sectionId: "c3-s3", order: 2, title: "Data Privacy and the Digital Personal Data Protection Act", type: "video", duration: "9m 20s" },
        { id: "c3-s3-l3", sectionId: "c3-s3", order: 3, title: "Building Citizen Trust in AI Systems", type: "video", duration: "6m 45s" },
        { id: "c3-s3-l4", sectionId: "c3-s3", order: 4, title: "Reading: NITI Aayog's Responsible AI Framework", type: "reading" },
      ],
    },
  ],
};

/* ------------------------------------------------------------------ */
/*  COURSE 4 – Data Analytics for Public Policy                        */
/* ------------------------------------------------------------------ */
const COURSE4_QUIZZES: Quiz[] = [
  {
    id: "quiz-c4-s1",
    sectionId: "c4-s1",
    courseId: "course-4",
    title: "Confidence Quiz: Data Basics",
    timeLimit: 120,
    passingScore: 40,
    questions: [
      { id: "q1", quizId: "quiz-c4-s1", order: 1, question: "What does NLP stand for in the context of data analytics?", options: ["National Language Policy", "Natural Language Processing", "Non-Linear Programming", "Network Layer Protocol"], correctAnswer: 1 },
      { id: "q2", quizId: "quiz-c4-s1", order: 2, question: "Which type of data is collected through surveys and interviews?", options: ["Secondary data", "Quantitative administrative data", "Primary qualitative data", "Geospatial data"], correctAnswer: 2 },
    ],
  },
  {
    id: "quiz-c4-s2",
    sectionId: "c4-s2",
    courseId: "course-4",
    title: "Confidence Quiz: Data Visualisation",
    timeLimit: 150,
    passingScore: 40,
    questions: [
      { id: "q1", quizId: "quiz-c4-s2", order: 1, question: "Which chart is best for showing trends over time?", options: ["Pie chart", "Bar chart", "Line chart", "Scatter plot"], correctAnswer: 2 },
      { id: "q2", quizId: "quiz-c4-s2", order: 2, question: "A dashboard KPI (Key Performance Indicator) helps policy makers to?", options: ["Store raw data", "Track specific performance metrics at a glance", "Write annual reports automatically", "Replace field officers"], correctAnswer: 1 },
      { id: "q3", quizId: "quiz-c4-s2", order: 3, question: "What is the advantage of geospatial (map) data in public policy?", options: ["It looks visually appealing only", "It helps identify geographic disparities in service delivery", "It replaces statistical analysis", "It works only at the national level"], correctAnswer: 1 },
    ],
  },
  {
    id: "quiz-c4-s3",
    sectionId: "c4-s3",
    courseId: "course-4",
    title: "Confidence Quiz: Policy Application",
    timeLimit: 150,
    passingScore: 40,
    questions: [
      { id: "q1", quizId: "quiz-c4-s3", order: 1, question: "Data-driven policy making primarily aims to?", options: ["Replace elected officials with AI", "Base policy decisions on evidence rather than intuition", "Make government paperless", "Speed up tender processes"], correctAnswer: 1 },
      { id: "q2", quizId: "quiz-c4-s3", order: 2, question: "Which Indian government initiative focuses on open government data?", options: ["DigiLocker", "data.gov.in", "BHIM App", "Aarogya Setu"], correctAnswer: 1 },
    ],
  },
];

const COURSE4: Course = {
  id: "course-4",
  providerId: "prov-4",
  provider: "NASSCOM",
  title: "Data Analytics for Public Policy",
  providerAvatar: "📊",
  rating: 4.5,
  enrollmentCount: 65000,
  level: "Intermediate",
  duration: "3h 15m",
  thumbnailColor: "#059669",
  thumbnailImage: "/courses/course-4.jpg",
  category: "Course",
  lastUpdated: "Mar 20, 2026",
  description: "Learn to leverage data analytics for effective public policy design and implementation. Master data collection, visualisation, and evidence-based decision making.",
  learningOutcome: "Apply data-driven decision making to public policy challenges, using analytics tools and open government data to design more effective programmes.",
  competencies: ["Data Analytics", "Policy Design", "Evidence-Based Governance"],
  sections: [
    {
      id: "c4-s1",
      courseId: "course-4",
      order: 1,
      title: "Data Fundamentals for Policy Makers",
      quizId: "quiz-c4-s1",
      lessons: [
        { id: "c4-s1-l1", sectionId: "c4-s1", order: 1, title: "Introduction to Data Analytics", type: "video", duration: "4m 10s" },
        { id: "c4-s1-l2", sectionId: "c4-s1", order: 2, title: "Types of Data in Government", type: "video", duration: "6m 00s" },
        { id: "c4-s1-l3", sectionId: "c4-s1", order: 3, title: "Data Collection Methods & Sources", type: "video", duration: "7m 30s" },
        { id: "c4-s1-l4", sectionId: "c4-s1", order: 4, title: "Data Quality and Cleaning Basics", type: "video", duration: "5m 50s" },
        { id: "c4-s1-l5", sectionId: "c4-s1", order: 5, title: "Reading: Open Data Portals in India", type: "reading" },
      ],
    },
    {
      id: "c4-s2",
      courseId: "course-4",
      order: 2,
      title: "Visualisation & Dashboards",
      quizId: "quiz-c4-s2",
      lessons: [
        { id: "c4-s2-l1", sectionId: "c4-s2", order: 1, title: "Choosing the Right Chart Type", type: "video", duration: "6m 20s" },
        { id: "c4-s2-l2", sectionId: "c4-s2", order: 2, title: "Building Policy Dashboards", type: "video", duration: "9m 00s" },
        { id: "c4-s2-l3", sectionId: "c4-s2", order: 3, title: "Geospatial Data and GIS Basics", type: "video", duration: "7m 45s" },
        { id: "c4-s2-l4", sectionId: "c4-s2", order: 4, title: "Reading: Data Storytelling for Decision Makers", type: "reading" },
      ],
    },
    {
      id: "c4-s3",
      courseId: "course-4",
      order: 3,
      title: "Applying Analytics to Policy Decisions",
      quizId: "quiz-c4-s3",
      lessons: [
        { id: "c4-s3-l1", sectionId: "c4-s3", order: 1, title: "Evidence-Based Policy Making Framework", type: "video", duration: "8m 30s" },
        { id: "c4-s3-l2", sectionId: "c4-s3", order: 2, title: "Predictive Analytics for Programme Planning", type: "video", duration: "9m 15s" },
        { id: "c4-s3-l3", sectionId: "c4-s3", order: 3, title: "Case Study: PM Gati Shakti Data Platform", type: "video", duration: "7m 00s" },
        { id: "c4-s3-l4", sectionId: "c4-s3", order: 4, title: "Reading: Measuring Policy Impact with Data", type: "reading" },
      ],
    },
  ],
};

/* ------------------------------------------------------------------ */
/*  MASTER EXPORTS                                                      */
/* ------------------------------------------------------------------ */
export const COURSES: Course[] = [COURSE1, COURSE2, COURSE3, COURSE4];

// Flat map of all quizzes for easy lookup by quizId
export const ALL_QUIZZES: Record<string, Quiz> = Object.fromEntries(
  [
    ...COURSE1_QUIZZES,
    ...COURSE2_QUIZZES,
    ...COURSE3_QUIZZES,
    ...COURSE4_QUIZZES,
  ].map((q) => [q.id, q])
);

// Flat map of all sections for easy lookup by sectionId
export const ALL_SECTIONS: Record<string, CourseSection> = Object.fromEntries(
  COURSES.flatMap((c) => c.sections).map((s) => [s.id, s])
);

// Helper: get quiz for a given section
export const getQuizForSection = (sectionId: string): Quiz | undefined =>
  ALL_SECTIONS[sectionId] ? ALL_QUIZZES[ALL_SECTIONS[sectionId].quizId] : undefined;
