
import React, { useState, useMemo, useEffect } from 'react';
import FunnelGenerator from './components/FunnelGenerator';
import ProfileOptimizer from './components/ProfileOptimizer';
import PromptArchitect from './components/PromptArchitect';
import ToolRunner from './components/ToolRunner';
import LandingPage from './components/LandingPage';
import { TOOLS, TOOL_CATEGORIES } from './data/tools';
import { AppMode, Tool, ToolCategory } from './types';
import * as LucideIcons from 'lucide-react';
import { 
  LayoutGrid, 
  Search, 
  Menu, 
  X, 
  BarChart2, 
  UserCircle, 
  Terminal, 
  Zap,
  ChevronRight,
  HelpCircle,
  Home
} from 'lucide-react';

function App() {
  const [showLanding, setShowLanding] = useState(true);
  const [mode, setMode] = useState<AppMode>(AppMode.DASHBOARD);
  const [selectedToolId, setSelectedToolId] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<ToolCategory>('All');
  const [isSidebarOpen, setIsSidebarOpen] = useState(typeof window !== 'undefined' ? window.innerWidth >= 1024 : true);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setIsSidebarOpen(true);
      } else {
        setIsSidebarOpen(false);
      }
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const renderIcon = (iconName: string, size = 20, className = "") => {
    const Icon = (LucideIcons as any)[iconName] || HelpCircle;
    return <Icon size={size} className={className} />;
  };

  const getCategoryColor = (category: string) => {
    switch(category) {
      case 'Ads': return 'text-blue-600 bg-blue-50 border-blue-100';
      case 'Social': return 'text-sky-600 bg-sky-50 border-sky-100';
      case 'Blog': return 'text-indigo-600 bg-indigo-50 border-indigo-100';
      case 'Email': return 'text-slate-600 bg-slate-100 border-slate-200';
      case 'Business': return 'text-emerald-600 bg-emerald-50 border-emerald-100';
      case 'Video': return 'text-blue-700 bg-blue-50 border-blue-200';
      case 'Website': return 'text-slate-700 bg-slate-100 border-slate-300';
      case 'Profile': return 'text-blue-600 bg-blue-50 border-blue-100';
      case 'Shadow Ops': return 'text-amber-600 bg-amber-50 border-amber-100';
      default: return 'text-blue-600 bg-blue-50 border-blue-100';
    }
  };

  const selectedTool = useMemo(() => 
    TOOLS.find(t => t.id === selectedToolId), 
  [selectedToolId]);

  const filteredTools = useMemo(() => {
    return TOOLS.filter(tool => {
      const matchesSearch = tool.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                            tool.description.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory = selectedCategory === 'All' || tool.category === selectedCategory;
      return matchesSearch && matchesCategory;
    });
  }, [searchQuery, selectedCategory]);

  const handleToolClick = (toolId: string) => {
    setSelectedToolId(toolId);
    setMode(AppMode.TOOL);
    if (window.innerWidth < 1024) setIsSidebarOpen(false);
  };

  const handleNavClick = (newMode: AppMode) => {
    setMode(newMode);
    setSelectedToolId(null);
    if (newMode === AppMode.DASHBOARD) setSelectedCategory('All');
    if (window.innerWidth < 1024) setIsSidebarOpen(false);
  };

  const handleCategorySelect = (cat: ToolCategory) => {
      setSelectedCategory(cat);
      setSearchQuery(''); 
      if (mode !== AppMode.DASHBOARD) {
          setMode(AppMode.DASHBOARD);
          setSelectedToolId(null);
      }
  };

  if (showLanding) {
    return <LandingPage onEnterApp={() => setShowLanding(false)} />;
  }

  return (
    <div className="flex h-screen bg-[#F8FAFC] overflow-hidden font-sans text-slate-900 animate-fade-in">
      {isSidebarOpen && window.innerWidth < 1024 && (
        <div 
          className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm z-40 lg:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      <aside 
        className={`
          fixed lg:static inset-y-0 left-0 z-50 w-72 bg-[#0B1121] text-white flex flex-col transition-transform duration-300 ease-in-out border-r border-white/5
          ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0 lg:w-72'}
        `}
      >
        <div className="h-16 flex items-center px-6 border-b border-white/5 bg-[#0B1121]">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center shadow-lg shadow-blue-600/20">
              <BarChart2 size={18} className="text-white" />
            </div>
            <span className="font-display font-bold text-lg tracking-tight">Scalr<span className="text-blue-500">.ai</span></span>
          </div>
          <button 
            className="ml-auto lg:hidden text-slate-400 hover:text-white"
            onClick={() => setIsSidebarOpen(false)}
          >
            <X size={20} />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto py-6 px-4 space-y-8">
          <div className="space-y-1">
            <p className="px-3 text-[10px] font-bold uppercase tracking-widest text-slate-500 mb-2">Platform</p>
            
            <button
              onClick={() => setShowLanding(true)}
              className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-slate-400 hover:text-white hover:bg-white/5 transition-all"
            >
              <Home size={18} /> Back to Home
            </button>

            <button
              onClick={() => handleNavClick(AppMode.DASHBOARD)}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all ${mode === AppMode.DASHBOARD && !selectedToolId ? 'bg-blue-600 text-white shadow-lg shadow-blue-900/20' : 'text-slate-400 hover:text-white hover:bg-white/5'}`}
            >
              <LayoutGrid size={18} /> Dashboard
            </button>
            <button
              onClick={() => handleNavClick(AppMode.FUNNEL)}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all ${mode === AppMode.FUNNEL ? 'bg-blue-600 text-white shadow-lg shadow-blue-900/20' : 'text-slate-400 hover:text-white hover:bg-white/5'}`}
            >
              <Zap size={18} /> Funnel Architect
            </button>
            <button
              onClick={() => handleNavClick(AppMode.PROFILE_OPTIMIZER)}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all ${mode === AppMode.PROFILE_OPTIMIZER ? 'bg-blue-600 text-white shadow-lg shadow-blue-900/20' : 'text-slate-400 hover:text-white hover:bg-white/5'}`}
            >
              <UserCircle size={18} /> Profile Audit
            </button>
            <button
              onClick={() => handleNavClick(AppMode.PROMPT_ARCHITECT)}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all ${mode === AppMode.PROMPT_ARCHITECT ? 'bg-blue-600 text-white shadow-lg shadow-blue-900/20' : 'text-slate-400 hover:text-white hover:bg-white/5'}`}
            >
              <Terminal size={18} /> Prompt Engineer
            </button>
          </div>

          <div className="space-y-1">
            <p className="px-3 text-[10px] font-bold uppercase tracking-widest text-slate-500 mb-2">Tool Suite</p>
            {TOOL_CATEGORIES.filter(c => c !== 'All').map(cat => (
               <button
                  key={cat}
                  onClick={() => handleCategorySelect(cat)}
                  className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-sm transition-all group ${selectedCategory === cat ? 'bg-white/10 text-white' : 'text-slate-400 hover:text-white hover:bg-white/5'}`}
               >
                  <span>{cat}</span>
                  {selectedCategory === cat && <ChevronRight size={14} className="text-blue-500" />}
               </button>
            ))}
          </div>
        </div>

        <div className="p-6 border-t border-white/5 bg-[#0F1623]">
          <div className="flex items-center gap-3">
             <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-blue-500 to-sky-500 flex items-center justify-center text-xs font-bold text-white border border-white/10">
                AI
             </div>
             <div className="overflow-hidden">
                <p className="text-sm font-medium text-white truncate">Scalr Enterprise</p>
                <p className="text-xs text-slate-500 truncate">Systems Operational</p>
             </div>
          </div>
        </div>
      </aside>

      <main className="flex-1 flex flex-col min-w-0 bg-[#F8FAFC]">
        <header className="h-16 bg-white border-b border-slate-200 flex items-center justify-between px-4 lg:hidden sticky top-0 z-30">
          <button onClick={() => setIsSidebarOpen(true)} className="p-2 text-slate-600 hover:bg-slate-100 rounded-lg">
            <Menu size={24} />
          </button>
          <span className="font-display font-bold text-lg text-slate-900">Scalr.ai</span>
          <div className="w-10" /> 
        </header>

        <div className="flex-1 overflow-y-auto scrollbar-hide">
          <div className="p-4 md:p-8 max-w-7xl mx-auto">
            {mode === AppMode.DASHBOARD && (
                <div className="mb-8 flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div>
                        <h1 className="text-2xl font-black text-slate-900 tracking-tight mb-1">
                            {selectedCategory === 'All' ? 'Command Center' : `${selectedCategory} Tools`}
                        </h1>
                        <p className="text-slate-500 text-sm">Welcome to the elite revenue architecture engine.</p>
                    </div>
                    <div className="relative w-full md:w-96">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                        <input 
                            type="text" 
                            placeholder="Search tools..." 
                            className="w-full bg-white border border-slate-200 pl-10 pr-4 py-2.5 rounded-xl text-sm focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none shadow-sm transition-all"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                    </div>
                </div>
            )}

            {mode === AppMode.DASHBOARD && (
               <>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                     {filteredTools.map(tool => (
                        <button
                           key={tool.id}
                           onClick={() => handleToolClick(tool.id)}
                           className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all group text-left h-full flex flex-col"
                        >
                           <div className={`w-10 h-10 rounded-lg flex items-center justify-center mb-4 transition-colors ${getCategoryColor(tool.category)} group-hover:scale-110 duration-300`}>
                              {renderIcon(tool.iconName, 20)}
                           </div>
                           <h3 className="font-bold text-slate-900 mb-2 group-hover:text-blue-600 transition-colors">{tool.title}</h3>
                           <p className="text-xs text-slate-500 leading-relaxed line-clamp-2 mb-4 flex-1">{tool.description}</p>
                           <div className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-wider text-slate-400">
                              <span>Run Tool</span> <ArrowRightIcon size={10} className="group-hover:translate-x-1 transition-transform text-blue-500" />
                           </div>
                        </button>
                     ))}
                  </div>
                  
                  {filteredTools.length === 0 && (
                      <div className="text-center py-20">
                          <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4 text-slate-400">
                              <Search size={24} />
                          </div>
                          <h3 className="text-slate-900 font-bold mb-1">No tools found</h3>
                          <p className="text-slate-500 text-sm">Try searching for something else or change category.</p>
                      </div>
                  )}
               </>
            )}

            {mode === AppMode.TOOL && selectedTool && (
               <div className="animate-fade-in-up">
                   <button 
                     onClick={() => setMode(AppMode.DASHBOARD)}
                     className="flex items-center gap-2 text-sm text-slate-500 hover:text-blue-600 mb-6 font-medium transition-colors"
                   >
                     <ArrowRightIcon size={16} className="rotate-180" /> Back to Dashboard
                   </button>
                   <ToolRunner tool={selectedTool} />
               </div>
            )}

            {mode === AppMode.FUNNEL && (
                <div className="animate-fade-in-up">
                   <FunnelGenerator />
                </div>
            )}

            {mode === AppMode.PROFILE_OPTIMIZER && (
                <div className="animate-fade-in-up">
                   <ProfileOptimizer />
                </div>
            )}

            {mode === AppMode.PROMPT_ARCHITECT && (
                <div className="animate-fade-in-up">
                   <PromptArchitect />
                </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}

const ArrowRightIcon = ({ size, className }: { size?: number, className?: string }) => (
    <svg width={size || 24} height={size || 24} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
        <path d="M5 12h14" /><path d="m12 5 7 7-7 7" />
    </svg>
);

export default App;
