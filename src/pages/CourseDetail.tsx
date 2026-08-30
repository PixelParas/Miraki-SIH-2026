import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  ChevronLeft,
  Share2,
  Bookmark,
  Star,
  Clock,
  CheckCircle2,
  Play,
  BarChart3,
  Plus,
  Minus
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { COURSES, getQuizForSection } from "@/data/contentDb";
import { getSectionConfidence } from "@/data/userDb";
import type { CourseSection } from "@/data/contentDb";

export default function CourseDetail() {
  const { courseId: id } = useParams();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("overview");
  const [expandedSectionId, setExpandedSectionId] = useState<string | null>(null);

  const course = COURSES.find((c) => c.id === id);

  if (!course) {
    return (
      <div className="p-6 text-center text-gray-500">Course not found</div>
    );
  }

  const toggleSection = (sectionId: string) => {
    setExpandedSectionId(expandedSectionId === sectionId ? null : sectionId);
  };

  const renderConfidenceBar = (sectionId: string) => {
    const score = getSectionConfidence(sectionId);
    if (score === undefined) return null;

    let bgColor = "bg-red-500";
    let textColor = "text-red-500";
    if (score >= 75) { 
      bgColor = "bg-green-500"; 
      textColor = "text-green-500"; 
    } else if (score >= 40) { 
      bgColor = "bg-yellow-500"; 
      textColor = "text-yellow-500"; 
    }

    return (
      <div className="mt-2 flex items-center gap-2">
        <span className="text-xs text-gray-500 font-medium">Engine Confidence:</span>
        <div className="flex-1 h-1.5 bg-gray-200 rounded-full overflow-hidden">
          <div className={`h-full ${bgColor}`} style={{ width: `${score}%` }} />
        </div>
        <span className={`text-xs font-bold ${textColor}`}>{score}%</span>
      </div>
    );
  };

  return (
    <div className="flex flex-col h-full bg-white">
      {/* Header Image / Video area */}
      <div className="relative h-56 bg-gray-900 w-full flex-shrink-0">
        <div
          className="absolute inset-0 opacity-40 bg-cover bg-center"
          style={{ 
            backgroundColor: course.thumbnailColor,
            backgroundImage: course.thumbnailImage ? `url(${course.thumbnailImage})` : 'none'
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />

        {/* Top actions */}
        <div className="absolute top-4 left-4 right-4 flex justify-between items-center z-10">
          <button
            onClick={() => navigate(-1)}
            className="w-10 h-10 rounded-full bg-black/15 backdrop-blur-xs flex items-center justify-center text-white active:scale-95"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
          <div className="flex gap-3">
            <button className="w-10 h-10 rounded-full bg-black/15 backdrop-blur-xs flex items-center justify-center text-white active:scale-95">
              <Bookmark className="w-5 h-5" />
            </button>
            <button className="w-10 h-10 rounded-full bg-black/15 backdrop-blur-xs flex items-center justify-center text-white active:scale-95">
              <Share2 className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Center Play Button */}
        <div className="absolute inset-0 flex items-center justify-center z-10">
          <button 
            className="w-16 h-16 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center border-2 border-white/40 active:scale-95 transition-transform"
            onClick={() => {
              const firstSection = course.sections[0];
              if (firstSection) {
                if (firstSection.lessons.length > 0) {
                  navigate(`/course/${course.id}/player/${firstSection.lessons[0].id}`);
                } else if (firstSection.quizId) {
                  navigate(`/quiz/${firstSection.quizId}`);
                }
              }
            }}
          >
            <Play className="w-8 h-8 text-white ml-1 fill-white" />
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-y-auto px-5 pt-5 pb-6">
        {/* Title and Metadata */}
        <div className="space-y-3">
          <h1 className="text-xl font-bold text-gray-900 leading-tight">
            {course.title}
          </h1>
          <p className="text-sm text-gray-600 font-medium">
            By {course.providerId} • {course.providerAvatar}
          </p>
          <div className="flex items-center gap-4 text-sm font-semibold text-gray-700">
            <div className="flex items-center gap-1">
              <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
              <span>{course.rating}</span>
            </div>
            <div className="flex items-center gap-1 text-gray-500">
              <Clock className="w-4 h-4" />
              <span>{course.duration}</span>
            </div>
            <div className="text-gray-500 px-2 py-0.5 bg-gray-100 rounded-md text-xs">
              {course.level}
            </div>
          </div>
        </div>

        {/* Action Button */}
        <div className="mt-6">
          <Button 
            className="w-full bg-[#1b439c] hover:bg-[#123075] text-white rounded-full py-6 text-base font-bold shadow-md"
            onClick={() => {
              const firstSection = course.sections[0];
              if (firstSection) {
                if (firstSection.lessons.length > 0) {
                  navigate(`/course/${course.id}/player/${firstSection.lessons[0].id}`);
                } else if (firstSection.quizId) {
                  navigate(`/quiz/${firstSection.quizId}`);
                }
              }
            }}
          >
            Resume Learning
          </Button>
        </div>

        {/* Tabs */}
        <div className="flex border-b border-gray-200 mt-8 mb-4">
          <button
            onClick={() => setActiveTab("overview")}
            className={`flex-1 pb-3 text-sm font-bold text-center border-b-2 transition-colors ${
              activeTab === "overview"
                ? "border-[#1b439c] text-[#1b439c]"
                : "border-transparent text-gray-500"
            }`}
          >
            Overview
          </button>
          <button
            onClick={() => setActiveTab("content")}
            className={`flex-1 pb-3 text-sm font-bold text-center border-b-2 transition-colors ${
              activeTab === "content"
                ? "border-[#1b439c] text-[#1b439c]"
                : "border-transparent text-gray-500"
            }`}
          >
            Content
          </button>
          <button
            onClick={() => setActiveTab("discussion")}
            className={`flex-1 pb-3 text-sm font-bold text-center border-b-2 transition-colors ${
              activeTab === "discussion"
                ? "border-[#1b439c] text-[#1b439c]"
                : "border-transparent text-gray-500"
            }`}
          >
            Discussion
          </button>
        </div>

        {/* Tab Content */}
        {activeTab === "overview" && (
          <div className="space-y-6 py-2">
            <div>
              <h3 className="text-base font-bold text-gray-900 mb-2">Description</h3>
              <p className="text-sm text-gray-600 leading-relaxed">
                {course.description}
              </p>
            </div>
            
            <div>
              <h3 className="text-base font-bold text-gray-900 mb-2">Learning Outcomes</h3>
              <p className="text-sm text-gray-600 leading-relaxed">
                {course.learningOutcome}
              </p>
            </div>

            {course.competencies && course.competencies.length > 0 && (
              <div>
                <h3 className="text-base font-bold text-gray-900 mb-2">Competencies</h3>
                <div className="flex flex-wrap gap-2">
                  {course.competencies.map((comp) => (
                    <span key={comp} className="bg-blue-50 text-[#1b439c] px-3 py-1 rounded-full text-xs font-semibold">
                      {comp}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        {activeTab === "content" && (
          <div className="py-2 space-y-3">
            {course.sections.map((section: CourseSection, idx: number) => {
              const isExpanded = expandedSectionId === section.id;
              const quiz = getQuizForSection(section.id);
              
              return (
                <div key={section.id} className="border border-gray-200 rounded-xl overflow-hidden bg-gray-50">
                  {/* Section Header */}
                  <div
                    onClick={() => toggleSection(section.id)}
                    className="flex flex-col p-4 bg-white cursor-pointer hover:bg-gray-50 transition-colors"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-start gap-3">
                        <CheckCircle2 className="w-5 h-5 mt-0.5 text-gray-300" />
                        <div>
                          <p className="text-sm font-bold text-gray-800">
                            Section {idx + 1}: {section.title}
                          </p>
                          <div className="flex items-center gap-3 mt-1 text-xs text-gray-500 font-medium">
                            <span className="flex items-center gap-1">
                              <Play className="w-3 h-3" /> {section.lessons.length} Lessons
                            </span>
                            <span className="flex items-center gap-1">
                              <BarChart3 className="w-3 h-3" /> 1 Quiz
                            </span>
                          </div>
                        </div>
                      </div>
                      <button className="text-gray-400 p-1 pointer-events-none">
                        {isExpanded ? <Minus className="w-5 h-5" /> : <Plus className="w-5 h-5" />}
                      </button>
                    </div>
                    {renderConfidenceBar(section.id)}
                  </div>

                  {/* Expanded Content */}
                  {isExpanded && (
                    <div className="px-4 py-2 border-t border-gray-100 bg-gray-50 space-y-1">
                      {section.lessons.map((lesson, lIdx) => (
                        <div
                          key={lesson.id}
                          onClick={(e) => {
                            e.stopPropagation();
                            navigate(`/course/${course.id}/player/${lesson.id}`);
                          }}
                          className="flex items-center gap-3 py-3 px-2 rounded-lg cursor-pointer hover:bg-gray-200 transition-colors"
                        >
                          <Play className="w-4 h-4 text-gray-400" />
                          <div className="flex-1">
                            <p className="text-sm font-semibold text-gray-700">
                              {lIdx + 1}. {lesson.title}
                            </p>
                          </div>
                          {lesson.duration && (
                            <span className="text-xs text-gray-500 font-medium">{lesson.duration}</span>
                          )}
                        </div>
                      ))}
                      
                      {quiz && (
                        <div
                          onClick={(e) => {
                            e.stopPropagation();
                            navigate(`/quiz/${quiz.id}`);
                          }}
                          className="flex items-center gap-3 py-3 px-2 rounded-lg cursor-pointer hover:bg-gray-200 transition-colors mt-2 border-t border-gray-200/50"
                        >
                          <BarChart3 className="w-4 h-4 text-blue-500" />
                          <div className="flex-1">
                            <p className="text-sm font-bold text-blue-700">
                              Confidence Quiz
                            </p>
                          </div>
                          <Button size="sm" variant="outline" className="h-7 text-xs rounded-full border-blue-200 text-blue-700 bg-blue-50 hover:bg-blue-100">
                            Start
                          </Button>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}

        {activeTab === "discussion" && (
          <div className="py-12 flex flex-col items-center justify-center text-center gap-4">
            <div className="w-16 h-16 rounded-full bg-gray-100 flex items-center justify-center">
              <span className="text-2xl">💬</span>
            </div>
            <p className="text-gray-500 text-sm max-w-[240px]">
              No discussions yet. Be the first to start a conversation!
            </p>
            <Button className="bg-[#1b439c] hover:bg-[#123075] text-white rounded-full px-6">
              Start Discussion
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
