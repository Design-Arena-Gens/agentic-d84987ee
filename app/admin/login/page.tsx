"use client";
import { useState } from 'react';
import { toast } from 'sonner';
import { motion } from 'framer-motion';
import { Mail, ShieldCheck } from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function AdminLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [step, setStep] = useState<'email' | 'otp'>('email');
  const [code, setCode] = useState('');
  const [loading, setLoading] = useState(false);

  const requestOtp = async () => {
    setLoading(true);
    const res = await fetch('/api/auth/request-otp', { method: 'POST', body: JSON.stringify({ email }) });
    setLoading(false);
    if (!res.ok) return toast.error('Failed to send code');
    toast.success('OTP sent to your email');
    setStep('otp');
  };

  const verifyOtp = async () => {
    setLoading(true);
    const res = await fetch('/api/auth/verify-otp', { method: 'POST', body: JSON.stringify({ email, code }) });
    setLoading(false);
    if (!res.ok) return toast.error('Invalid code');
    toast.success('Logged in');
    router.replace('/admin');
  };

  return (
    <div className="container mx-auto px-6 py-20 max-w-md">
      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="glass glow-border rounded-2xl p-6">
        <div className="flex items-center gap-3 text-neon-cyan/80">
          <ShieldCheck className="size-5" />
          <span className="text-xs uppercase tracking-wider">Admin Login</span>
        </div>

        {step === 'email' && (
          <div className="mt-6 space-y-4">
            <label className="block text-sm text-zinc-400">Email</label>
            <input value={email} onChange={(e) => setEmail(e.target.value)} type="email" placeholder="you@domain.com"
                   className="w-full rounded-lg bg-zinc-900/60 border border-white/10 px-3 py-2 outline-none focus:border-neon-cyan/60" />
            <button onClick={requestOtp} disabled={loading || !email}
                    className="w-full glass glow-border rounded-lg py-2 text-sm flex items-center justify-center gap-2">
              <Mail className="size-4" /> Send Code
            </button>
          </div>
        )}

        {step === 'otp' && (
          <div className="mt-6 space-y-4">
            <label className="block text-sm text-zinc-400">Enter 6-digit code</label>
            <input value={code} onChange={(e) => setCode(e.target.value.replace(/\D/g, '').slice(0,6))} inputMode="numeric" placeholder="123456"
                   className="w-full tracking-widest text-center text-xl rounded-lg bg-zinc-900/60 border border-white/10 px-3 py-2 outline-none focus:border-neon-cyan/60" />
            <button onClick={verifyOtp} disabled={loading || code.length !== 6}
                    className="w-full glass glow-border rounded-lg py-2 text-sm">Verify & Continue</button>
          </div>
        )}
      </motion.div>
    </div>
  );
}
