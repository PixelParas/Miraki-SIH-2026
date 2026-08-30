import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Logo } from '../components/Logo';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ChevronLeft } from 'lucide-react';
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

// Import centralized dropdown data — edit values in src/data/mockData.ts
import { MINISTRIES, STATES, DEPARTMENTS, ORGANISATIONS, DESIGNATIONS } from "@/data/mockData";

export default function RegisterForm() {
  const navigate = useNavigate();
  const [govLevel, setGovLevel] = useState('center');
  const [email, setEmail] = useState('');

  return (
    <div className="flex flex-col h-full bg-white relative">
      <div className="flex items-center px-4 pt-6 pb-2">
        <button onClick={() => navigate('/register-method')} className="p-2 -ml-2 text-black active:bg-gray-100 rounded-full">
          <ChevronLeft className="w-6 h-6" strokeWidth={2.5} />
        </button>
        <div className="flex-1 flex justify-center -ml-6">
          <Logo className="scale-90" />
        </div>
      </div>

      <div className="px-6 py-2 flex-1 overflow-y-auto pb-24">
        <h1 className="text-2xl font-bold text-gray-800 mb-6">Register</h1>

        {/* Stepper */}
        <div className="flex items-center justify-between mb-8 px-2 relative">
          <div className="absolute top-4 left-[20%] right-[20%] h-[2px] bg-gray-300 -z-10"></div>
          <div className="flex flex-col items-center gap-1 z-10">
            <div className="w-8 h-8 rounded-full bg-[#f89b29] text-white flex items-center justify-center font-bold text-sm">
              1
            </div>
            <span className="text-xs font-bold text-[#1b439c]">Step - 1</span>
          </div>
          <div className="flex flex-col items-center gap-1 z-10">
            <div className="w-8 h-8 rounded-full bg-[#91a7ce] text-white flex items-center justify-center font-bold text-sm">
              2
            </div>
            <span className="text-xs font-medium text-gray-400">Step - 2</span>
          </div>
        </div>

        {/* Radio Toggle */}
        <RadioGroup defaultValue="center" onValueChange={setGovLevel} className="flex gap-6 mb-6">
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="center" id="center" className="w-5 h-5 border-2 text-[#1b439c] border-gray-400 data-[state=checked]:border-[#1b439c]" />
            <Label htmlFor="center" className="text-base font-semibold text-gray-800 cursor-pointer">Center</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="state" id="state" className="w-5 h-5 border-2 text-[#1b439c] border-gray-400 data-[state=checked]:border-[#1b439c]" />
            <Label htmlFor="state" className="text-base font-semibold text-gray-800 cursor-pointer">State</Label>
          </div>
        </RadioGroup>

        <div className="space-y-5">
          {govLevel === 'center' ? (
            <div className="space-y-2">
              <Label className="text-sm font-bold text-gray-800">Ministry/Department <span className="text-red-500">*</span></Label>
              <Select>
                <SelectTrigger className="w-full h-12 rounded-full border-gray-300 text-gray-500">
                  <SelectValue placeholder="Select ministry" />
                </SelectTrigger>
                <SelectContent>
                  {MINISTRIES.map(m => <SelectItem key={m} value={m}>{m}</SelectItem>)}
                </SelectContent>
              </Select>
            </div>
          ) : (
            <>
              <div className="space-y-2">
                <Label className="text-sm font-bold text-gray-800">State/UT <span className="text-red-500">*</span></Label>
                <Select>
                  <SelectTrigger className="w-full h-12 rounded-full border-gray-300 text-gray-500">
                    <SelectValue placeholder="Select State/UT" />
                  </SelectTrigger>
                  <SelectContent>
                    {STATES.map(s => <SelectItem key={s} value={s}>{s}</SelectItem>)}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label className="text-sm font-bold text-gray-800">Department <span className="text-red-500">*</span></Label>
                <Select>
                  <SelectTrigger className="w-full h-12 rounded-full border-gray-300 text-gray-500">
                    <SelectValue placeholder="Select department" />
                  </SelectTrigger>
                  <SelectContent>
                    {DEPARTMENTS.map(d => <SelectItem key={d} value={d}>{d}</SelectItem>)}
                  </SelectContent>
                </Select>
              </div>
            </>
          )}

          <div className="space-y-2">
            <Label className="text-sm font-bold text-gray-800">Organisation <span className="text-red-500">*</span></Label>
            <Select>
              <SelectTrigger className="w-full h-12 rounded-full border-gray-300 text-gray-500">
                <SelectValue placeholder="Select your organisation" />
              </SelectTrigger>
              <SelectContent>
                {ORGANISATIONS.map(o => <SelectItem key={o} value={o}>{o}</SelectItem>)}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label className="text-sm font-bold text-gray-800">Designation <span className="text-red-500">*</span></Label>
            <Select>
              <SelectTrigger className="w-full h-12 rounded-full border-gray-300 text-gray-500">
                <SelectValue placeholder="Select Designation" />
              </SelectTrigger>
              <SelectContent>
                {DESIGNATIONS.map(d => <SelectItem key={d} value={d}>{d}</SelectItem>)}
              </SelectContent>
            </Select>
          </div>

          {/* Email Box */}
          <div className="border border-dashed border-gray-400 rounded-lg p-4 space-y-4">
            <div className="space-y-2">
              <Label className="text-sm font-bold text-gray-800">Email <span className="text-red-500">*</span></Label>
              <Input 
                type="email" 
                placeholder="Enter your government email address" 
                className="h-12 border-gray-300 rounded-full focus-visible:ring-[#1b439c]"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            
            <p className="text-sm text-gray-500 pr-16 leading-tight">
              Not able to proceed? Get registered through your MDO.<br/>
              <span className="text-[#1b439c] font-bold">Click here</span> to view Nodal Officers.
            </p>

            <div className="flex justify-end">
              <Button 
                className={`rounded-full px-8 font-semibold ${email ? 'bg-[#1b439c] hover:bg-[#123075]' : 'bg-[#91a7ce] hover:bg-[#7b94c0]'} text-white`}
              >
                Send OTP
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Nav / Footer */}
      <div className="absolute bottom-0 w-full bg-white border-t border-gray-200">
        <div className="flex justify-between items-center p-4">
          <Button variant="outline" disabled className="rounded-full px-8 border-gray-300 text-[#91a7ce] font-semibold h-12">
            Previous
          </Button>
          <Button className="rounded-full px-12 bg-[#1b439c] hover:bg-[#123075] text-white font-semibold h-12 border border-[#1b439c]">
            Next
          </Button>
        </div>
        <div className="bg-[#3b3b3b] text-center py-3 text-sm text-gray-300">
          Already have an account? <button onClick={() => navigate('/')} className="font-semibold text-white">Sign in here</button>
        </div>
      </div>
    </div>
  );
}
