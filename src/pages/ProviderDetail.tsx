/**
 * ProviderDetail – placeholder page for viewing a marketplace provider.
 *
 * Shows the provider banner and a list of their courses.
 * Will be fleshed out with real data from the backend later.
 */
import { useParams, useNavigate } from "react-router-dom";
import { ChevronLeft } from "lucide-react";
import CourseCard from "@/components/CourseCard";
import { PROVIDERS, COURSES } from "@/data/mockData";

export default function ProviderDetail() {
  const { providerId } = useParams<{ providerId: string }>();
  const navigate = useNavigate();

  const provider = PROVIDERS.find((p) => p.id === providerId);

  if (!provider) {
    return (
      <div className="flex items-center justify-center h-full">
        <p className="text-gray-500">Provider not found</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-full bg-white">
      {/* Header */}
      <div
        className="px-4 pt-4 pb-8 text-white"
        style={{ backgroundColor: provider.bgColor }}
      >
        <button
          onClick={() => navigate(-1)}
          className="p-1 active:bg-white/20 rounded-full mb-4"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>

        <div className="flex items-center gap-4">
          <div className="w-16 h-16 rounded-full bg-white/90 flex items-center justify-center shadow-lg">
            <span
              className="text-sm font-bold text-center leading-tight px-1"
              style={{ color: provider.bgColor }}
            >
              {provider.logoText}
            </span>
          </div>
          <div>
            <h1 className="text-xl font-bold">{provider.name}</h1>
            <p className="text-sm opacity-80 mt-0.5">Content Provider</p>
          </div>
        </div>
      </div>

      {/* Courses section */}
      <div className="px-5 pt-6 pb-4">
        <h2 className="text-lg font-bold text-gray-900 mb-4">
          Courses by {provider.name}
        </h2>

        <div className="flex flex-wrap gap-4">
          {/* Show all courses as placeholder — in real app, filter by provider */}
          {COURSES.slice(0, 2).map((course) => (
            <CourseCard key={course.id} course={course} className="!max-w-full flex-1 min-w-[160px]" />
          ))}
        </div>

        {COURSES.length === 0 && (
          <p className="text-gray-400 text-sm text-center py-8">
            No courses available from this provider yet.
          </p>
        )}
      </div>
    </div>
  );
}
