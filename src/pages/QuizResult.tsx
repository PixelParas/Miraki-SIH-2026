import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import {
  ChevronLeft,
  CheckCircle2,
  XCircle,
  Trophy,
  RotateCcw,
  ArrowRight
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { ALL_QUIZZES } from "@/data/contentDb";
import { recordQuizAttempt, CURRENT_USER } from "@/data/userDb";

export default function QuizResult() {
  const { quizId } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const [recorded, setRecorded] = useState(false);
  
  const answers = location.state?.answers || {};
  const autoSubmit = location.state?.autoSubmit || false;

  const quiz = quizId ? ALL_QUIZZES[quizId] : undefined;

  if (!quiz) {
    return (
      <div className="p-6 text-center text-gray-500">Quiz not found</div>
    );
  }

  // Calculate score
  let correctCount = 0;
  quiz.questions.forEach((q) => {
    if (answers[q.id] === q.correctAnswer) {
      correctCount++;
    }
  });

  const percentage = Math.round((correctCount / quiz.questions.length) * 100);
  const passed = percentage >= quiz.passingScore;

  // Record attempt once
  useEffect(() => {
    if (!recorded) {
      recordQuizAttempt({
        userId: CURRENT_USER.id,
        quizId: quiz.id,
        courseId: quiz.courseId,
        sectionId: quiz.sectionId,
        attemptedAt: new Date().toISOString(),
        answers,
        score: percentage,
        passed,
      });
      setRecorded(true);
    }
  }, [recorded, quiz, answers, percentage, passed]);

  return (
    <div className="flex flex-col h-full bg-white relative">
      {/* Header */}
      <header className="flex items-center justify-between p-4 bg-white sticky top-0 z-10 border-b border-gray-100">
        <div className="flex items-center gap-3">
          <button
            onClick={() => navigate(`/course/${quiz.courseId}`)}
            className="w-10 h-10 flex items-center justify-center -ml-2 text-gray-600 active:bg-gray-100 rounded-full"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
          <h1 className="text-lg font-bold text-gray-900">Quiz Results</h1>
        </div>
      </header>

      {/* Main Content */}
      <div className="flex-1 overflow-y-auto px-5 py-6">
        {autoSubmit && (
          <div className="mb-6 bg-yellow-50 border border-yellow-200 text-yellow-800 px-4 py-3 rounded-lg text-sm font-medium text-center">
            Time is up! Your quiz was submitted automatically.
          </div>
        )}

        <div className="flex flex-col items-center mb-8">
          <div className={`w-28 h-28 rounded-full flex items-center justify-center mb-4 ${
            passed ? 'bg-green-50' : 'bg-red-50'
          }`}>
            <Trophy className={`w-14 h-14 ${passed ? 'text-green-500' : 'text-red-400'}`} />
          </div>
          
          <h2 className="text-2xl font-bold text-gray-900 mb-1">
            {passed ? "Congratulations!" : "Keep learning!"}
          </h2>
          <p className="text-sm text-gray-500 font-medium">
            You scored {percentage}%
          </p>
        </div>

        {/* Score Summary */}
        <div className="bg-gray-50 rounded-xl p-5 mb-8 border border-gray-100">
          <div className="grid grid-cols-2 gap-4">
            <div className="text-center border-r border-gray-200">
              <p className="text-xs text-gray-500 font-medium mb-1">Correct</p>
              <p className="text-2xl font-bold text-green-600">{correctCount}</p>
            </div>
            <div className="text-center">
              <p className="text-xs text-gray-500 font-medium mb-1">Total</p>
              <p className="text-2xl font-bold text-gray-900">{quiz.questions.length}</p>
            </div>
          </div>
        </div>

        {/* Detailed Review */}
        <div>
          <h3 className="font-bold text-gray-900 mb-4 text-lg">Review Answers</h3>
          <div className="space-y-4">
            {quiz.questions.map((q, i) => {
              const userAnswer = answers[q.id];
              const isCorrect = userAnswer === q.correctAnswer;
              
              return (
                <div key={q.id} className={`p-4 rounded-xl border ${
                  isCorrect ? 'bg-green-50/50 border-green-100' : 'bg-red-50/50 border-red-100'
                }`}>
                  <div className="flex items-start gap-3 mb-3">
                    {isCorrect ? (
                      <CheckCircle2 className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                    ) : (
                      <XCircle className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
                    )}
                    <p className="text-sm font-semibold text-gray-900 leading-snug">
                      {i + 1}. {q.question}
                    </p>
                  </div>
                  
                  <div className="pl-8 space-y-2">
                    {/* User Answer (if wrong) */}
                    {!isCorrect && userAnswer !== undefined && (
                      <div className="text-xs font-medium text-red-600">
                        <span className="text-red-400 mr-1">Your answer:</span> 
                        {q.options[userAnswer]}
                      </div>
                    )}
                    
                    {/* Missed / Correct Answer */}
                    <div className="text-xs font-medium text-green-700">
                      <span className="text-green-500 mr-1">Correct answer:</span> 
                      {q.options[q.correctAnswer]}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Footer Actions */}
      <div className="p-4 bg-white border-t border-gray-100 sticky bottom-0 flex gap-3">
        <Button
          variant="outline"
          onClick={() => navigate(`/quiz/${quiz.id}`)}
          className="w-14 h-14 rounded-full flex items-center justify-center border-gray-200 text-gray-600 flex-shrink-0"
        >
          <RotateCcw className="w-6 h-6" />
        </Button>
        <Button
          onClick={() => navigate(`/course/${quiz.courseId}`)}
          className="flex-1 rounded-full py-6 text-base font-bold shadow-md bg-[#1b439c] hover:bg-[#123075] text-white flex items-center justify-center gap-2"
        >
          Back to Course
          <ArrowRight className="w-5 h-5" />
        </Button>
      </div>
    </div>
  );
}
