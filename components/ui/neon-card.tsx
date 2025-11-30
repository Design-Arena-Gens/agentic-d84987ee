"use client";
import Link from 'next/link';
import { motion } from 'framer-motion';
import type { ReactNode } from 'react';

export function NeonCard({ title, href, icon }: { title: string; href: string; icon?: ReactNode }) {
  return (
    <motion.div whileHover={{ y: -4 }} transition={{ type: 'spring', stiffness: 300, damping: 20 }}
      className="glass glow-border rounded-2xl p-5">
      <Link href={href} className="block">
        <div className="flex items-center gap-3 text-neon-cyan/80">
          {icon}
          <span className="text-xs uppercase tracking-wider">Featured</span>
        </div>
        <h3 className="mt-3 text-xl font-semibold">{title}</h3>
        <p className="mt-2 text-sm text-zinc-400">Exploring the edge between intelligence and interface.</p>
      </Link>
    </motion.div>
  );
}
