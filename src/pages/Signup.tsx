import { Link } from 'wouter';
import { DoodleLabLogo } from '@/components/DoodleLabLogo';
import { useState } from 'react';
import { useToast } from '@/hooks/use-toast';

export default function Signup() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [agreed, setAgreed] = useState(false);
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !password) {
      toast({ title: 'Missing fields', description: 'Please fill in all fields.', variant: 'destructive' });
      return;
    }
    if (!agreed) {
      toast({ title: 'Terms required', description: 'Please agree to the Cookie Policy and Privacy terms.', variant: 'destructive' });
      return;
    }
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      toast({ title: 'Coming soon', description: 'Account creation will be available shortly.' });
    }, 800);
  };

  return (
    <div className="min-h-screen bg-black text-white flex flex-col relative overflow-hidden">
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-0 flex items-center justify-center">
        <div className="w-[600px] h-[600px] rounded-full" style={{ background: 'rgba(255,107,107,0.05)', filter: 'blur(120px)' }} />
      </div>

      <div className="p-5 relative z-10">
        <DoodleLabLogo />
      </div>

      <div className="flex-1 flex items-center justify-center px-4 py-8 relative z-10">
        <div className="w-full max-w-md bg-card border border-white/10 p-6 md:p-8 rounded-3xl backdrop-blur-xl">
          <div className="text-center mb-7">
            <h1 className="text-2xl md:text-3xl font-bold mb-2">Create Account</h1>
            <p className="text-muted-foreground text-sm">Your first image is 30 seconds away.</p>
          </div>

          <form className="space-y-4 mb-5" onSubmit={handleSubmit} noValidate>
            <div>
              <label className="text-sm font-medium text-muted-foreground block mb-2">Full Name</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Your name"
                autoComplete="name"
                className="w-full bg-black/50 border border-white/10 rounded-xl p-3 text-white placeholder:text-white/30 focus:outline-none focus:ring-2 focus:ring-primary transition-all text-sm"
              />
            </div>
            <div>
              <label className="text-sm font-medium text-muted-foreground block mb-2">Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                autoComplete="email"
                className="w-full bg-black/50 border border-white/10 rounded-xl p-3 text-white placeholder:text-white/30 focus:outline-none focus:ring-2 focus:ring-primary transition-all text-sm"
              />
            </div>
            <div>
              <label className="text-sm font-medium text-muted-foreground block mb-2">Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                autoComplete="new-password"
                className="w-full bg-black/50 border border-white/10 rounded-xl p-3 text-white placeholder:text-white/30 focus:outline-none focus:ring-2 focus:ring-primary transition-all text-sm"
              />
            </div>

            <div className="flex items-start gap-2 pt-1">
              <input
                type="checkbox"
                id="terms"
                checked={agreed}
                onChange={(e) => setAgreed(e.target.checked)}
                className="mt-1 bg-black/50 border-white/10 rounded accent-primary"
              />
              <label htmlFor="terms" className="text-xs text-muted-foreground leading-relaxed">
                I agree to the{' '}
                <Link href="/cookies" className="text-primary hover:underline">Cookie Policy</Link>
                {' '}and{' '}
                <Link href="/about" className="text-primary hover:underline">Privacy terms</Link>.
              </label>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-lab hover:opacity-90 disabled:opacity-60 disabled:cursor-not-allowed text-black font-bold py-3 rounded-xl transition-all uppercase tracking-wide text-sm"
            >
              {loading ? 'Creating...' : 'Create Account'}
            </button>
          </form>

          <p className="text-center text-sm text-muted-foreground">
            Already have an account?{' '}
            <Link href="/login" className="text-white hover:text-primary transition-colors font-medium">
              Sign In
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
