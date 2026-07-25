import { Link } from 'wouter';
import { DoodleLabLogo } from '@/components/DoodleLabLogo';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-black text-white flex flex-col relative overflow-hidden">
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-0 flex items-center justify-center">
        <div className="w-[600px] h-[600px] rounded-full bg-coral/5 blur-[120px]" />
      </div>

      <div className="p-5 relative z-10">
        <DoodleLabLogo />
      </div>

      <div className="flex-1 flex items-center justify-center px-4 py-8 relative z-10">
        <div className="text-center space-y-6 max-w-md">
          <p className="text-8xl font-bold text-gradient-lab animate-gradient">404</p>
          <div>
            <h1 className="text-2xl font-bold mb-2">Page not found</h1>
            <p className="text-muted-foreground font-mono text-sm">
              This page does not exist or was moved.
            </p>
          </div>
          <Link
            href="/"
            className="inline-block bg-primary text-black font-bold px-8 py-3 rounded-xl hover:bg-primary/90 transition-colors text-sm"
          >
            Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
}
