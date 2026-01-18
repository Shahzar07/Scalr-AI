
import React, { useState, useEffect } from 'react';
import { ArrowRight, Check, Zap, Cpu, Play, BarChart2, Globe, Shield, Code2, Layers, Users, TrendingUp, Sparkles, Lock, ArrowUpRight, Rocket } from 'lucide-react';

interface LandingPageProps {
  onEnterApp: () => void;
}

const LandingPage: React.FC<LandingPageProps> = ({ onEnterApp }) => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-[#F8FAFC] text-slate-900 font-sans selection:bg-blue-600 selection:text-white overflow-x-hidden">
      
      {/* Cinematic Background Ambience */}
      <div className="fixed inset-0 z-0 pointer-events-none">
          <div className="absolute top-[-20%] right-[-10%] w-[1000px] h-[1000px] bg-blue-100/40 rounded-full blur-[120px] mix-blend-multiply"></div>
          <div className="absolute top-[30%] left-[-20%] w-[1000px] h-[1000px] bg-indigo-100/40 rounded-full blur-[120px] mix-blend-multiply"></div>
          <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.03]"></div>
      </div>

      {/* Navigation */}
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? 'bg-white/80 backdrop-blur-xl border-b border-slate-200 py-3 shadow-sm' : 'bg-transparent py-6'}`}>
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
          <div className="flex items-center gap-3 group cursor-pointer" onClick={onEnterApp}>
            <div className="w-10 h-10 bg-[#0B1121] rounded-xl flex items-center justify-center shadow-lg shadow-blue-900/10 group-hover:scale-105 transition-transform duration-300">
              <BarChart2 size={22} className="text-white" />
            </div>
            <span className="font-display font-bold text-2xl tracking-tight text-slate-900">Scalr<span className="text-blue-600">.ai</span></span>
          </div>
          
          <div className="hidden md:flex items-center gap-1 bg-white/60 p-1.5 rounded-full border border-slate-200/60 backdrop-blur-md shadow-sm">
             {['Features', 'Workflow', 'Pricing'].map((item) => (
               <a key={item} href={`#${item.toLowerCase()}`} className="px-6 py-2 text-sm font-bold text-slate-600 hover:text-blue-700 hover:bg-white rounded-full transition-all">
                 {item}
               </a>
             ))}
          </div>

          <div className="flex items-center gap-4">
            <button onClick={onEnterApp} className="hidden md:block text-sm font-bold text-slate-600 hover:text-slate-900 transition-colors">
              Log in
            </button>
            <button 
              onClick={onEnterApp}
              className="group relative px-6 py-3 bg-blue-600 text-white text-sm font-bold rounded-xl hover:bg-blue-700 transition-all duration-300 shadow-xl shadow-blue-600/20 hover:shadow-blue-600/30 hover:-translate-y-0.5"
            >
              <span className="relative z-10 flex items-center gap-2">Get Started <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform"/></span>
            </button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-40 pb-20 md:pt-48 md:pb-32 relative z-10">
        <div className="max-w-7xl mx-auto px-6 text-center relative">
          
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white border border-blue-100 text-blue-700 text-xs font-bold uppercase tracking-wider mb-8 animate-fade-in hover:border-blue-300 transition-colors cursor-default shadow-sm group">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-500 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-600 group-hover:bg-blue-500"></span>
            </span>
            Scalr V2.0 Enterprise is Live
          </div>
          
          {/* Headline */}
          <h1 className="font-display text-5xl md:text-7xl lg:text-8xl font-black tracking-tight leading-[0.95] mb-8 animate-fade-in-up text-slate-900">
            Architect Your <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-indigo-600 to-blue-600 bg-300% animate-shimmer">Revenue Engine.</span>
          </h1>
          
          <p className="text-xl md:text-2xl text-slate-500 max-w-3xl mx-auto mb-12 leading-relaxed font-medium animate-fade-in-up delay-100">
            The enterprise-grade AI platform for high-ticket funnels, automated copywriting, and market domination. Built for results, not chat.
          </p>
          
          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-5 mb-24 animate-fade-in-up delay-200">
            <button 
              onClick={onEnterApp}
              className="w-full sm:w-auto px-8 py-4 bg-[#0B1121] hover:bg-slate-800 text-white text-lg font-bold rounded-xl hover:-translate-y-1 transition-all shadow-2xl shadow-slate-900/30 flex items-center justify-center gap-2"
            >
              <Zap size={20} className="fill-white" /> Start Building
            </button>
            <button className="w-full sm:w-auto px-8 py-4 bg-white text-slate-700 border border-slate-200 text-lg font-bold rounded-xl hover:bg-slate-50 hover:border-slate-300 transition-all flex items-center justify-center gap-2 shadow-sm group">
              <Play size={20} className="text-slate-400 group-hover:text-blue-600 transition-colors" /> View Demo
            </button>
          </div>

          {/* Cinematic Dashboard Image */}
          <div className="relative max-w-6xl mx-auto perspective-[2000px] group animate-fade-in-up delay-300">
             
             {/* Browser Window Frame */}
             <div className="relative rounded-2xl bg-slate-900 p-2 shadow-[0_50px_100px_-20px_rgba(15,23,42,0.3)] transform transition-all duration-1000 group-hover:rotate-x-1 group-hover:translate-y-[-10px]">
                
                {/* Image Container */}
                <div className="relative rounded-xl overflow-hidden aspect-[16/9] bg-slate-800 border border-slate-700/50">
                    <img 
                        src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2670&auto=format&fit=crop"
                        alt="Scalr Dashboard"
                        className="w-full h-full object-cover opacity-90 group-hover:scale-105 transition-transform duration-[1.5s]"
                    />
                    
                    {/* Gradient Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-transparent to-transparent"></div>

                    {/* Floating UI Elements */}
                    <div className="absolute bottom-8 left-8 right-8 flex justify-between items-end">
                        <div className="hidden md:flex gap-4">
                            <div className="bg-white/10 backdrop-blur-md border border-white/20 p-4 rounded-xl text-white">
                                <div className="text-xs font-bold text-white/60 uppercase tracking-wider mb-1">Total Revenue</div>
                                <div className="text-2xl font-black">$124,500</div>
                            </div>
                             <div className="bg-white/10 backdrop-blur-md border border-white/20 p-4 rounded-xl text-white">
                                <div className="text-xs font-bold text-white/60 uppercase tracking-wider mb-1">Conversion Rate</div>
                                <div className="text-2xl font-black text-emerald-400">4.8%</div>
                            </div>
                        </div>
                    </div>
                </div>
             </div>

             {/* Glow Effect behind dashboard */}
             <div className="absolute -inset-4 bg-blue-500/20 blur-3xl -z-10 rounded-[3rem] opacity-50"></div>
          </div>
        </div>
      </section>

      {/* Social Proof Marquee */}
      <section className="py-12 border-y border-slate-200 bg-white relative overflow-hidden">
         <div className="max-w-7xl mx-auto px-6 mb-8 text-center">
             <p className="text-xs font-black text-slate-400 uppercase tracking-[0.2em]">Powering High-Growth Revenue Teams At</p>
         </div>
         <div className="relative flex overflow-x-hidden group opacity-60 grayscale hover:grayscale-0 transition-all duration-500">
            <div className="animate-marquee whitespace-nowrap flex gap-16 md:gap-32 items-center">
               {['Monetise', 'Founders', 'Scale', 'Ventures', 'Growth', 'Impact', 'Revenue', 'Capital'].map((brand, i) => (
                  <span key={i} className="text-2xl font-black font-display text-slate-300 flex items-center gap-3 hover:text-slate-900 transition-colors">
                     <div className="w-8 h-8 rounded bg-slate-100"></div> {brand}
                  </span>
               ))}
            </div>
            <div className="absolute top-0 animate-marquee2 whitespace-nowrap flex gap-16 md:gap-32 items-center">
               {['Monetise', 'Founders', 'Scale', 'Ventures', 'Growth', 'Impact', 'Revenue', 'Capital'].map((brand, i) => (
                  <span key={i} className="text-2xl font-black font-display text-slate-300 flex items-center gap-3 hover:text-slate-900 transition-colors">
                     <div className="w-8 h-8 rounded bg-slate-100"></div> {brand}
                  </span>
               ))}
            </div>
         </div>
      </section>

      {/* Features Grid */}
      <section id="features" className="py-32 relative bg-white">
         <div className="max-w-7xl mx-auto px-6">
            <div className="text-center mb-24">
               <h2 className="font-display text-4xl md:text-6xl font-black mb-6 tracking-tight text-slate-900">The <span className="text-blue-600 underline decoration-blue-200 decoration-4 underline-offset-4">Unfair Advantage</span></h2>
               <p className="text-slate-500 max-w-2xl mx-auto text-xl leading-relaxed">Most AI writes generic fluff. Scalr is engineered for one thing: <strong>Compounding Revenue</strong>.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
               
               {/* Card 1: Main AI Core - Large */}
               <div className="md:col-span-2 bg-slate-900 rounded-[2rem] p-10 relative overflow-hidden group border border-slate-800 min-h-[400px]">
                  {/* Background Image */}
                  <div className="absolute inset-0 z-0">
                      <img 
                        src="https://images.unsplash.com/photo-1639322537228-f710d846310a?q=80&w=2532&auto=format&fit=crop" 
                        alt="Blockchain Network" 
                        className="w-full h-full object-cover opacity-20 mix-blend-screen group-hover:scale-110 transition-transform duration-700"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/50 to-transparent"></div>
                  </div>

                  <div className="relative z-10 h-full flex flex-col justify-between">
                     <div className="w-16 h-16 rounded-2xl bg-blue-600 flex items-center justify-center text-white shadow-xl shadow-blue-600/20 group-hover:scale-110 transition-transform duration-500">
                        <Cpu size={32} />
                     </div>
                     <div>
                        <h3 className="font-display text-3xl font-bold mb-4 text-white">Direct Response Core</h3>
                        <p className="text-slate-400 text-lg leading-relaxed max-w-lg">Trained on $100M+ in sales letters, VSLs, and ads. We stripped out the generic data and replaced it with pure persuasion logic.</p>
                     </div>
                  </div>
               </div>

               {/* Card 2: Speed - Tall */}
               <div className="bg-blue-50 rounded-[2rem] p-10 relative overflow-hidden group border border-blue-100 hover:border-blue-300 hover:shadow-2xl hover:shadow-blue-900/10 transition-all duration-500 flex flex-col min-h-[400px]">
                  <div className="absolute -right-20 -top-20 w-64 h-64 bg-blue-200 rounded-full blur-3xl opacity-50 group-hover:opacity-100 transition-opacity"></div>
                  
                  <div className="w-16 h-16 rounded-2xl bg-white border border-blue-100 flex items-center justify-center text-blue-600 shadow-sm group-hover:scale-110 transition-transform duration-500 relative z-10 mb-auto">
                     <Zap size={32} />
                  </div>
                  <div className="relative z-10 mt-12">
                     <h3 className="font-display text-2xl font-bold mb-3 text-slate-900">Zero Latency</h3>
                     <p className="text-slate-500 leading-relaxed text-base">Generate full funnel assets at the speed of thought. No waiting queues. Instant rendering.</p>
                  </div>
               </div>

               {/* Card 3: Code/Tech - Standard */}
               <div className="bg-white rounded-[2rem] p-10 relative overflow-hidden group border border-slate-200 hover:border-emerald-300 hover:shadow-2xl hover:shadow-emerald-900/5 transition-all duration-500 flex flex-col justify-between min-h-[300px]">
                  <div className="w-16 h-16 rounded-2xl bg-emerald-50 border border-emerald-100 flex items-center justify-center text-emerald-600 shadow-sm group-hover:scale-110 transition-transform duration-500 relative z-10">
                     <Code2 size={32} />
                  </div>
                  <div className="relative z-10">
                     <h3 className="font-display text-2xl font-bold mb-3 text-slate-900">Clean Output</h3>
                     <p className="text-slate-500 leading-relaxed">Perfectly formatted Markdown, JSON, or HTML ready to copy-paste instantly.</p>
                  </div>
               </div>

               {/* Card 4: Full Stack - Large */}
               <div className="md:col-span-2 bg-[#0B1121] rounded-[2rem] p-10 relative overflow-hidden group shadow-2xl min-h-[300px]">
                  {/* Background Image */}
                  <div className="absolute inset-0 z-0">
                      <img 
                        src="https://images.unsplash.com/photo-1558494949-ef526b0042a0?q=80&w=2668&auto=format&fit=crop" 
                        alt="Server Rack" 
                        className="w-full h-full object-cover opacity-20 mix-blend-luminosity group-hover:opacity-30 transition-opacity duration-700" 
                      />
                       <div className="absolute inset-0 bg-gradient-to-r from-[#0B1121] via-[#0B1121]/80 to-transparent"></div>
                  </div>
                  
                  <div className="relative z-20 h-full flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
                     <div className="flex-1">
                        <div className="w-16 h-16 rounded-2xl bg-white/10 border border-white/10 flex items-center justify-center text-white shadow-xl backdrop-blur-md mb-6">
                            <Layers size={32} />
                        </div>
                        <h3 className="font-display text-3xl font-bold mb-4 text-white">Full Funnel Stack</h3>
                        <p className="text-blue-100/70 text-lg leading-relaxed">Don't just write an email. Architect the entire customer journey: Ad → Landing Page → Email Sequence → Upsell.</p>
                     </div>
                     <div className="bg-white/5 backdrop-blur-sm border border-white/10 p-6 rounded-xl min-w-[280px]">
                        <div className="space-y-3">
                            <div className="flex items-center gap-3 text-white/80"><Check size={16} className="text-emerald-400"/> VSL Scripts</div>
                            <div className="flex items-center gap-3 text-white/80"><Check size={16} className="text-emerald-400"/> Landing Page Copy</div>
                            <div className="flex items-center gap-3 text-white/80"><Check size={16} className="text-emerald-400"/> Email Sequences</div>
                            <div className="flex items-center gap-3 text-white/80"><Check size={16} className="text-emerald-400"/> Ad Creative</div>
                        </div>
                     </div>
                  </div>
               </div>

            </div>
         </div>
      </section>

      {/* Workflow Section */}
      <section id="workflow" className="py-32 bg-slate-50 border-t border-slate-200">
         <div className="max-w-7xl mx-auto px-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
               
               {/* Left Content */}
               <div>
                  <div className="inline-block px-4 py-1.5 rounded-full bg-blue-100 text-blue-700 text-xs font-bold uppercase tracking-wide mb-6">
                      Workflow Optimization
                  </div>
                  <h2 className="font-display text-4xl md:text-5xl font-black mb-10 tracking-tight text-slate-900 leading-[1.1]">
                     From Blank Page to <br/><span className="text-blue-600">Banked Revenue</span>.
                  </h2>
                  
                  <div className="relative space-y-12 pl-8 border-l-2 border-slate-200">
                     {[
                        { title: 'Define the Offer', desc: 'Input your product, target audience, and core pain point. We handle the rest.', icon: Users },
                        { title: 'Generate the Stack', desc: 'AI architects your Ads, Landing Page, and Email sequences instantly.', icon: Sparkles },
                        { title: 'Refine & Launch', desc: 'Use the editor to tweak tone, then copy/paste to your marketing tools.', icon: Rocket }
                     ].map((step, i) => (
                        <div key={i} className="relative group cursor-default">
                           <div className="absolute -left-[41px] top-1 w-6 h-6 rounded-full bg-white border-4 border-slate-200 group-hover:border-blue-600 transition-colors shadow-sm z-10"></div>
                           
                           <h3 className="font-display text-2xl font-bold mb-3 text-slate-900 group-hover:text-blue-600 transition-colors flex items-center gap-3">
                              {step.title}
                           </h3>
                           <p className="text-slate-500 text-lg leading-relaxed max-w-md group-hover:text-slate-700 transition-colors">{step.desc}</p>
                        </div>
                     ))}
                  </div>
               </div>

               {/* Right Visual - Real Image */}
               <div className="relative group">
                  <div className="absolute -inset-4 bg-gradient-to-r from-blue-400 to-indigo-400 rounded-[2.5rem] rotate-6 opacity-30 blur-2xl group-hover:opacity-40 transition-opacity"></div>
                  
                  <div className="relative rounded-[2rem] bg-white border border-slate-200 p-2 shadow-2xl transform group-hover:-rotate-1 transition-transform duration-700">
                     <div className="relative rounded-[1.8rem] overflow-hidden aspect-[4/3] group">
                        <img 
                           src="https://images.unsplash.com/photo-1555099962-4199c345e5dd?q=80&w=2670&auto=format&fit=crop" 
                           className="w-full h-full object-cover transform transition-transform duration-1000 group-hover:scale-105"
                           alt="Developer Workflow"
                        />
                        <div className="absolute inset-0 bg-blue-900/20 group-hover:bg-blue-900/0 transition-colors"></div>
                        
                        {/* Play Button Overlay */}
                        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                           <button onClick={onEnterApp} className="w-20 h-20 bg-white/90 backdrop-blur rounded-full flex items-center justify-center shadow-2xl hover:scale-110 transition-transform">
                              <Play size={30} className="fill-blue-600 text-blue-600 ml-1" />
                           </button>
                        </div>
                     </div>
                  </div>
               </div>

            </div>
         </div>
      </section>

      {/* CTA Section - Dark Blue Anchor */}
      <section id="pricing" className="py-32 bg-[#0B1121] text-white relative overflow-hidden">
         <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-blue-600/20 rounded-full blur-[120px] pointer-events-none mix-blend-screen"></div>
         <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-indigo-600/20 rounded-full blur-[120px] pointer-events-none mix-blend-screen"></div>
         
         <div className="max-w-4xl mx-auto px-6 text-center relative z-10">
            <h2 className="font-display text-5xl md:text-7xl font-black tracking-tight mb-8 text-white">
               Ready to <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-400">Dominate?</span>
            </h2>
            <p className="text-xl text-slate-400 mb-14 max-w-2xl mx-auto font-medium leading-relaxed">
               Join 10,000+ top-tier marketers using Scalr AI to build 7-figure revenue systems. Stop writing. Start scaling.
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center max-w-md mx-auto">
               <button onClick={onEnterApp} className="w-full px-10 py-5 bg-white text-slate-900 text-lg font-bold rounded-xl hover:bg-blue-50 transition-all shadow-[0_0_50px_rgba(255,255,255,0.2)] flex items-center justify-center gap-3">
                  Launch Scalr App <ArrowRight size={20} />
               </button>
            </div>
            <div className="mt-12 flex items-center justify-center gap-8 text-sm font-semibold text-white/40">
               <span className="flex items-center gap-2"><Check size={16} className="text-emerald-400" /> Free Tier Available</span>
               <span className="flex items-center gap-2"><Check size={16} className="text-emerald-400" /> No Credit Card Required</span>
            </div>
         </div>
      </section>

      {/* Footer */}
      <footer className="py-20 bg-white text-slate-500 text-sm border-t border-slate-200">
         <div className="max-w-7xl mx-auto px-6">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-12 mb-20">
               <div className="col-span-2 md:col-span-1">
                  <div className="flex items-center gap-2 mb-6 text-slate-900 group cursor-pointer">
                     <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center transition-colors">
                        <BarChart2 size={18} className="text-white" /> 
                     </div>
                     <span className="font-display font-bold text-xl">Scalr AI</span>
                  </div>
                  <p className="text-slate-500 leading-relaxed max-w-xs mb-6">
                     The elite AI revenue architecture platform. Built for ROI, not chat.
                  </p>
                  <div className="flex gap-4">
                     {/* Socials Placeholders */}
                     <div className="w-8 h-8 rounded-full bg-slate-100 hover:bg-blue-600 hover:text-white transition-colors flex items-center justify-center cursor-pointer"><ArrowUpRight size={16}/></div>
                     <div className="w-8 h-8 rounded-full bg-slate-100 hover:bg-blue-600 hover:text-white transition-colors flex items-center justify-center cursor-pointer"><Globe size={16}/></div>
                  </div>
               </div>
               <div>
                  <h4 className="font-bold text-slate-900 mb-6 uppercase tracking-wider text-xs">Product</h4>
                  <ul className="space-y-4 font-medium">
                     <li><a href="#" className="hover:text-blue-600 transition-colors">Features</a></li>
                     <li><a href="#" className="hover:text-blue-600 transition-colors">Pricing</a></li>
                     <li><a href="#" className="hover:text-blue-600 transition-colors">Enterprise</a></li>
                     <li><a href="#" className="hover:text-blue-600 transition-colors">Changelog</a></li>
                  </ul>
               </div>
               <div>
                  <h4 className="font-bold text-slate-900 mb-6 uppercase tracking-wider text-xs">Resources</h4>
                  <ul className="space-y-4 font-medium">
                     <li><a href="#" className="hover:text-blue-600 transition-colors">Community</a></li>
                     <li><a href="#" className="hover:text-blue-600 transition-colors">Documentation</a></li>
                     <li><a href="#" className="hover:text-blue-600 transition-colors">API Reference</a></li>
                     <li><a href="#" className="hover:text-blue-600 transition-colors">Status</a></li>
                  </ul>
               </div>
               <div>
                  <h4 className="font-bold text-slate-900 mb-6 uppercase tracking-wider text-xs">Legal</h4>
                  <ul className="space-y-4 font-medium">
                     <li><a href="#" className="hover:text-blue-600 transition-colors">Privacy Policy</a></li>
                     <li><a href="#" className="hover:text-blue-600 transition-colors">Terms of Service</a></li>
                     <li><a href="#" className="hover:text-blue-600 transition-colors">Cookie Policy</a></li>
                  </ul>
               </div>
            </div>
            <div className="flex flex-col md:flex-row justify-between items-center gap-6 border-t border-slate-200 pt-8">
               <p>© 2024 Scalr AI Inc. All rights reserved.</p>
               <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-50 border border-emerald-100 cursor-pointer">
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                  </span>
                  <span className="text-xs font-bold text-emerald-700">Systems Operational</span>
               </div>
            </div>
         </div>
      </footer>
    </div>
  );
};

export default LandingPage;
