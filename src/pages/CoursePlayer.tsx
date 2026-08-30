import { useState, useMemo } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  ChevronLeft,
  ChevronDown,
  ChevronUp,
  Share2,
  Bookmark,
  MoreVertical,
  MessageSquare,
  CheckCircle2,
  Play,
  SkipForward,
  SkipBack,
  BarChart3
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { COURSES, ALL_QUIZZES } from "@/data/contentDb";
import { markLessonComplete, isLessonCompleted } from "@/data/userDb";

export default function CoursePlayer() {
  const { courseId, moduleId: lessonId } = useParams();
  const navigate = useNavigate();

  const [activeTab, setActiveTab] = useState("content");
  const [expandedSection, setExpandedSection] = useState<string | null>(null);

  const course = COURSES.find((c) => c.id === courseId);

  // Flatten all lessons across sections for sequential navigation
  const allLessons = useMemo(() => {
    if (!course) return [];
    return course.sections.flatMap(s => s.lessons.map(l => ({ ...l, sectionId: s.id })));
  }, [course]);

  const currentLessonIndex = useMemo(
    () => allLessons.findIndex((l) => l.id === lessonId),
    [allLessons, lessonId]
  );

  const currentLesson = allLessons[currentLessonIndex];
  
  if (!course || !currentLesson) {
    return (
      <div className="p-6 text-center text-gray-500">Lesson not found</div>
    );
  }

  const currentSection = course.sections.find(s => s.id === currentLesson.sectionId);
  
  const handleNext = () => {
    // Mark current complete
    markLessonComplete(course.id, currentLesson.sectionId, currentLesson.id);
    
    if (currentLessonIndex < allLessons.length - 1) {
      navigate(
        `/course/${course.id}/player/${allLessons[currentLessonIndex + 1].id}`
      );
    } else {
      // Finished all lessons, go back to course detail or quiz
      navigate(`/course/${course.id}`);
    }
  };

  const handlePrev = () => {
    if (currentLessonIndex > 0) {
      navigate(
        `/course/${course.id}/player/${allLessons[currentLessonIndex - 1].id}`
      );
    }
  };

  return (
    <div className="flex flex-col h-full bg-white relative">
      {/* Video Area */}
      <div className="relative bg-black w-full aspect-video flex-shrink-0 flex items-center justify-center group overflow-hidden">
        {/* Placeholder for actual video player */}
        <div
          className="absolute inset-0 opacity-40 bg-cover bg-center"
          style={{ 
            backgroundColor: course.thumbnailColor,
            backgroundImage: course.thumbnailImage ? `url(${course.thumbnailImage})` : 'none'
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
        
        {/* Top actions overlay */}
        <div className="absolute top-4 left-4 right-4 flex justify-between items-center z-20">
          <button
            onClick={() => navigate(`/course/${course.id}`)}
            className="w-10 h-10 rounded-full bg-black/15 backdrop-blur-xs flex items-center justify-center text-white active:scale-95"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
          <div className="flex gap-2">
            <button className="w-10 h-10 rounded-full bg-black/15 backdrop-blur-xs flex items-center justify-center text-white active:scale-95">
              <Bookmark className="w-5 h-5" />
            </button>
            <button className="w-10 h-10 rounded-full bg-black/15 backdrop-blur-xs flex items-center justify-center text-white active:scale-95">
              <Share2 className="w-5 h-5" />
            </button>
            <button className="w-10 h-10 rounded-full bg-black/15 backdrop-blur-xs flex items-center justify-center text-white active:scale-95">
              <MoreVertical className="w-5 h-5" />
            </button>
          </div>
        </div>
        
        <Play className="w-12 h-12 text-white/80 fill-white/80 z-10" />

        {/* Video Overlays */}
        <div className="absolute bottom-4 left-4 right-4 z-10">
          <div className="flex justify-between items-end mb-2">
            <div>
              <p className="text-white font-bold text-sm leading-tight drop-shadow-md">
                {currentLesson.title}
              </p>
              <p className="text-gray-300 text-xs drop-shadow-md">
                Section: {currentSection?.title}
              </p>
            </div>
            {currentLesson.duration && (
              <span className="text-xs font-bold text-white bg-black/60 px-2 py-1 rounded">
                {currentLesson.duration}
              </span>
            )}
          </div>
          {/* Progress bar mock */}
          <div className="h-1 bg-white/30 rounded-full w-full overflow-hidden">
            <div className="h-full bg-[#3b82f6] w-1/3" />
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-gray-200">
        <button
          onClick={() => setActiveTab("content")}
          className={`flex-1 py-3 text-sm font-bold text-center border-b-2 transition-colors ${
            activeTab === "content"
              ? "border-[#1b439c] text-[#1b439c]"
              : "border-transparent text-gray-500"
          }`}
        >
          Course Content
        </button>
        <button
          onClick={() => setActiveTab("notes")}
          className={`flex-1 py-3 text-sm font-bold text-center border-b-2 transition-colors ${
            activeTab === "notes"
              ? "border-[#1b439c] text-[#1b439c]"
              : "border-transparent text-gray-500"
          }`}
        >
          Notes
        </button>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 overflow-y-auto bg-gray-50 pb-24">
        {activeTab === "content" && (
          <div className="py-2 space-y-1">
            {course.sections.map((section, idx) => {
              const isExpanded = expandedSection === section.id || section.id === currentLesson.sectionId;
              const quiz = ALL_QUIZZES[section.quizId];
              
              return (
                <div key={section.id} className="bg-white border-y border-gray-100 mb-1">
                  <div
                    onClick={() => setExpandedSection(isExpanded ? null : section.id)}
                    className="flex items-center justify-between p-4 cursor-pointer active:bg-gray-50"
                  >
                    <div>
                      <h3 className="text-sm font-bold text-gray-900">
                        Section {idx + 1}: {section.title}
                      </h3>
                      <p className="text-xs text-gray-500 mt-1">
                        {section.lessons.length} lessons • 1 quiz
                      </p>
                    </div>
                    {isExpanded ? (
                      <ChevronUp className="w-5 h-5 text-gray-400" />
                    ) : (
                      <ChevronDown className="w-5 h-5 text-gray-400" />
                    )}
                  </div>
                  
                  {isExpanded && (
                    <div className="bg-gray-50 px-2 pb-2">
                      {section.lessons.map((lesson, lIdx) => {
                        const isActive = lesson.id === currentLesson.id;
                        const isCompleted = isLessonCompleted(lesson.id);
                        
                        return (
                          <div
                            key={lesson.id}
                            onClick={() => navigate(`/course/${course.id}/player/${lesson.id}`)}
                            className={`flex items-start gap-3 p-3 rounded-lg mb-1 cursor-pointer transition-colors ${
                              isActive ? "bg-blue-100/50" : "hover:bg-gray-100"
                            }`}
                          >
                            <CheckCircle2
                              className={`w-5 h-5 flex-shrink-0 mt-0.5 ${
                                isCompleted ? "text-green-500" : "text-gray-300"
                              }`}
                            />
                            <div className="flex-1">
                              <p className={`text-sm ${isActive ? "font-bold text-[#1b439c]" : "font-semibold text-gray-700"}`}>
                                {lIdx + 1}. {lesson.title}
                              </p>
                              {lesson.duration && (
                                <div className="flex items-center gap-1 mt-1 text-xs text-gray-500">
                                  <Play className="w-3 h-3" />
                                  <span>{lesson.duration}</span>
                                </div>
                              )}
                            </div>
                          </div>
                        );
                      })}
                      
                      {quiz && (
                        <div
                          onClick={() => navigate(`/quiz/${quiz.id}`)}
                          className="flex items-start gap-3 p-3 rounded-lg mb-1 cursor-pointer hover:bg-gray-100 transition-colors mt-2"
                        >
                          <BarChart3 className="w-5 h-5 flex-shrink-0 mt-0.5 text-blue-500" />
                          <div className="flex-1">
                            <p className="text-sm font-bold text-blue-700">
                              Confidence Quiz
                            </p>
                            <p className="text-xs text-gray-500 mt-1">
                              {quiz.questions.length} questions
                            </p>
                          </div>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}

        {activeTab === "notes" && (
          <div className="p-6 text-center">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <MessageSquare className="w-6 h-6 text-gray-400" />
            </div>
            <h3 className="text-gray-900 font-bold mb-1">No notes yet</h3>
            <p className="text-sm text-gray-500 mb-4">
              Take notes while learning to easily review them later.
            </p>
            <Button variant="outline" className="rounded-full border-gray-300">
              Add Note
            </Button>
          </div>
        )}
      </div>

      {/* Floating Action Bar (Next/Prev) */}
      <div className="absolute bottom-0 left-0 right-0 p-4 bg-white border-t border-gray-100 shadow-[0_-10px_20px_rgba(0,0,0,0.05)] z-30">
        <div className="flex items-center gap-3">
          <Button
            variant="outline"
            onClick={handlePrev}
            disabled={currentLessonIndex === 0}
            className="flex-1 rounded-full py-6 font-bold border-gray-300 text-gray-700 flex items-center justify-center gap-2 disabled:opacity-50"
          >
            <SkipBack className="w-5 h-5" />
            Previous
          </Button>
          <Button
            onClick={handleNext}
            className="flex-1 rounded-full py-6 font-bold bg-[#1b439c] hover:bg-[#123075] text-white flex items-center justify-center gap-2"
          >
            Next
            <SkipForward className="w-5 h-5" />
          </Button>
        </div>
      </div>
    </div>
  );
}
