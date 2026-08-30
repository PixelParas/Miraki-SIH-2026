export const Logo = ({ className = "" }: { className?: string }) => {
  return (
    <div className={`flex items-center justify-center space-x-2 ${className}`}>
      {/* Abstract representation of the logo */}
      <div className="w-12 h-12 relative flex items-center justify-center">
        <svg viewBox="0 0 100 100" className="w-full h-full" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M50 20 L65 50 L50 80 L35 50 Z" fill="#FBBF24" />
          <path d="M50 10 C60 20 80 30 90 50 C80 70 60 80 50 90 C40 80 20 70 10 50 C20 30 40 20 50 10 Z" stroke="#3B82F6" strokeWidth="2" />
          <circle cx="50" cy="50" r="8" fill="#1E40AF" />
          <path d="M45 85 C40 90 35 90 30 85 C35 80 40 80 45 85 Z" fill="#1F2937" />
        </svg>
      </div>
      <div className="flex flex-col">
        <span className="text-[#e29329] font-bold text-xl leading-tight">कर्मयोगी <span className="text-[#1a3d82]">भारत</span></span>
        <span className="text-[0.55rem] text-gray-500 font-medium tracking-tighter">— लोकहितं मम करणीयम् —</span>
      </div>
    </div>
  );
};
