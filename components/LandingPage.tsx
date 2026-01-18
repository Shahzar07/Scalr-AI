import React, { useState, useEffect } from 'react';
import { ArrowRight, Zap, BarChart2, Shield, Sparkles, Mail, Send, CheckCircle, Users, Loader2, Linkedin, MessageCircle } from 'lucide-react';
import { AuroraBackground } from './ui/aurora-background';
import BadgeTag from './ui/badge-tag';
import { StaggerTestimonials } from './ui/stagger-testimonials';

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
    if (!email || status === 'loading') return;

    setStatus('loading');

    try {
      // Background silent submission to your email via FormSubmit AJAX
      const response = await fetch("https://formsubmit.co/ajax/shahzarrayyan123@gmail.com", {
        method: "POST",
        headers: { 
            "Content-Type": "application/json",
            "Accept": "application/json"
        },
        body: JSON.stringify({
            email: email,
            _subject: "🚀 NEW LEAD: Scalr AI Newsletter",
            _captcha: "false",
            _template: "table",
            message: `A new user has subscribed to the newsletter. \nEmail: ${email}`
        })
      });

      if (response.ok) {
        setStatus('success');
        setEmail('');
        // Reset status after 5 seconds
        setTimeout(() => setStatus('idle'), 5000);
      } else {
        setStatus('error');
        setTimeout(() => setStatus('idle'), 3000);
      }
    } catch (err) {
      console.error("Submission failed:", err);
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
            <a href="#testimonials" className="text-sm font-bold text-slate-500 hover:text-slate-900 transition-colors">Wall of Love</a>
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
      <AuroraBackground className="relative pt-48 pb-32 md:pt-64 md:pb-48 z-10 flex flex-col items-center text-center px-6">
        {/* Background Video Layer */}
        <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden opacity-30">
          <iframe 
            src="https://customer-cbeadsgr09pnsezs.cloudflarestream.com/514fd76aa88b9eb22ba4c9d89f9da714/iframe?autoplay=true&muted=true&loop=true&controls=false&letterbox=false"
            className="absolute top-1/2 left-1/2 min-w-full min-h-full w-[150vw] h-[150vh] -translate-x-1/2 -translate-y-1/2"
            allow="autoplay; encrypted-media"
            style={{ border: 'none' }}
          ></iframe>
        </div>

        <div className="relative z-10 flex flex-col items-center">
          <div className="mb-8 animate-fade-in">
            <BadgeTag />
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
            <a href="#about" className="w-full sm:w-auto px-10 py-4 bg-white text-slate-600 border border-slate-200 text-lg font-bold rounded-xl hover:bg-slate-50 transition-all text-center text-sm sm:text-lg font-bold">
              Learn Strategy
            </a>
          </div>
        </div>
      </AuroraBackground>

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
                        <h4 className="font-display font-bold text-slate-900 mb-1">{item.title}</h4>
                        <p className="text-slate-500 text-sm leading-relaxed">{item.desc}</p>
                      </div>
                   </div>
                 ))}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-4 pt-12">
                <div className="bg-slate-50 h-48 rounded-[2rem] border border-slate-200 p-8 flex flex-col justify-end">
                   <div className="font-display text-4xl font-black text-slate-900 mb-2">4X</div>
                   <div className="text-xs font-bold text-slate-500 uppercase tracking-widest">Revenue Multiplier</div>
                </div>
                <div className="bg-blue-600 h-64 rounded-[2rem] p-8 flex flex-col justify-end text-white shadow-xl shadow-blue-600/20">
                   <div className="font-display text-4xl font-black mb-2">$10k+</div>
                   <div className="text-xs font-bold text-white/70 uppercase tracking-widest">High-Ticket Focus</div>
                </div>
              </div>
              <div className="space-y-4">
                <div className="bg-indigo-600 h-64 rounded-[2rem] p-8 flex flex-col justify-end text-white shadow-xl shadow-indigo-600/20">
                   <div className="font-display text-4xl font-black mb-2">500+</div>
                   <div className="text-xs font-bold text-white/70 uppercase tracking-widest">Active Scale-ups</div>
                </div>
                <div className="bg-slate-900 h-48 rounded-[2rem] border border-slate-800 p-8 flex flex-col justify-end">
                   <div className="font-display text-4xl font-black text-white mb-2">100%</div>
                   <div className="text-xs font-bold text-slate-400 uppercase tracking-widest">Automation Driven</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2.5 TESTIMONIALS SECTION */}
      <section id="testimonials">
        <StaggerTestimonials />
      </section>

      {/* 3. CONTACT & FOOTER SECTION */}
      <section id="contact" className="relative pt-32 pb-16 z-10 bg-white border-t border-slate-100">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-24">
            <div className="w-16 h-16 bg-blue-50 text-blue-600 rounded-3xl flex items-center justify-center mx-auto mb-8 shadow-inner">
              <Mail size={28} />
            </div>
            <h2 className="font-display text-4xl md:text-5xl font-black text-slate-900 mb-6 tracking-tight">Stay in the <span className="text-blue-600">Loop</span>.</h2>
            <p className="text-slate-500 text-lg mb-10 max-w-xl mx-auto font-medium">Get exclusive monetization protocols and product updates delivered to your inbox.</p>
            
            <form onSubmit={handleContactSubmit} className="max-w-md mx-auto relative mb-12">
               <div className="flex flex-col sm:flex-row gap-3">
                  <input 
                     type="email" 
                     required
                     placeholder="Enter your email address"
                     className="flex-1 bg-slate-50 border border-slate-200 rounded-xl px-5 py-4 text-slate-900 focus:ring-2 focus:ring-blue-500/20 outline-none transition-all shadow-sm font-medium"
                     value={email}
                     onChange={(e) => setEmail(e.target.value)}
                     disabled={status === 'loading'}
                  />
                  <button 
                    type="submit"
                    disabled={status === 'loading'}
                    className={`px-8 py-4 bg-slate-900 text-white font-bold rounded-xl hover:bg-black transition-all shadow-xl shadow-slate-900/20 flex items-center justify-center gap-2 active:scale-95 disabled:opacity-70 min-w-[120px]`}
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
                     <CheckCircle size={18} /> Thank you! You've been subscribed.
                  </div>
               )}

               {status === 'error' && (
                  <div className="absolute top-full mt-4 left-0 right-0 flex items-center justify-center gap-2 text-red-600 font-bold animate-fade-in">
                     Something went wrong. Please try again.
                  </div>
               )}
            </form>
          </div>

          {/* Minimalist Footer Design */}
          <div className="pt-24 border-t border-slate-100">
             <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
                <div className="md:col-span-2 space-y-6">
                   <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-slate-900 rounded-xl flex items-center justify-center">
                        <BarChart2 size={20} className="text-white" />
                      </div>
                      <span className="font-display font-bold text-2xl tracking-tight text-slate-900 underline decoration-blue-500/30 decoration-2 underline-offset-4">Scalr.ai</span>
                   </div>
                   <p className="text-slate-400 text-sm leading-relaxed max-w-sm font-medium">
                      The premier revenue architecture engine for elite creators and high-LTV systems. 
                      Stop guessing, start scaling with precision.
                   </p>
                </div>
                
                <div className="space-y-6">
                   <h4 className="font-display font-bold text-slate-900 uppercase tracking-widest text-xs">Inquiries & Ideas</h4>
                   <div className="space-y-4">
                      <a href="mailto:raynaters.tech@gmail.com" className="flex items-center gap-3 text-slate-500 hover:text-blue-600 transition-colors group">
                        <div className="w-8 h-8 rounded-lg bg-slate-50 flex items-center justify-center group-hover:bg-blue-50 transition-colors">
                          <Mail size={16} />
                        </div>
                        <span className="text-sm font-bold">raynaters.tech@gmail.com</span>
                      </a>
                   </div>
                </div>

                <div className="space-y-6">
                   <h4 className="font-display font-bold text-slate-900 uppercase tracking-widest text-xs">Connect</h4>
                   <div className="flex gap-4">
                      <a 
                        href="https://www.linkedin.com/in/shahzarrayyan/" 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="w-10 h-10 rounded-xl bg-slate-50 flex items-center justify-center text-slate-400 hover:bg-blue-50 hover:text-blue-600 transition-all shadow-sm"
                        title="LinkedIn"
                      >
                        <Linkedin size={20} />
                      </a>
                      <a 
                        href="https://wa.me/923172113115" 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="w-10 h-10 rounded-xl bg-slate-50 flex items-center justify-center text-slate-400 hover:bg-emerald-50 hover:text-emerald-600 transition-all shadow-sm"
                        title="WhatsApp"
                      >
                        <MessageCircle size={20} />
                      </a>
                   </div>
                </div>
             </div>
             
             <div className="pt-8 border-t border-slate-50 flex flex-col md:flex-row justify-between items-center gap-6">
                <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">© 2025 Scalr. Designed for Excellence.</p>
                <div className="flex gap-8">
                   <a href="#" className="text-xs font-bold text-slate-400 hover:text-slate-900 transition-colors uppercase tracking-widest">Privacy</a>
                   <a href="#" className="text-xs font-bold text-slate-400 hover:text-slate-900 transition-colors uppercase tracking-widest">Terms</a>
                   <a href="#" className="text-xs font-bold text-slate-400 hover:text-slate-900 transition-colors uppercase tracking-widest">Protocols</a>
                </div>
             </div>
          </div>
        </div>
      </section>

    </div>
  );
};

export default LandingPage;