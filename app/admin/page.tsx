import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { verifyJwt } from '@/lib/jwt';
import { motion } from 'framer-motion';
import { Cloud, LogOut, Shield } from 'lucide-react';

export default async function AdminPage() {
  const token = cookies().get('auth_token')?.value;
  const user = token ? verifyJwt(token) : null;
  if (!user || user.role !== 'admin') redirect('/admin/login');

  return (
    <div className="container mx-auto px-6 py-12">
      <div className="flex items-center gap-3 text-neon-cyan/80">
        <Shield className="size-5" />
        <span className="text-xs uppercase tracking-wider">Admin Dashboard</span>
      </div>

      <h1 className="mt-3 text-3xl font-bold">Welcome, {user.email}</h1>

      <div className="mt-8 grid md:grid-cols-2 gap-6">
        <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} className="glass glow-border rounded-2xl p-6">
          <div className="flex items-center gap-2 text-zinc-400"><Cloud className="size-4" /> Cloudinary Upload</div>
          <form action="/api/media/upload" method="post" encType="multipart/form-data" className="mt-4 space-y-3">
            <input name="file" type="file" accept="image/*,video/*,application/pdf" className="w-full text-sm" />
            <button className="glass glow-border rounded-lg px-4 py-2 text-sm">Upload</button>
          </form>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} className="glass glow-border rounded-2xl p-6">
          <div className="flex items-center justify-between">
            <div className="text-zinc-400">Session</div>
            <form action="/api/auth/logout" method="post">
              <button className="inline-flex items-center gap-2 text-sm text-zinc-400 hover:text-white"><LogOut className="size-4" /> Logout</button>
            </form>
          </div>
          <div className="mt-4 text-sm text-zinc-500">JWT stored in HttpOnly cookie. Role: {user.role}</div>
        </motion.div>
      </div>
    </div>
  );
}
