import { Link } from 'wouter';
import { Github } from 'lucide-react';
import { SiGoogle } from 'react-icons/si';
import { DoodleLabLogo } from '@/components/DoodleLabLogo';

export default function Login() {
  return (
    <div className="min-h-screen bg-black text-white flex flex-col relative overflow-hidden">
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-0 flex items-center justify-center">
        <div className="w-[600px] h-[600px] rounded-full bg-primary/5 blur-[120px]" />
      </div>

      <div className="p-5 relative z-10">
        <DoodleLabLogo />
      </div>

      <div className="flex-1 flex items-center justify-center px-4 py-8 relative z-10">
        <div className="w-full max-w-md bg-card border border-white/10 p-6 md:p-8 rounded-3xl backdrop-blur-xl">
          <div className="text-center mb-7">
            <h1 className="text-2xl md:text-3xl font-bold mb-2">Welcome back</h1>
            <p className="text-muted-foreground text-sm">Enter your details to access the lab.</p>
          </div>

          <form className="space-y-4 mb-5">
            <div>
              <label className="text-sm font-medium text-muted-foreground block mb-2">Email</label>
              <input
                type="email"
                placeholder="artist@example.com"
                autoComplete="email"
                className="w-full bg-black/50 border border-white/10 rounded-xl p-3 text-white placeholder:text-white/30 focus:outline-none focus:ring-2 focus:ring-primary transition-all text-sm"
              />
            </div>
            <div>
              <div className="flex justify-between items-center mb-2">
                <label className="text-sm font-medium text-muted-foreground">Password</label>
                <Link href="/signup" className="text-xs text-primary hover:underline">Forgot password?</Link>
              </div>
              <input
                type="password"
                placeholder="••••••••"
                autoComplete="current-password"
                className="w-full bg-black/50 border border-white/10 rounded-xl p-3 text-white placeholder:text-white/30 focus:outline-none focus:ring-2 focus:ring-primary transition-all text-sm"
              />
            </div>

            <button type="button" className="w-full bg-primary hover:bg-primary/90 text-black font-bold py-3 rounded-xl transition-colors mt-1 text-sm">
              Sign In
            </button>
          </form>

          <div className="relative mb-5">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-white/10" />
            </div>
            <div className="relative flex justify-center text-xs">
              <span className="bg-card px-2 text-muted-foreground uppercase tracking-widest font-mono">Or continue with</span>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3 mb-5">
            <button className="flex items-center justify-center gap-2 bg-white/5 hover:bg-white/10 border border-white/5 py-3 rounded-xl transition-colors text-sm font-medium">
              <SiGoogle className="w-4 h-4" /> Google
            </button>
            <button className="flex items-center justify-center gap-2 bg-white/5 hover:bg-white/10 border border-white/5 py-3 rounded-xl transition-colors text-sm font-medium">
              <Github className="w-4 h-4" /> GitHub
            </button>
          </div>

          <p className="text-center text-sm text-muted-foreground">
            No account?{' '}
            <Link href="/signup" className="text-white hover:text-primary transition-colors font-medium">
              Sign Up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
