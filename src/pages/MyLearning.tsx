/**
 * MyLearning – shows courses the user is enrolled in / has completed.
 *
 * Uses SwipeTabs for side-by-side slide transitions between
 * "In Progress" and "Completed" tabs.
 * BottomNav is rendered by MobileLayout.
 */
import { useNavigate } from "react-router-dom";
import { Star, ChevronRight } from "lucide-react";
import SwipeTabs from "@/components/SwipeTabs";
import { COURSES } from "@/data/mockData";

/** Simulated progress data keyed by course id */
const USER_PROGRESS: Record<string, { progress: number; enrolled: boolean }> = {
  "course-1": { progress: 45, enrolled: true },
  "course-2": { progress: 20, enrolled: true },
  "course-3": { progress: 100, enrolled: true },
};

/** Shared course list renderer */
function CourseList({
  courses,
  emptyMsg,
}: {
  courses: typeof COURSES;
  emptyMsg: string;
}) {
  const navigate = useNavigate();

  if (courses.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center pt-16 gap-3 px-5">
        <span className="text-4xl">📚</span>
        <p className="text-gray-400 text-sm text-center">{emptyMsg}</p>
      </div>
    );
  }

  return (
    <div className="px-5 py-4 space-y-4">
      {courses.map((course) => {
        const progress = USER_PROGRESS[course.id]?.progress ?? 0;
        return (
          <button
            key={course.id}
            onClick={() => navigate(`/course/${course.id}`)}
            className="w-full flex gap-3 p-3 rounded-xl border border-gray-100 shadow-sm text-left active:scale-[0.98] transition-transform"
          >
            {/* Thumbnail */}
            <div
              className="w-20 h-20 rounded-lg flex-shrink-0 overflow-hidden bg-gray-100"
              style={{ backgroundColor: course.thumbnailColor }}
            >
              {course.thumbnailImage && (
                <img
                  src={course.thumbnailImage}
                  alt={course.title}
                  className="w-full h-full object-cover"
                />
              )}
            </div>

            {/* Info */}
            <div className="flex-1 min-w-0 flex flex-col justify-between">
              <div>
                <p className="text-sm font-bold text-gray-800 line-clamp-2 leading-snug">
                  {course.title}
                </p>
                <p className="text-xs text-gray-500 mt-0.5">
                  By {course.provider}
                </p>
              </div>

              <div className="flex items-center justify-between mt-2">
                <div className="flex items-center gap-1">
                  <Star className="w-3.5 h-3.5 text-yellow-500 fill-yellow-500" />
                  <span className="text-xs font-bold text-gray-700">
                    {course.rating}
                  </span>
                </div>

                {/* Progress bar */}
                <div className="flex items-center gap-2">
                  <div className="w-20 h-1.5 bg-gray-200 rounded-full overflow-hidden">
                    <div
                      className={`h-full rounded-full ${
                        progress >= 100 ? "bg-green-500" : "bg-[#1b439c]"
                      }`}
                      style={{ width: `${progress}%` }}
                    />
                  </div>
                  <span className="text-[10px] text-gray-500 font-bold">
                    {progress}%
                  </span>
                </div>
              </div>
            </div>

            <ChevronRight className="w-4 h-4 text-gray-400 self-center flex-shrink-0" />
          </button>
        );
      })}
    </div>
  );
}

export default function MyLearning() {
  const enrolledCourses = COURSES.filter((c) => USER_PROGRESS[c.id]?.enrolled);
  const inProgress = enrolledCourses.filter(
    (c) => (USER_PROGRESS[c.id]?.progress ?? 0) < 100
  );
  const completed = enrolledCourses.filter(
    (c) => (USER_PROGRESS[c.id]?.progress ?? 0) >= 100
  );

  const tabs = [
    {
      label: `In Progress (${inProgress.length})`,
      content: (
        <CourseList
          courses={inProgress}
          emptyMsg="No courses in progress. Start learning!"
        />
      ),
    },
    {
      label: `Completed (${completed.length})`,
      content: (
        <CourseList
          courses={completed}
          emptyMsg="No completed courses yet. Keep going!"
        />
      ),
    },
  ];

  return (
    <div className="flex flex-col h-full bg-white">
      {/* Header */}
      <div className="px-5 pt-6 pb-2 shrink-0">
        <h1 className="text-2xl font-bold text-gray-900">My Learning</h1>
      </div>

      <SwipeTabs tabs={tabs} />
    </div>
  );
}
