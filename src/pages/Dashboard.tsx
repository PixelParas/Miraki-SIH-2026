/**
 * Dashboard – the home screen after sign-in.
 *
 * Shows:
 *  - Sadhana Saptah promotional banner
 *  - User profile card with stats (from CURRENT_USER mock data)
 *  - Shared bottom navigation (rendered by MobileLayout)
 */
import { useNavigate } from "react-router-dom";
import {
  ChevronUp,
  ChevronRight,
  Video,
  FileBadge,
  Clock,
  Medal,
  Trophy,
  Star,
} from "lucide-react";
import { CURRENT_USER } from "@/data/mockData";

export default function Dashboard() {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col h-full bg-gray-50 relative">
      <div className="flex-1 overflow-y-auto">
        <div className="p-4 space-y-4">
          {/* ─── Sadhana Banner ─── */}
          <div className="bg-[#fcebce] rounded-xl p-4 border border-[#f3c88a] relative overflow-hidden">
            <div className="bg-white rounded-md px-2 py-1 absolute top-2 right-2 flex items-center gap-2 shadow-sm text-[10px]">
              <div className="w-4 h-4 bg-gray-200 rounded-full" />
              <span className="font-semibold text-gray-700">
                Karmayogi Bharat
              </span>
            </div>

            <div className="flex items-start gap-4 mt-6">
              <div className="w-16 h-16 bg-[#2768b5] rounded-full border-4 border-white flex items-center justify-center shrink-0 shadow-md">
                <div className="w-10 h-10 border-2 border-white rounded-full flex items-center justify-center">
                  <div className="w-4 h-4 bg-white rounded-full" />
                </div>
              </div>
              <div className="pt-2">
                <h2 className="text-[#1a3d82] text-3xl font-serif">
                  Sādhana
                </h2>
                <p className="text-[#1a3d82] text-[8px] italic leading-tight mb-1">
                  Strengthening Adaptive Development and Humane Aptitude for
                  National Advancement
                </p>
                <h3 className="text-[#1a3d82] text-xl font-bold">सप्ताह</h3>
                <p className="text-gray-800 text-xs font-bold mt-1">
                  2nd April - 8th April 2024
                </p>
              </div>
            </div>

            <div className="mt-4">
              <p className="text-[#db7823] font-bold text-sm">
                Your participation matters -
              </p>
              <p className="text-[#1a3d82] font-bold text-base">
                Commit to{" "}
                <span className="font-black">4 hours of learning!</span>
              </p>
            </div>

            <p className="mt-2 text-sm font-semibold italic text-gray-800 pr-12">
              Engage, learn, and contribute to our vision of a Viksit Bharat!
            </p>

            <button
              onClick={() => navigate("/explore")}
              className="mt-6 bg-[#eba529] hover:bg-[#d89622] text-gray-900 font-bold text-xs py-2 px-4 rounded shadow-sm active:scale-95 transition-transform"
            >
              Click Here to Join Sadhana Saptah
            </button>

            {/* Decorative circle */}
            <div className="absolute -bottom-10 -right-10 w-48 h-48 opacity-20 pointer-events-none">
              <svg
                viewBox="0 0 100 100"
                className="w-full h-full fill-[#1a3d82] stroke-[#db7823] stroke-2"
              >
                <path d="M50 100 C20 100 0 80 0 50 C0 20 20 0 50 0 C80 0 100 20 100 50 C100 80 80 100 50 100 Z" />
              </svg>
            </div>
          </div>

          {/* ─── Profile Card ─── */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
            <div className="p-4">
              {/* Name */}
              <div className="flex justify-between items-center mb-2">
                <h2 className="text-lg font-bold text-gray-800">
                  Hey {CURRENT_USER.name}!
                </h2>
                <button className="text-[#1b439c]">
                  <ChevronUp className="w-5 h-5" />
                </button>
              </div>

              {/* Profile completion */}
              <button
                onClick={() => navigate("/my-learning")}
                className="flex items-center gap-2 mb-6 w-full"
              >
                <div className="h-1.5 flex-1 bg-gray-200 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-green-500"
                    style={{ width: `${CURRENT_USER.profileCompletion}%` }}
                  />
                </div>
                <span className="text-sm text-gray-500 flex items-center whitespace-nowrap">
                  Profile is {CURRENT_USER.profileCompletion}% completed
                  <ChevronRight className="w-3 h-3 ml-1" />
                </span>
              </button>

              {/* Stats row 1 */}
              <div className="grid grid-cols-3 gap-4 border-b border-gray-100 pb-4 mb-4">
                {[
                  { icon: Video, label: "In progress", value: "2" }, // Mocking to 2
                  { icon: FileBadge, label: "Certificates", value: String(CURRENT_USER.certificates.length) },
                  { icon: Clock, label: "Learning hours", value: `${Math.floor(CURRENT_USER.learningHoursTotal / 60)}h ${CURRENT_USER.learningHoursTotal % 60}m` },
                ].map(({ icon: Icon, label, value }) => (
                  <div key={label} className="flex flex-col">
                    <Icon className="w-5 h-5 text-[#d97c27] mb-2" />
                    <span className="text-sm text-gray-600 font-medium">
                      {label}
                    </span>
                    <span className="text-xl font-bold text-[#1b439c] mt-1">
                      {value}
                    </span>
                  </div>
                ))}
              </div>

              {/* Stats row 2 */}
              <div className="grid grid-cols-3 gap-2 border-b border-gray-100 pb-4 mb-2">
                {/* Karma Points */}
                <div className="flex flex-col items-center text-center">
                  <div className="flex items-center gap-1 mb-2">
                    <span className="text-xs text-gray-500 font-medium">
                      Karma Points
                    </span>
                    <div className="w-3 h-3 bg-[#1b439c] text-white rounded-full flex items-center justify-center text-[8px] font-bold">
                      i
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-full bg-yellow-400 flex items-center justify-center border-2 border-yellow-500 shadow-sm">
                      <Star className="w-4 h-4 text-white fill-white" />
                    </div>
                    <span className="font-bold text-gray-800">
                      {CURRENT_USER.karmaPoints}
                    </span>
                  </div>
                </div>

                {/* Leaderboard */}
                <div className="flex flex-col items-center text-center border-l border-gray-100">
                  <div className="flex items-center gap-1 mb-2">
                    <span className="text-xs text-gray-500 font-medium">
                      Leaderboard
                    </span>
                    <div className="w-3 h-3 bg-[#1b439c] text-white rounded-full flex items-center justify-center text-[8px] font-bold">
                      i
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Trophy className="w-6 h-6 text-[#1b439c] fill-[#4a80d0]" />
                    <span className="font-bold text-gray-800">
                      {CURRENT_USER.leaderboardRank}
                    </span>
                  </div>
                </div>

                {/* Badges */}
                <div className="flex flex-col items-center text-center border-l border-gray-100">
                  <div className="flex items-center gap-1 mb-2">
                    <span className="text-xs text-gray-500 font-medium">
                      My Badges
                    </span>
                    <div className="w-3 h-3 bg-[#1b439c] text-white rounded-full flex items-center justify-center text-[8px] font-bold">
                      i
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-6 h-6 rounded-full bg-yellow-100 border border-yellow-500 flex items-center justify-center">
                      <Medal className="w-4 h-4 text-yellow-600" />
                    </div>
                    <span className="font-bold text-gray-800">
                      {CURRENT_USER.badges}
                    </span>
                  </div>
                </div>
              </div>

              {/* Weekly claps */}
              <div className="flex justify-between items-center py-2">
                <div className="flex items-center gap-1">
                  <span className="text-sm font-bold text-gray-700">
                    Weekly claps
                  </span>
                  <div className="w-3 h-3 bg-[#1b439c] text-white rounded-full flex items-center justify-center text-[8px] font-bold">
                    i
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-2xl">👏</span>
                  <span className="font-bold text-gray-800">
                    {CURRENT_USER.weeklyClaps} weeks
                  </span>
                </div>
              </div>
            </div>

            {/* Show my activities link */}
            <button
              onClick={() => navigate("/my-learning")}
              className="w-full bg-blue-50/50 p-3 flex justify-between items-center border-t border-blue-100 hover:bg-blue-50"
            >
              <div className="flex items-center gap-2 text-[#1b439c] font-semibold text-sm">
                <svg
                  className="w-4 h-4"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <rect x="3" y="3" width="6" height="18" rx="1" />
                  <rect x="11" y="9" width="6" height="12" rx="1" />
                  <rect x="19" y="15" width="6" height="6" rx="1" />
                </svg>
                Show my activities
              </div>
              <ChevronRight className="w-4 h-4 text-[#1b439c]" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
