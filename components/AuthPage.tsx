
import React, { useState, useEffect } from 'react';
import { BarChart2, ArrowRight, Lock, Mail, User, ShieldCheck, Loader2, Star } from 'lucide-react';
import { userService } from '../services/userService';

interface AuthPageProps {
  onLogin: (isAdmin: boolean) => void;
}

const TESTIMONIALS = [
  {
    text: "Scalr generated $50k in leads in my first week. The cold email tool is absolutely unfair to my competition.",
    author: "James C.",
    role: "Agency Founder"
  },
  {
    text: "I stopped hiring copywriters. The Ghostwriter engine captures my voice perfectly and never misses a deadline.",
    author: "Elena R.",
    role: "SaaS CEO"
  },
  {
    text: "The Profile Audit found a $10k hole in my funnel. Fixed it in 5 minutes. Best ROI I've ever had.",
    author: "Marcus T.",
    role: "Consultant"
  }
];

const AuthPage: React.FC<AuthPageProps> = ({ onLogin }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  // Slider State
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % TESTIMONIALS.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const handleAuth = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    // Immediate Execution (No Demo Delay)
    if (email === 'admin@scalr.ai' && password === 'admin123') {
        onLogin(true); // Is Admin
        return;
    }

    if (isLogin) {
        // User Login
        const user = userService.login(email);
        if (user) {
            onLogin(false);
        } else {
            setError("Account not found. Please sign up.");
            setLoading(false);
        }
    } else {
        // User Registration
        if (!name || !email || !password) {
            setError("All fields are required.");
            setLoading(false);
            return;
        }
        const result = userService.register(name, email);
        if (typeof result === 'string') {
            setError(result);
            setLoading(false);
        } else {
            // Success, auto login
            onLogin(false);
        }
    }
  };

  return (
    <div className="min-h-screen flex bg-white font-sans text-slate-900">
      
      {/* Left Panel - Visuals & Slider */}
      <div className="hidden lg:flex lg:w-1/2 bg-[#0B1121] relative overflow-hidden flex-col justify-between p-16">
         {/* Background Effects */}
         <div className="absolute top-[-20%] right-[-10%] w-[800px] h-[800px] bg-blue-600/20 rounded-full blur-[120px]"></div>
         <div className="absolute bottom-[-10%] left-[-10%] w-[600px] h-[600px] bg-indigo-600/20 rounded-full blur-[100px]"></div>
         <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.05]"></div>

         {/* Header */}
         <div className="relative z-10">
            <div className="flex items-center gap-3 mb-12">
                <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center shadow-lg shadow-blue-600/30">
                  <BarChart2 size={22} className="text-white" />
                </div>
                <span className="font-display font-bold text-2xl tracking-tight text-white">Scalr<span className="text-blue-500">.ai</span></span>
            </div>
            
            <h1 className="text-5xl font-black text-white leading-[1.1] mb-6 tracking-tight">
                Revenue Architecture <br/> For The Top 1%.
            </h1>
            <p className="text-slate-400 text-lg max-w-md leading-relaxed">
                Join 10,000+ elite marketers using Scalr to generate high-ticket funnels, audit competitors, and dominate their niche.
            </p>
         </div>

         {/* Testimonial Slider */}
         <div className="relative z-10 mt-auto">
             <div className="mb-6 flex gap-1">
                {[...Array(5)].map((_, i) => (
                    <Star key={i} size={16} className="fill-yellow-500 text-yellow-500" />
                ))}
             </div>
             
             <div className="relative h-32">
                 {TESTIMONIALS.map((slide, idx) => (
                     <div 
                        key={idx}
                        className={`absolute inset-0 transition-all duration-700 ease-in-out ${idx === currentSlide ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-8 pointer-events-none'}`}
                     >
                         <p className="text-xl font-medium text-white leading-relaxed mb-4">"{slide.text}"</p>
                         <div>
                             <div className="text-white font-bold">{slide.author}</div>
                             <div className="text-blue-400 text-sm">{slide.role}</div>
                         </div>
                     </div>
                 ))}
             </div>

             {/* Slider Indicators */}
             <div className="flex gap-2 mt-4">
                 {TESTIMONIALS.map((_, idx) => (
                     <button 
                        key={idx}
                        onClick={() => setCurrentSlide(idx)}
                        className={`h-1 rounded-full transition-all duration-300 ${idx === currentSlide ? 'w-8 bg-blue-500' : 'w-2 bg-slate-700 hover:bg-slate-600'}`}
                     />
                 ))}
             </div>
         </div>
      </div>

      {/* Right Panel - Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8 bg-white relative">
         <div className="max-w-md w-full space-y-8">
            <div className="text-center lg:text-left">
                <h2 className="text-3xl font-black text-slate-900 tracking-tight mb-2">
                    {isLogin ? 'Welcome Back' : 'Create Account'}
                </h2>
                <p className="text-slate-500">
                    {isLogin ? 'Enter your credentials to access the dashboard.' : 'Start your 14-day free trial. No credit card required.'}
                </p>
            </div>

            <form onSubmit={handleAuth} className="space-y-5">
                {!isLogin && (
                    <div className="space-y-1.5 animate-fade-in-up">
                        <label className="text-xs font-bold uppercase tracking-widest text-slate-500 ml-1">Full Name</label>
                        <div className="relative">
                            <User className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                            <input 
                                type="text" 
                                placeholder="John Doe"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                className="w-full bg-slate-50 border border-slate-200 rounded-xl py-3.5 pl-11 pr-4 text-slate-900 focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition-all font-medium"
                            />
                        </div>
                    </div>
                )}

                <div className="space-y-1.5">
                    <label className="text-xs font-bold uppercase tracking-widest text-slate-500 ml-1">Email Address</label>
                    <div className="relative">
                        <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                        <input 
                            type="email" 
                            placeholder="name@company.com"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full bg-slate-50 border border-slate-200 rounded-xl py-3.5 pl-11 pr-4 text-slate-900 focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition-all font-medium"
                        />
                    </div>
                </div>

                <div className="space-y-1.5">
                    <label className="text-xs font-bold uppercase tracking-widest text-slate-500 ml-1">Password</label>
                    <div className="relative">
                        <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                        <input 
                            type="password" 
                            placeholder="••••••••"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full bg-slate-50 border border-slate-200 rounded-xl py-3.5 pl-11 pr-4 text-slate-900 focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition-all font-medium"
                        />
                    </div>
                </div>

                {error && (
                    <div className="p-3 bg-red-50 border border-red-100 text-red-600 text-sm rounded-lg font-medium text-center flex items-center justify-center gap-2">
                         <div className="w-1.5 h-1.5 rounded-full bg-red-500"></div> {error}
                    </div>
                )}

                <button 
                    type="submit"
                    disabled={loading}
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 rounded-xl shadow-xl shadow-blue-600/20 transition-all flex items-center justify-center gap-2 disabled:opacity-70 group active:scale-[0.98]"
                >
                    {loading ? <Loader2 className="animate-spin" size={20}/> : (isLogin ? 'Sign In' : 'Create Account')}
                    {!loading && <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />}
                </button>
            </form>

            <div className="text-center pt-4">
                <button 
                    onClick={() => { setIsLogin(!isLogin); setError(null); }}
                    className="text-sm font-semibold text-slate-500 hover:text-blue-600 transition-colors"
                >
                    {isLogin ? "Don't have an account? Join the 1%." : "Already have an account? Sign in."}
                </button>
            </div>
            
            <div className="pt-8 mt-8 border-t border-slate-100 text-center">
                <p className="text-xs text-slate-400 mb-2">ADMIN ACCESS DEMO</p>
                <code className="text-[10px] bg-slate-100 px-2 py-1 rounded text-slate-500 font-mono">admin@scalr.ai / admin123</code>
            </div>
         </div>
      </div>
    </div>
  );
};

export default AuthPage;
