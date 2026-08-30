import { useParams, useNavigate } from "react-router-dom";
import {
  ChevronLeft,
  Clock,
  HelpCircle,
  Trophy,
  AlertCircle
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { ALL_QUIZZES } from "@/data/contentDb";

export default function QuizStart() {
  const { quizId } = useParams();
  const navigate = useNavigate();

  const quiz = quizId ? ALL_QUIZZES[quizId] : undefined;

  if (!quiz) {
    return (
      <div className="p-6 text-center text-gray-500">Quiz not found</div>
    );
  }

  return (
    <div className="flex flex-col h-full bg-white relative">
      {/* Header */}
      <header className="flex items-center justify-between p-4 bg-white sticky top-0 z-10 border-b border-gray-100">
        <div className="flex items-center gap-3 min-w-0">
          <button
            onClick={() => navigate(-1)}
            className="w-10 h-10 flex items-center justify-center -ml-2 text-gray-600 active:bg-gray-100 rounded-full shrink-0"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
          <h1 className="text-base font-bold text-gray-900 leading-snug break-words">
            {quiz.title}
          </h1>
        </div>
      </header>

      {/* Main Content */}
      <div className="flex-1 overflow-y-auto px-5 py-6">
        <div className="flex justify-center mb-8">
          <div className="w-24 h-24 bg-blue-50 rounded-full flex items-center justify-center">
            <Trophy className="w-12 h-12 text-[#1b439c]" />
          </div>
        </div>

        <h2 className="text-2xl font-bold text-gray-900 text-center mb-6">
          Ready to test your knowledge?
        </h2>

        <div className="bg-gray-50 rounded-xl p-5 mb-8 border border-gray-100">
          <div className="grid grid-cols-2 gap-4">
            <div className="flex items-start gap-3">
              <HelpCircle className="w-5 h-5 text-gray-400 mt-0.5" />
              <div>
                <p className="text-xs text-gray-500 font-medium">Questions</p>
                <p className="text-sm font-bold text-gray-900">
                  {quiz.questions.length} multiple choice
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <Clock className="w-5 h-5 text-gray-400 mt-0.5" />
              <div>
                <p className="text-xs text-gray-500 font-medium">Time Limit</p>
                <p className="text-sm font-bold text-gray-900">
                  {quiz.timeLimit ? `${Math.floor(quiz.timeLimit / 60)} minutes` : "No limit"}
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <h3 className="font-bold text-gray-900 flex items-center gap-2">
            <AlertCircle className="w-5 h-5 text-[#d97c27]" />
            Instructions
          </h3>
          <ul className="space-y-3 text-sm text-gray-600">
            <li className="flex items-start gap-2">
              <span className="text-[#1b439c] font-bold">•</span>
              Read each question carefully before answering.
            </li>
            <li className="flex items-start gap-2">
              <span className="text-[#1b439c] font-bold">•</span>
              {quiz.timeLimit ? "The timer will start as soon as you begin." : "Take your time, there is no timer."}
            </li>
            <li className="flex items-start gap-2">
              <span className="text-[#1b439c] font-bold">•</span>
              You must score at least {quiz.passingScore}% to pass.
            </li>
          </ul>
        </div>
      </div>

      {/* Footer Action */}
      <div className="p-4 bg-white border-t border-gray-100 sticky bottom-0">
        <Button
          onClick={() => navigate(`/quiz/${quiz.id}/attempt`)}
          className="w-full bg-[#1b439c] hover:bg-[#123075] text-white rounded-full py-6 text-base font-bold shadow-md"
        >
          Start Quiz
        </Button>
      </div>
    </div>
  );
}
