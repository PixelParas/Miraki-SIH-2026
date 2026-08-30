import { useNavigate } from 'react-router-dom';
import { Logo } from '../components/Logo';
import { Button } from '@/components/ui/button';

export default function Landing() {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col h-full bg-white relative">
      {/* Top Logo Area */}
      <div className="py-6 flex justify-center bg-white shrink-0">
        <Logo />
      </div>

      {/* Hero Section */}
      <div className="bg-[#124b9e] shrink-0 text-white relative flex flex-col justify-between h-[270px] overflow-hidden shadow-md">
        {/* Decorative background subtle chevron/tech pattern */}
        <div className="absolute inset-0 bg-[radial-gradient(#ffffff20_1px,transparent_1px)] [background-size:20px_20px] pointer-events-none" />
        <div className="absolute top-10 right-28 w-24 h-24 bg-white/5 rounded-full blur-xl pointer-events-none" />

        {/* Top Text */}
        <div className="pt-6 px-4 z-10">
          <h1 className="text-[26px] font-black tracking-wider text-left uppercase drop-shadow">
            KARMAYOGI BHARAT
          </h1>
        </div>

        {/* Bottom-left sub-title */}
        <div className="px-4 pb-4 z-10">
          <h2 className="text-xl font-bold tracking-normal drop-shadow">
            iGOT Karmayogi
          </h2>
        </div>

        {/* Hero Portrait - enlarged & placed on right */}
        <img
          src="/hero-portrait.png"
          alt="Hero"
          className="absolute right-0 bottom-[36px] h-[210px] w-auto object-contain z-10 pointer-events-none drop-shadow-lg"
        />

        {/* Orange Banner */}
        <div className="w-full bg-[#f89b29] text-black font-extrabold text-center text-xs py-2 px-2 z-20 leading-snug tracking-tight uppercase shadow-sm">
          TRANSFORMING GOVERNMENT OFFICIALS,<br />TRANSFORMING INDIA
        </div>
      </div>

      {/* Content Area */}
      <div className="flex-1 overflow-y-auto px-6 pt-6 flex flex-col items-center text-center space-y-6 pb-20">
        <p className="text-gray-700 font-medium text-sm leading-relaxed max-w-sm">
          National Programme for Civil Services Capacity Building, aptly named as Mission Karmayogi, aims to create a professional, well-trained and future-looking civil service.
        </p>

        <div className="w-full max-w-xs space-y-3 mt-4">
          <Button 
            className="w-full bg-[#1b439c] hover:bg-[#123075] text-white rounded-full py-6 text-base font-semibold shadow-sm"
            onClick={() => navigate('/dashboard')}
          >
            Sign In
          </Button>
          <Button 
            className="border-[#1b439c] w-full bg-white hover:bg-blue-50 text-[#1b439c] rounded-full py-6 text-base font-semibold shadow-sm"
            //className="w-full border-[1px] border-border border-red-700 text-[#1b439c] hover:bg-blue-50 rounded-full py-6 text-base font-semibold shadow-sm"
            onClick={() => navigate('/register-method')}
          >
            Register
          </Button>
        </div>

        <div className="flex space-x-2 pt-2">
          <div className="w-6 h-1.5 bg-[#1b439c] rounded-full"></div>
          <div className="w-2 h-1.5 bg-gray-300 rounded-full"></div>
          <div className="w-2 h-1.5 bg-gray-300 rounded-full"></div>
        </div>
      </div>

      {/* Bottom Navigation */}
      <div className="absolute bottom-0 w-full bg-[#2a4387] flex text-white divide-x divide-white/20">
        <button className="flex-1 py-4 text-sm font-semibold hover:bg-[#1d2f61] transition-colors">
          Need Help?
        </button>
        <button className="flex-1 py-4 text-sm font-semibold hover:bg-[#1d2f61] transition-colors">
          Featured Contents
        </button>
      </div>
    </div>
  );
}
