/**
 * CourseCard – a compact card for displaying a course in lists/grids.
 *
 * Matches the design from the Explore / My Space screenshot:
 * thumbnail, duration badge, level badge, title, provider, rating.
 */
import { useNavigate } from "react-router-dom";
import { Star, Clock } from "lucide-react";
import type { Course } from "@/data/mockData";

interface CourseCardProps {
  course: Course;
  className?: string;
}

export default function CourseCard({ course, className = "" }: CourseCardProps) {
  const navigate = useNavigate();

  return (
    <button
      onClick={() => navigate(`/course/${course.id}`)}
      className={`bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden text-left w-full min-w-[220px] max-w-[260px] flex-shrink-0 active:scale-[0.98] transition-transform ${className}`}
    >
      {/* Thumbnail */}
      <div
        className="relative h-40 w-full overflow-hidden bg-gray-100"
        style={{ backgroundColor: course.thumbnailColor }}
      >
        {course.thumbnailImage && (
          <img
            src={course.thumbnailImage}
            alt={course.title}
            className="w-full h-full object-cover"
          />
        )}
        {/* Duration badge */}
        <div className="absolute bottom-2 left-2 bg-black/70 text-white text-xs px-2 py-0.5 rounded-full flex items-center gap-1 backdrop-blur-xs">
          <Clock className="w-3 h-3" />
          {course.duration}
        </div>
      </div>

      {/* Body */}
      <div className="p-3 space-y-2">
        {/* Tags */}
        <div className="flex gap-2 flex-wrap">
          <span className="text-[10px] font-semibold bg-green-100 text-green-800 px-2 py-0.5 rounded-full">
            {course.category}
          </span>
          <span
            className={`text-[10px] font-semibold px-2 py-0.5 rounded-full ${
              course.level === "Beginner"
                ? "bg-blue-100 text-blue-800"
                : course.level === "Intermediate"
                  ? "bg-orange-100 text-orange-800"
                  : "bg-red-100 text-red-800"
            }`}
          >
            ▲ {course.level}
          </span>
        </div>

        {/* Title */}
        <h3 className="text-sm font-bold text-gray-800 leading-snug line-clamp-2">
          {course.title}
        </h3>

        {/* Provider */}
        <div className="flex items-center gap-1.5">
          <span className="text-base">{course.providerAvatar}</span>
          <span className="text-xs text-gray-500 truncate">
            By {course.provider}
          </span>
        </div>

        {/* Rating */}
        <div className="flex items-center gap-2">
          <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
          <span className="text-sm font-bold text-gray-700">
            {course.rating}
          </span>
          <span className="text-xs text-orange-500 font-semibold">
            Most Enrolled
          </span>
        </div>
      </div>
    </button>
  );
}
