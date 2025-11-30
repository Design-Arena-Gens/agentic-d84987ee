import { motion } from 'framer-motion';
import Link from 'next/link';
import { BrainCircuit, Github, Mail, Sparkles, Terminal } from 'lucide-react';
import { NeonCard } from '@/components/ui/neon-card';

export default function HomePage() {
  return (
    <main className="relative">
      <section className="container mx-auto px-6 py-20">
        <div className="flex items-center gap-3 text-neon-cyan/90">
          <Sparkles className="size-5" />
          <span className="text-sm tracking-widest uppercase">AI Engineer ? Full-Stack</span>
        </div>
        <h1 className="mt-4 text-4xl md:text-6xl font-black h1-grad">Building intelligent, beautiful web experiences</h1>
        <p className="mt-6 max-w-2xl text-zinc-400">
          I craft performant applications with Next.js, TypeScript, and tasteful interactions. This portfolio showcases
          projects, experiments, and an admin area powered by custom OTP auth.
        </p>
        <div className="mt-8 flex gap-4">
          <Link href="#projects" className="glass glow-border rounded-xl px-5 py-3 text-sm">View Projects</Link>
          <Link href="/admin/login" className="glass glow-border rounded-xl px-5 py-3 text-sm">Admin</Link>
          <a href="mailto:hi@example.com" className="glass glow-border rounded-xl px-5 py-3 text-sm inline-flex items-center gap-2">
            <Mail className="size-4" /> Contact
          </a>
        </div>
      </section>

      <section id="projects" className="container mx-auto px-6 pb-24 grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {['Neural UX', 'Inference-as-UI', 'Latent Landscapes'].map((title, i) => (
          <NeonCard key={i} title={title} icon={<BrainCircuit className="size-5" />} href="#" />
        ))}
      </section>

      <footer className="border-t border-white/10">
        <div className="container mx-auto px-6 py-8 flex items-center justify-between text-sm text-zinc-500">
          <span className="inline-flex items-center gap-2"><Terminal className="size-4" /> AI Portfolio</span>
          <div className="flex items-center gap-4">
            <a className="hover:text-white" href="https://github.com" target="_blank" rel="noreferrer"><Github className="size-4" /></a>
          </div>
        </div>
      </footer>
    </main>
  );
}
