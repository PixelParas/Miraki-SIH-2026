import { useNavigate } from 'react-router-dom';
import { Logo } from '../components/Logo';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ChevronLeft, QrCode } from 'lucide-react';
import { Separator } from '@/components/ui/separator';

export default function RegisterMethod() {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col h-full bg-white relative">
      <div className="flex items-center px-4 pt-6 pb-2">
        <button onClick={() => navigate(-1)} className="p-2 -ml-2 text-black active:bg-gray-100 rounded-full">
          <ChevronLeft className="w-6 h-6" strokeWidth={2.5} />
        </button>
        <div className="flex-1 flex justify-center -ml-6">
          <Logo className="scale-90" />
        </div>
      </div>

      <div className="px-6 py-6 flex flex-col space-y-6">
        <div className="text-center font-semibold text-gray-700 text-sm pb-2 border-b border-gray-200">
          Register with QR Scan or with Link
        </div>

        <div className="space-y-2 pt-2">
          <label className="text-sm font-bold text-gray-800">Link Registration</label>
          <Input 
            type="text" 
            placeholder="Paste your link here" 
            className="h-12 border-gray-300 rounded-md focus-visible:ring-[#1b439c]"
          />
        </div>

        <Button 
          className="w-full bg-[#91a7ce] hover:bg-[#7b94c0] text-white rounded-full py-6 font-semibold"
          disabled
        >
          Register
        </Button>

        <div className="relative py-4">
          <Separator className="bg-gray-200" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-[#4b5563] text-white text-[10px] rounded-full w-7 h-7 flex items-center justify-center font-bold">
            OR
          </div>
        </div>

        <Button 
          className="w-full bg-[#1b439c] hover:bg-[#123075] text-white rounded-full py-6 font-semibold flex items-center gap-2 shadow-sm"
        >
          <QrCode className="w-5 h-5" />
          Scan QR
        </Button>

        <div className="relative py-4 mt-2">
          <Separator className="bg-gray-200" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-[#4b5563] text-white text-[10px] rounded-full w-7 h-7 flex items-center justify-center font-bold">
            OR
          </div>
        </div>

        <p className="text-center text-gray-700 font-medium px-4 leading-relaxed">
          If you know your organisation name correctly please <button onClick={() => navigate('/register-form')} className="text-[#1b439c] font-bold">click here</button> to register
        </p>
      </div>
    </div>
  );
}
