import type { Metadata } from 'next';
import './globals.css';
import { Toaster } from 'sonner';
import { UIProvider } from '@/components/providers/ui-provider';

export const metadata: Metadata = {
  title: 'AI Portfolio ? Cyberpunk Edition',
  description: 'High-performance AI-themed portfolio with an admin dashboard.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="dark">
      <body className="min-h-screen text-foreground antialiased">
        <UIProvider>
          {children}
          <Toaster richColors position="top-right" />
        </UIProvider>
      </body>
    </html>
  );
}
