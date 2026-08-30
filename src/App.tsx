/**
 * App – root component with all route definitions.
 *
 * Route structure:
 *   /                      → Landing (sign-in / register)
 *   /register-method       → Registration method selector
 *   /register-form         → Multi-step registration form
 *   /dashboard             → Home / Dashboard
 *   /explore               → My Space / trending courses
 *   /search                → Search courses
 *   /my-learning           → Enrolled / completed courses
 *   /course/:courseId       → Course detail
 *   /course/:courseId/player/:moduleId → Video player
 *   /quiz/:quizId           → Quiz summary
 *   /quiz/:quizId/attempt   → Active quiz
 *   /provider/:providerId   → Marketplace provider detail
 */
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { MobileLayout } from "./layouts/MobileLayout";

// Pages
import Landing from "./pages/Landing";
import RegisterMethod from "./pages/RegisterMethod";
import RegisterForm from "./pages/RegisterForm";
import Dashboard from "./pages/Dashboard";
import Explore from "./pages/Explore";
import SearchPage from "./pages/SearchPage";
import MyLearning from "./pages/MyLearning";
import CourseDetail from "./pages/CourseDetail";
import CoursePlayer from "./pages/CoursePlayer";
import QuizStart from "./pages/QuizStart";
import QuizAttempt from "./pages/QuizAttempt";
import QuizResult from "./pages/QuizResult";
import ProviderDetail from "./pages/ProviderDetail";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MobileLayout />}>
          {/* Auth / onboarding */}
          <Route index element={<Landing />} />
          <Route path="register-method" element={<RegisterMethod />} />
          <Route path="register-form" element={<RegisterForm />} />

          {/* Main app (post-login) */}
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="explore" element={<Explore />} />
          <Route path="search" element={<SearchPage />} />
          <Route path="my-learning" element={<MyLearning />} />

          {/* Course flow */}
          <Route path="course/:courseId" element={<CourseDetail />} />
          <Route path="course/:courseId/player/:moduleId" element={<CoursePlayer />} />

          {/* Quiz flow */}
          <Route path="quiz/:quizId" element={<QuizStart />} />
          <Route path="quiz/:quizId/attempt" element={<QuizAttempt />} />
          <Route path="quiz/:quizId/result" element={<QuizResult />} />

          {/* Marketplace */}
          <Route path="provider/:providerId" element={<ProviderDetail />} />

          {/* Catch-all */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
