import { COURSES as DB_COURSES, PROVIDERS as DB_PROVIDERS } from "./contentDb";
import { CURRENT_USER as DB_CURRENT_USER } from "./userDb";

export const COURSES = DB_COURSES;
export const PROVIDERS = DB_PROVIDERS;
export const CURRENT_USER = DB_CURRENT_USER;
export const FEATURED_AI_COURSES = [DB_COURSES[2], DB_COURSES[3]];
export type { Course, Provider } from "./contentDb";
export type { UserProfile } from "./userDb";

/* ------------------------------------------------------------------ */
/*  REGISTRATION FORM DROPDOWN DATA                                    */
/* ------------------------------------------------------------------ */
export const MINISTRIES = [
  "Ministry of Defense",
  "Ministry of Education",
  "Ministry of Health and Family Welfare",
  "Ministry of Finance",
  "Ministry of Home Affairs",
];

export const STATES = [
  "Andhra Pradesh",
  "Delhi",
  "Karnataka",
  "Maharashtra",
  "Tamil Nadu",
  "Uttar Pradesh",
];

export const DEPARTMENTS = [
  "Health",
  "Education",
  "Transport",
  "Revenue",
  "Public Works",
];

export const ORGANISATIONS = [
  "Organisation A",
  "Organisation B",
  "Organisation C",
  "Organisation D",
];

export const DESIGNATIONS = [
  "Manager",
  "Director",
  "Clerk",
  "Assistant",
  "Deputy Secretary",
];
