
import React, { useState, useEffect } from 'react';
import { ArrowRight, Zap, BarChart2, Shield, Sparkles, Mail, Send, CheckCircle, Users, Loader2 } from 'lucide-react';

interface LandingPageProps {
  onEnterApp: () => void;
}

const LandingPage: React.FC<LandingPageProps> = ({ onEnterApp }) => {
  const [scrolled, setScrolled] = useState(false);
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleContactSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setStatus('loading');

    try {
      // Using FormSubmit.co AJAX endpoint for background submission
      // This sends the email directly to you without opening the user's mail client
      const response = await fetch("https://formsubmit.co/ajax/shahzarrayyan123@gmail.com", {
        method: "POST",
        headers: { 
            "Content-Type": "application/json",
            "Accept": "application/json"
        },
        body: JSON.stringify({
            email: email,
            message: "New Newsletter Subscriber from Scalr AI Landing Page",
            _subject: "🔥 New High-Intent Lead: Scalr AI"
        })
      });

      if (response.ok) {
        setStatus('success');
        setEmail('');
        setTimeout(() => setStatus('idle'), 5000);
      } else {
        setStatus('error');
        setTimeout(() => setStatus('idle'), 3000);
      }
    } catch (err) {
      console.error("Lead submission error:", err);
      setStatus('error');
      setTimeout(() => setStatus('idle'), 3000);
    }
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] text-slate-900 font-sans selection:bg-blue-600 selection:text-white overflow-x-hidden">
      
      {/* Dynamic Mesh Background */}
      <div className="fixed inset-0 z-0 pointer-events-none">
          <div className="absolute top-[-10%] right-[-5%] w-[800px] h-[800px] bg-blue-100/40 rounded-full blur-[100px] animate-pulse-slow"></div>
          <div className="absolute bottom-[-10%] left-[-5%] w-[600px] h-[600px] bg-indigo-100/30 rounded-full blur-[100px] animate-pulse-slow"></div>
          <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.02]"></div>
      </div>

      {/* Header */}
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? 'bg-white/80 backdrop-blur-xl border-b border-slate-200 py-4 shadow-sm' : 'bg-transparent py-8'}`}>
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 bg-slate-900 rounded-xl flex items-center justify-center shadow-xl">
              <BarChart2 size={20} className="text-white" />
            </div>
            <span className="font-display font-bold text-xl tracking-tight text-slate-900 underline decoration-blue-500/30 decoration-2 underline-offset-4">Scalr.ai</span>
          </div>
          
          <div className="hidden md:flex items-center gap-8">
            <a href="#about" className="text-sm font-bold text-slate-500 hover:text-slate-900 transition-colors">About</a>
            <a href="#contact" className="text-sm font-bold text-slate-500 hover:text-slate-900 transition-colors">Contact</a>
            <button 
              onClick={onEnterApp}
              className="px-6 py-2.5 bg-blue-600 text-white text-sm font-bold rounded-lg hover:bg-blue-700 transition-all shadow-lg shadow-blue-600/20 active:scale-95"
            >
              Get Started
            </button>
          </div>
        </div>
      </nav>

      {/* 1. HERO SECTION */}
      <section className="relative pt-48 pb-32 md:pt-64 md:pb-48 z-10 flex flex-col items-center text-center px-6">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 border border-blue-100 text-blue-700 text-[10px] font-black uppercase tracking-widest mb-8 animate-fade-in shadow-sm">
          <Sparkles size={12} /> The Future of Revenue Architecture
        </div>
        
        <h1 className="font-display text-4xl md:text-7xl lg:text-8xl font-black tracking-tight leading-[1.1] md:leading-[0.9] mb-8 animate-fade-in-up text-slate-900 max-w-5xl">
          Stop Leaving 75% of Your <br className="hidden md:block" />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">Revenue on the Table.</span>
        </h1>
        
        <p className="text-lg md:text-xl text-slate-500 max-w-3xl mx-auto mb-6 leading-relaxed animate-fade-in-up delay-100 font-medium px-4">
          Your content is elite. Your monetization strategy is leaking cash. Stop relying on unpredictable sponsorships and fluctuating ad rates. Deploy the proprietary monetization engine used by the top 1% of creators to 4X your revenue through automated high-LTV systems.
        </p>

        <div className="flex items-center gap-2 mb-12 animate-fade-in delay-150 px-4 py-2 rounded-full bg-slate-900/5 backdrop-blur-sm border border-slate-200 shadow-sm">
          <Users size={16} className="text-blue-600" />
          <span className="text-xs md:text-sm font-bold text-slate-600 tracking-tight">Trusted by 500+ creators generating $10k–$100k+ per month.</span>
        </div>
        
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-fade-in-up delay-200">
          <button 
            onClick={onEnterApp}
            className="w-full sm:w-auto px-10 py-4 bg-slate-900 text-white text-lg font-bold rounded-xl hover:bg-black transition-all shadow-2xl shadow-slate-900/20 flex items-center justify-center gap-2 group"
          >
            Launch Terminal <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
          </button>
          <a href="#about" className="w-full sm:w-auto px-10 py-4 bg-white text-slate-600 border border-slate-200 text-lg font-bold rounded-xl hover:bg-slate-50 transition-all text-center">
            Learn Strategy
          </a>
        </div>
      </section>

      {/* 2. ABOUT SECTION */}
      <section id="about" className="relative py-32 z-10 bg-white border-y border-slate-100">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
            <div>
              <h2 className="font-display text-3xl md:text-5xl font-black text-slate-900 mb-6 leading-tight tracking-tight">
                Monetize Like <br />
                <span className="text-blue-600">the Top 1%.</span>
              </h2>
              <p className="text-slate-500 text-lg leading-relaxed mb-10">
                Volume is a vanity metric. Revenue is a sanity metric. Scalr doesn't just help you write; it helps you build a high-status ecosystem that captures and converts your existing audience into high-LTV customers.
              </p>
              
              <div className="space-y-6">
                 {[
                   { icon: Zap, title: "Indoctrination Sequences", desc: "Automate emails, ads, and VSLs that turn casual viewers into loyal high-ticket buyers." },
                   { icon: Shield, title: "Whale Offer Architecture", desc: "Architect high-ticket backend offers that move the needle without needing more traffic." },
                   { icon: BarChart2, title: "Profit Leak Audits", desc: "Identify where your current monetization is bleeding cash and plug the gaps in minutes." }
                 ].map((item, i) => (
                   <div key={i} className="flex gap-5 group">
                      <div className="w-12 h-12 rounded-xl bg-slate-50 flex-shrink-0 flex items-center justify-center text-blue-600 border border-slate-100 group-hover:bg-blue-600 group-hover:text-white transition-all duration-300">
                         <item.icon size={24} />
                      </div>
                      <div>
                        <h4 className="font-bold text-slate-900 mb-1">{item.title}</h4>
                        <p className="text-slate-500 text-sm leading-relaxed">{item.desc}</p>
                      </div>
                   </div>
                 ))}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-4 pt-12">
                <div className="bg-slate-50 h-48 rounded-[2rem] border border-slate-200 p-8 flex flex-col justify-end">
                   <div className="text-4xl font-black text-slate-900 mb-2">4X</div>
                   <div className="text-xs font-bold text-slate-500 uppercase tracking-widest">Revenue Multiplier</div>
                </div>
                <div className="bg-blue-600 h-64 rounded-[2rem] p-8 flex flex-col justify-end text-white shadow-xl shadow-blue-600/20">
                   <div className="text-4xl font-black mb-2">$10k+</div>
                   <div className="text-xs font-bold text-white/70 uppercase tracking-widest">High-Ticket Focus</div>
                </div>
              </div>
              <div className="space-y-4">
                <div className="bg-indigo-600 h-64 rounded-[2rem] p-8 flex flex-col justify-end text-white shadow-xl shadow-indigo-600/20">
                   <div className="text-4xl font-black mb-2">500+</div>
                   <div className="text-xs font-bold text-white/70 uppercase tracking-widest">Active Scale-ups</div>
                </div>
                <div className="bg-slate-900 h-48 rounded-[2rem] border border-slate-800 p-8 flex flex-col justify-end">
                   <div className="text-4xl font-black text-white mb-2">100%</div>
                   <div className="text-xs font-bold text-slate-400 uppercase tracking-widest">Automation Driven</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. CONTACT SECTION */}
      <section id="contact" className="relative py-32 z-10 bg-white">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <div className="w-20 h-20 bg-blue-50 text-blue-600 rounded-3xl flex items-center justify-center mx-auto mb-8 shadow-inner">
             <Mail size={32} />
          </div>
          <h2 className="font-display text-4xl md:text-5xl font-black text-slate-900 mb-6 tracking-tight">Stay in the <span className="text-blue-600">Loop</span>.</h2>
          <p className="text-slate-500 text-lg mb-10 max-w-xl mx-auto">Get exclusive monetization protocols and product updates delivered to your inbox.</p>
          
          <form onSubmit={handleContactSubmit} className="max-w-md mx-auto relative">
             <div className="flex flex-col sm:flex-row gap-3">
                <input 
                   type="email" 
                   required
                   placeholder="Enter your email address"
                   className="flex-1 bg-slate-50 border border-slate-200 rounded-xl px-5 py-4 text-slate-900 focus:ring-2 focus:ring-blue-500/20 outline-none transition-all shadow-sm"
                   value={email}
                   onChange={(e) => setEmail(e.target.value)}
                   disabled={status === 'loading'}
                />
                <button 
                  type="submit"
                  disabled={status === 'loading'}
                  className={`px-8 py-4 bg-slate-900 text-white font-bold rounded-xl hover:bg-black transition-all shadow-xl shadow-slate-900/20 flex items-center justify-center gap-2 active:scale-95 disabled:opacity-70`}
                >
                  {status === 'loading' ? (
                    <Loader2 size={18} className="animate-spin" />
                  ) : (
                    <>Join <Send size={18} /></>
                  )}
                </button>
             </div>
             
             {status === 'success' && (
                <div className="absolute top-full mt-4 left-0 right-0 flex items-center justify-center gap-2 text-emerald-600 font-bold animate-fade-in">
                   <CheckCircle size={18} /> You're on the list. High-status updates incoming.
                </div>
             )}

             {status === 'error' && (
                <div className="absolute top-full mt-4 left-0 right-0 flex items-center justify-center gap-2 text-red-600 font-bold animate-fade-in">
                   Something went wrong. Please try again.
                </div>
             )}
          </form>

          <div className="mt-24 pt-12 border-t border-slate-100 flex flex-col md:flex-row justify-between items-center gap-6">
             <div className="flex items-center gap-3">
               <div className="w-8 h-8 bg-slate-900 rounded-lg flex items-center justify-center">
                 <BarChart2 size={16} className="text-white" />
               </div>
               <span className="font-bold text-slate-900">Scalr AI</span>
             </div>
             <div className="flex gap-8 text-sm font-bold text-slate-400">
                <a href="#" className="hover:text-slate-900 transition-colors">Twitter</a>
                <a href="#" className="hover:text-slate-900 transition-colors">LinkedIn</a>
                <a href="#" className="hover:text-slate-900 transition-colors">Terms</a>
             </div>
             <p className="text-xs text-slate-400">© 2025 Scalr. All Rights Reserved.</p>
          </div>
        </div>
      </section>

    </div>
  );
};

export default LandingPage;
