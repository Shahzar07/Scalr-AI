
import React, { useState, useMemo } from 'react';
import FunnelGenerator from './components/FunnelGenerator';
import ProfileOptimizer from './components/ProfileOptimizer';
import PromptArchitect from './components/PromptArchitect';
import ToolRunner from './components/ToolRunner';
import { TOOLS, TOOL_CATEGORIES } from './data/tools';
import { AppMode, Tool, ToolCategory } from './types';
import * as Icons from 'lucide-react';

function App() {
  const [mode, setMode] = useState<AppMode>(AppMode.DASHBOARD);
  const [selectedToolId, setSelectedToolId] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<ToolCategory>('All');
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const renderIcon = (iconName: string, size = 20, className = "") => {
    const Icon = (Icons as any)[iconName] || Icons.HelpCircle;
    return <Icon size={size} className={className} />;
  };

  const getCategoryColor = (category: string) => {
    switch(category) {
      case 'Ads': return 'text-orange-600 bg-orange-50 border-orange-100';
      case 'Social': return 'text-sky-600 bg-sky-50 border-sky-100';
      case 'Blog': return 'text-emerald-600 bg-emerald-50 border-emerald-100';
      case 'Email': return 'text-purple-600 bg-purple-50 border-purple-100';
      case 'Business': return 'text-slate-600 bg-slate-100 border-slate-200';
      case 'Video': return 'text-rose-600 bg-rose-50 border-rose-100';
      case 'Website': return 'text-indigo-600 bg-indigo-50 border-indigo-100';
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
  };

  const handleNavClick = (newMode: AppMode) => {
    setMode(newMode);
    setSelectedToolId(null);
    if (newMode === AppMode.DASHBOARD) setSelectedCategory('All');
  };

  const handleCategorySelect = (cat: ToolCategory) => {
      setSelectedCategory(cat);
      setSearchQuery(''); 
      if (mode !== AppMode.DASHBOARD) {
          setMode(AppMode.DASHBOARD);
          setSelectedToolId(null);
      }
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans flex overflow-hidden">
      
      <aside className={`fixed inset-y-0 left-0 z-50 w-64 bg-white border-r border-slate-200 transition-transform duration-300 ease-in-out lg:relative lg:translate-x-0 ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'} shadow-sm`}>
        <div className="h-full flex flex-col">
           <div className="h-16 flex items-center gap-3 px-6 border-b border-slate-100 bg-white">
              <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center text-white shadow-md shadow-blue-500/20"><Icons.Ghost size={20} /></div>
              <h1 className="text-lg font-extrabold tracking-tight text-slate-900">Ghostwriter<span className="text-blue-600">OS</span></h1>
           </div>

           <div className="p-4 space-y-1">
              <button onClick={() => handleNavClick(AppMode.DASHBOARD)} className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm font-medium transition-all ${mode === AppMode.DASHBOARD && selectedCategory === 'All' ? 'bg-blue-50 text-blue-700 ring-1 ring-blue-200' : 'text-slate-600 hover:bg-slate-50'}`}>
                 <Icons.LayoutGrid size={18} /> Dashboard
              </button>
              <button onClick={() => handleNavClick(AppMode.PROFILE_OPTIMIZER)} className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm font-medium transition-all ${mode === AppMode.PROFILE_OPTIMIZER ? 'bg-blue-50 text-blue-700 ring-1 ring-blue-200' : 'text-slate-600 hover:bg-slate-50'}`}>
                 <Icons.UserCheck size={18} /> Profile Optimizer
              </button>
              <button onClick={() => handleNavClick(AppMode.FUNNEL)} className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm font-medium transition-all ${mode === AppMode.FUNNEL ? 'bg-blue-50 text-blue-700 ring-1 ring-blue-200' : 'text-slate-600 hover:bg-slate-50'}`}>
                 <Icons.PenTool size={18} /> Funnel Builder
              </button>
              <button onClick={() => handleNavClick(AppMode.PROMPT_ARCHITECT)} className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm font-medium transition-all ${mode === AppMode.PROMPT_ARCHITECT ? 'bg-blue-50 text-blue-700 ring-1 ring-blue-200' : 'text-slate-600 hover:bg-slate-50'}`}>
                 <Icons.Terminal size={18} /> Prompt Architect
              </button>
           </div>

           <div className="px-6 py-2 mt-2"><h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest">Tools Library</h3></div>

           <div className="flex-1 overflow-y-auto px-4 pb-4 space-y-0.5 scrollbar-hide">
              {TOOL_CATEGORIES.filter(c => c !== 'All').map(cat => (
                 <button key={cat} onClick={() => handleCategorySelect(cat)} className={`w-full flex items-center justify-between px-4 py-2 rounded-lg text-sm transition-colors ${mode === AppMode.DASHBOARD && selectedCategory === cat ? 'bg-slate-100 text-slate-900 font-semibold' : 'text-slate-500 hover:bg-slate-50'}`}>
                    <span className="flex items-center gap-2">{cat}</span>
                    <Icons.ChevronRight size={14} className="text-slate-400" />
                 </button>
              ))}
           </div>
           
           <div className="p-4 border-t border-slate-100">
              <div className="flex items-center gap-3 px-2 py-2">
                 <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-slate-500 border border-slate-200"><Icons.User size={14} /></div>
                 <div className="text-xs"><div className="text-slate-900 font-bold">Pro Operator</div><div className="text-slate-500">Tier: Elite</div></div>
              </div>
           </div>
        </div>
      </aside>

      <div className="flex-1 flex flex-col min-w-0 bg-slate-50">
         <header className="h-16 flex items-center justify-between px-4 border-b border-slate-200 lg:hidden bg-white">
             <div className="flex items-center gap-3">
                 <button onClick={() => setIsSidebarOpen(!isSidebarOpen)} className="text-slate-500"><Icons.Menu size={24} /></button>
                 <span className="font-extrabold text-slate-900">Ghostwriter<span className="text-blue-600">OS</span></span>
             </div>
         </header>

         <main className="flex-1 overflow-y-auto p-4 md:p-8 relative scrollbar-hide">
            <div className="relative z-10 max-w-7xl mx-auto">
                {mode === AppMode.DASHBOARD && (
                    <div className="animate-fade-in space-y-8">
                        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-2 border-b border-slate-200/60">
                            <div>
                                <h2 className="text-3xl font-black text-blue-950 tracking-tight">{selectedCategory === 'All' ? 'Full Suite' : selectedCategory}</h2>
                                <p className="text-slate-500 mt-1">Access the complete Ghostwriter toolkit.</p>
                            </div>
                            <div className="relative w-full md:w-80"><input type="text" placeholder="Search..." className="w-full bg-white border border-slate-200 rounded-xl pl-10 pr-4 py-3 text-sm focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none shadow-sm" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} /><Icons.Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} /></div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                            {filteredTools.map(tool => (
                                <button key={tool.id} onClick={() => handleToolClick(tool.id)} className="group flex flex-col text-left bg-white border border-slate-200 hover:border-blue-300 hover:shadow-xl hover:-translate-y-1 p-6 rounded-2xl transition-all relative overflow-visible">
                                    <div className="flex justify-between items-start mb-6 w-full">
                                        <div className="text-slate-700 group-hover:text-blue-600 transition-colors">{renderIcon(tool.iconName, 32)}</div>
                                        <div className="text-slate-300 hover:text-yellow-400 transition-colors"><Icons.Star size={20} /></div>
                                    </div>
                                    <div className="flex flex-wrap gap-2 mb-3">
                                        <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider border ${getCategoryColor(tool.category)}`}>{tool.category}</span>
                                    </div>
                                    <h3 className="text-lg font-bold text-slate-900 mb-2 group-hover:text-blue-700">{tool.title}</h3>
                                    <p className="text-sm text-slate-500 leading-relaxed line-clamp-3">{tool.description}</p>
                                </button>
                            ))}
                        </div>
                    </div>
                )}

                {mode === AppMode.TOOL && selectedTool && <div className="animate-fade-in"><button onClick={() => setMode(AppMode.DASHBOARD)} className="flex items-center gap-2 text-slate-500 hover:text-blue-600 mb-8 text-sm font-semibold transition-colors"><Icons.ArrowLeft size={16} /> Back to Dashboard</button><ToolRunner tool={selectedTool} /></div>}
                {mode === AppMode.FUNNEL && <div className="animate-fade-in"><FunnelGenerator /></div>}
                {mode === AppMode.PROFILE_OPTIMIZER && <div className="animate-fade-in max-w-5xl mx-auto"><ProfileOptimizer /></div>}
                {mode === AppMode.PROMPT_ARCHITECT && <div className="animate-fade-in max-w-5xl mx-auto"><PromptArchitect /></div>}
            </div>
         </main>
      </div>
    </div>
  );
}

export default App;
