import { useState, useEffect, useCallback } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  X,
  Eye,
  Flag,
  ChevronUp,
  ChevronDown,
  Info,
  Check,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { ALL_QUIZZES } from "@/data/contentDb";
import { recordQuizAttempt, CURRENT_USER } from "@/data/userDb";

export default function QuizAttempt() {
  const { quizId } = useParams<{ quizId: string }>();
  const navigate = useNavigate();

  const quiz = quizId ? ALL_QUIZZES[quizId] : undefined;

  // Map of questionId -> selected option index (or null if unanswered)
  const [answers, setAnswers] = useState<Record<string, number | null>>(() => {
    const map: Record<string, number | null> = {};
    quiz?.questions.forEach((q) => { map[q.id] = null; });
    return map;
  });

  const [currentIdx, setCurrentIdx] = useState(0);
  const [navOpen, setNavOpen] = useState(true);
  const [timeLeft, setTimeLeft] = useState(quiz?.timeLimit || 0);
  const [showSubmitModal, setShowSubmitModal] = useState(false);

  // Timer
  useEffect(() => {
    if (!quiz?.timeLimit || timeLeft <= 0) return;
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          submitQuiz(true);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, [quiz]);

  if (!quiz) {
    return (
      <div className="flex items-center justify-center h-full">
        <p className="text-gray-500">Quiz not found</p>
      </div>
    );
  }

  const totalQuestions = quiz.questions.length;
  const question = quiz.questions[currentIdx];
  const answeredCount = Object.values(answers).filter((v) => v !== null).length;
  const unansweredCount = totalQuestions - answeredCount;

  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m}:${s.toString().padStart(2, "0")}`;
  };

  const selectOption = useCallback(
    (optionIdx: number) => {
      setAnswers((prev) => ({ ...prev, [question.id]: optionIdx }));
    },
    [question.id]
  );

  const goPrev = () => {
    if (currentIdx > 0) setCurrentIdx(currentIdx - 1);
  };

  const submitQuiz = (autoSubmit = false) => {
    // Calculate score
    let correctCount = 0;
    quiz.questions.forEach((q) => {
      if (answers[q.id] === q.correctAnswer) correctCount++;
    });
    const percentage = Math.round((correctCount / quiz.questions.length) * 100);
    const passed = percentage >= quiz.passingScore;

    const filteredAnswers: Record<string, number> = {};
    Object.entries(answers).forEach(([k, v]) => { if (v !== null) filteredAnswers[k] = v; });

    recordQuizAttempt({
      userId: CURRENT_USER.id,
      quizId: quiz.id,
      courseId: quiz.courseId,
      sectionId: quiz.sectionId,
      attemptedAt: new Date().toISOString(),
      answers: filteredAnswers,
      score: percentage,
      passed,
    });

    navigate(`/quiz/${quiz.id}/result`, {
      state: { answers, autoSubmit }
    });
  };

  const handleDone = () => {
    setShowSubmitModal(true);
  };

  return (
    <div className="flex flex-col h-full bg-white relative">
      {/* ─── Header ─── */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-gray-200">
        <button
          onClick={() => navigate(-1)}
          className="p-1 active:bg-gray-100 rounded-full shrink-0"
        >
          <X className="w-5 h-5 text-gray-600" />
        </button>
        <h1 className="text-sm font-bold text-gray-800 text-center px-2 break-words">
          {quiz.title}
        </h1>
        {quiz.timeLimit ? (
          <div className={`flex items-center gap-1 border rounded-full px-3 py-1 shrink-0 ${
            timeLeft < 60 ? "border-red-300 bg-red-50" : "border-gray-300 bg-blue-50/50"
          }`}>
            <span className={`text-xs font-semibold ${timeLeft < 60 ? "text-red-600" : "text-[#1b439c]"}`}>
              ⏱ {formatTime(timeLeft)}
            </span>
          </div>
        ) : (
          <div className="w-6 shrink-0" />
        )}
      </div>

      {/* ─── Stats bar ─── */}
      <div className="flex justify-center gap-8 py-3 border-b border-gray-200">
        <div className="text-center">
          <p className="text-lg font-bold text-red-500">{unansweredCount}</p>
          <p className="text-[10px] text-gray-500 font-medium">Not answered</p>
        </div>
        <div className="text-center">
          <p className="text-lg font-bold text-gray-800">{answeredCount}</p>
          <p className="text-[10px] text-gray-500 font-medium">Answered</p>
        </div>
        <div className="text-center">
          <p className="text-lg font-bold text-[#1b439c]">{quiz.passingScore}%</p>
          <p className="text-[10px] text-gray-500 font-medium">Passing Criteria</p>
        </div>
      </div>

      {/* ─── Question label + info ─── */}
      <div className="flex items-center justify-center gap-1 py-2 text-xs text-gray-500 font-medium border-b border-gray-200">
        <span>Question</span>
        <Info className="w-3 h-3" />
      </div>

      {/* ─── Question number pills ─── */}
      <div className="flex items-center justify-center gap-2 py-3 px-4 overflow-x-auto scrollbar-hide border-b border-gray-200">
        {quiz.questions.map((q, idx) => {
          const isAnswered = answers[q.id] !== null;
          const isCurrent = idx === currentIdx;

          return (
            <button
              key={q.id}
              onClick={() => setCurrentIdx(idx)}
              className={`w-10 h-10 rounded-md flex items-center justify-center font-bold text-sm border-2 transition-all shrink-0
                ${
                  isCurrent
                    ? "border-[#1b439c] bg-[#1b439c] text-white"
                    : isAnswered
                      ? "border-green-500 bg-green-50 text-green-700"
                      : "border-gray-300 bg-white text-gray-600"
                }`}
            >
              {isAnswered && !isCurrent ? (
                <Check className="w-4 h-4" />
              ) : (
                idx + 1
              )}
            </button>
          );
        })}
      </div>

      {/* ─── Collapse / expand toggle ─── */}
      <div className="flex justify-center py-1">
        <button
          onClick={() => setNavOpen(!navOpen)}
          className="p-1 bg-gray-800 text-white rounded-full"
        >
          {navOpen ? (
            <ChevronUp className="w-4 h-4" />
          ) : (
            <ChevronDown className="w-4 h-4" />
          )}
        </button>
      </div>

      {/* ─── Question body ─── */}
      <div className="flex-1 overflow-y-auto px-4 pb-24">
        {/* Question counter + actions */}
        <div className="flex items-center justify-between py-3">
          <p className="text-sm text-gray-700">
            Question{" "}
            <span className="font-bold">{currentIdx + 1} out of {totalQuestions}</span>
          </p>
          <div className="flex items-center gap-3 text-gray-400">
            <button className="p-1">
              <Eye className="w-5 h-5" />
            </button>
            <button className="p-1">
              <Flag className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Question text */}
        <p className="text-sm font-medium text-gray-800 leading-relaxed mb-2">
          {question.question}
        </p>

        <p className="text-xs text-gray-500 font-semibold mb-4">
          Single selection-MCQs
        </p>

        {/* Options */}
        <div className="space-y-3">
          {question.options.map((opt, optIdx) => {
            const isSelected = answers[question.id] === optIdx;

            return (
              <button
                key={optIdx}
                onClick={() => selectOption(optIdx)}
                className={`w-full flex items-start gap-3 p-4 rounded-xl border-2 text-left transition-all
                  ${
                    isSelected
                      ? "border-[#1b439c] bg-blue-50"
                      : "border-gray-200 bg-white hover:border-gray-300"
                  }`}
              >
                {/* Radio circle */}
                <div
                  className={`w-5 h-5 rounded-full border-2 flex-shrink-0 mt-0.5 flex items-center justify-center
                    ${
                      isSelected
                        ? "border-[#1b439c] bg-[#1b439c]"
                        : "border-gray-400"
                    }`}
                >
                  {isSelected && (
                    <div className="w-2 h-2 rounded-full bg-white" />
                  )}
                </div>
                <span
                  className={`text-sm leading-snug ${
                    isSelected
                      ? "text-[#1b439c] font-medium"
                      : "text-gray-700"
                  }`}
                >
                  {opt}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* ─── Previous / Next / Done footer ─── */}
      <div className="absolute bottom-0 left-0 right-0 flex items-center p-4 bg-white border-t border-gray-200 gap-3">
        <Button
          variant="outline"
          disabled={currentIdx <= 0}
          onClick={goPrev}
          className="flex-1 rounded-full py-5 font-semibold border-gray-300"
        >
          Previous
        </Button>
        {currentIdx < totalQuestions - 1 ? (
          <Button
            onClick={() => setCurrentIdx(currentIdx + 1)}
            className="flex-1 bg-[#1b439c] hover:bg-[#123075] text-white rounded-full py-5 font-semibold"
          >
            Next
          </Button>
        ) : (
          <Button
            onClick={handleDone}
            className="flex-1 bg-[#1b439c] hover:bg-[#123075] text-white rounded-full py-5 font-semibold"
          >
            Done
          </Button>
        )}
      </div>

      {/* ─── Submit Confirmation Modal ─── */}
      {showSubmitModal && (
        <div className="absolute inset-0 z-50 flex items-end justify-center bg-black/40">
          <div className="bg-white w-full rounded-t-3xl p-6 shadow-xl relative animate-in slide-in-from-bottom-full duration-200">
            <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-16 h-1.5 bg-gray-300 rounded-full" />
            <p className="text-gray-900 font-semibold mb-6">
              Are you sure you want to submit? Review your answers before submitting.
            </p>
            <div className="flex flex-col gap-3">
              <Button
                onClick={() => submitQuiz(false)}
                className="w-full rounded-full py-6 font-bold bg-[#1b439c] hover:bg-[#123075] text-white"
              >
                Yes, Submit
              </Button>
              <Button
                variant="outline"
                onClick={() => setShowSubmitModal(false)}
                className="w-full rounded-full py-6 font-bold border-gray-300 text-gray-700"
              >
                Cancel, Keep Reviewing
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
