
import React, { useState, useRef } from 'react';
import { Tool, ToolInput } from '../types';
import { runTool, generateImage, refineContent, generateIdeas } from '../services/geminiService';
// Added Zap to the named imports from lucide-react
import { Loader2, Copy, Check, Wand2, Sparkles, Send, Lightbulb, Link as LinkIcon, Info, Globe, AlertCircle, X, ChevronRight, Zap } from 'lucide-react';
import ReactMarkdown from 'react-markdown';

interface ToolRunnerProps {
  tool: Tool;
}

const ToolRunner: React.FC<ToolRunnerProps> = ({ tool }) => {
  const [formValues, setFormValues] = useState<Record<string, string>>({});
  const [output, setOutput] = useState<string | null>(null);
  const [ideas, setIdeas] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [ideasLoading, setIdeasLoading] = useState(false);
  const [refining, setRefining] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);
  const [viewMode, setViewMode] = useState<'preview' | 'raw'>('preview');
  const [customRefinement, setCustomRefinement] = useState<string>('');

  const [cloningEnabled, setCloningEnabled] = useState(false);
  const [creatorUrl, setCreatorUrl] = useState('');

  const handleInputChange = (name: string, value: string) => {
    setFormValues(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const missingFields = tool.inputs.filter(i => i.required && !formValues[i.name]);
    if (missingFields.length > 0) {
      setError(`Fields missing: ${missingFields.map(f => f.label).join(', ')}`);
      return;
    }

    setLoading(true);
    setError(null);
    setOutput(null);
    setViewMode('preview');

    try {
      const result = await runTool(tool, formValues, (cloningEnabled && creatorUrl) ? creatorUrl : undefined);
      setOutput(result);
    } catch (err: any) {
      setError("Strategic Error: Data stream interrupted.");
    } finally {
      setLoading(false);
    }
  };

  const handleGenerateIdeas = async () => {
    const context = Object.entries(formValues).map(([k, v]) => `${k}: ${v}`).join(', ');
    if (!context) {
      setError("Provide some inputs first so I can generate ideas based on your niche.");
      return;
    }

    setIdeasLoading(true);
    setIdeas(null);
    try {
      const prompt = `Tool: ${tool.title}. Context: ${context}. Generate 5-10 high-converting, monetizable "Grand Slam" ideas for this tool.`;
      const result = await generateIdeas(prompt);
      setIdeas(result);
    } catch (err) {
      setError("Failed to generate ideas.");
    } finally {
      setIdeasLoading(false);
    }
  };

  const handleRefine = async (instruction: string) => {
    if (!output) return;
    setRefining(true);
    try {
      const result = await refineContent(output, instruction);
      setOutput(result);
      setCustomRefinement('');
    } catch (err: any) {
      setError("Refinement failed.");
    } finally {
      setRefining(false);
    }
  };

  const copyToClipboard = () => {
    if (output) {
      navigator.clipboard.writeText(output);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const hasUrl = (value: string) => /(https?:\/\/[^\s]+)/g.test(value);

  return (
    <div className="max-w-6xl mx-auto pb-20">
      <div className="mb-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-blue-50 text-blue-700 text-xs font-bold uppercase tracking-wider rounded-full mb-3 border border-blue-100">
             <Wand2 size={12} /> Strategic Protocol
          </div>
          <h2 className="text-4xl font-black text-blue-950 mb-3 tracking-tight">
             {tool.title}
          </h2>
          <p className="text-slate-500 max-w-2xl text-lg leading-relaxed">{tool.description}</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Column: Form */}
        <div className="lg:col-span-5 space-y-6">
          {tool.supportsCreatorCloning && (
            <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm group hover:border-blue-300 transition-colors">
               <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2 text-blue-700 font-bold text-xs uppercase tracking-widest">
                      <LinkIcon size={14} />
                      <span>Deep Target Scrape</span>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input type="checkbox" className="sr-only peer" checked={cloningEnabled} onChange={() => setCloningEnabled(!cloningEnabled)} />
                    <div className="w-9 h-5 bg-slate-200 rounded-full peer peer-checked:bg-blue-600 peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:rounded-full after:h-4 after:w-4 after:transition-all"></div>
                  </label>
               </div>
               
               {cloningEnabled && (
                 <div className="animate-fade-in space-y-3 mt-2">
                    <input 
                      type="text" 
                      placeholder="Enter Profile or Portfolio URL..." 
                      className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-sm text-slate-900 focus:ring-1 focus:ring-blue-500 outline-none"
                      value={creatorUrl}
                      onChange={(e) => setCreatorUrl(e.target.value)}
                    />
                 </div>
               )}
            </div>
          )}

          <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-xl shadow-slate-200/50">
            <form onSubmit={handleSubmit} className="space-y-6">
              {tool.inputs.map((input) => {
                const isUrl = hasUrl(String(formValues[input.name] || ''));
                return (
                  <div key={input.name} className="space-y-2">
                    <label className="block text-xs font-bold text-slate-500 uppercase tracking-wide flex justify-between items-center">
                      <span>{input.label} {input.required && <span className="text-red-500">*</span>}</span>
                      {isUrl && (
                          <span className="text-[10px] flex items-center gap-1 text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-100 animate-fade-in font-semibold">
                              <Globe size={10} /> Live Scrape
                          </span>
                      )}
                    </label>
                    
                    {input.type === 'select' ? (
                       <select
                        className="w-full bg-slate-50 border border-slate-200 rounded-lg px-4 py-3 text-sm text-slate-900 focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition-all cursor-pointer"
                        value={formValues[input.name] || ''}
                        onChange={(e) => handleInputChange(input.name, e.target.value)}
                        required={input.required}
                       >
                         <option value="">Select Platform...</option>
                         {input.options?.map(opt => <option key={opt} value={opt}>{opt}</option>)}
                       </select>
                    ) : input.type === 'textarea' ? (
                      <textarea
                        className="w-full bg-slate-50 border border-slate-200 rounded-lg px-4 py-3 text-sm text-slate-900 placeholder-slate-400 focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition-all min-h-[120px] resize-none"
                        placeholder={input.placeholder}
                        value={formValues[input.name] || ''}
                        onChange={(e) => handleInputChange(input.name, e.target.value)}
                      />
                    ) : (
                      <input
                        type="text"
                        className="w-full bg-slate-50 border border-slate-200 rounded-lg px-4 py-3 text-sm text-slate-900 placeholder-slate-400 focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition-all"
                        placeholder={input.placeholder}
                        value={formValues[input.name] || ''}
                        onChange={(e) => handleInputChange(input.name, e.target.value)}
                      />
                    )}
                  </div>
                );
              })}

              <div className="grid grid-cols-2 gap-4">
                <button
                  type="submit"
                  disabled={loading}
                  className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-black py-4 rounded-xl shadow-lg transition-all flex items-center justify-center gap-2 disabled:opacity-70 group"
                >
                  {loading ? <Loader2 className="animate-spin" size={20} /> : <Zap size={20} />}
                  Deploy
                </button>
                <button
                  type="button"
                  onClick={handleGenerateIdeas}
                  disabled={ideasLoading}
                  className="flex-1 bg-white border border-slate-200 text-slate-700 font-bold py-4 rounded-xl hover:border-blue-300 transition-all flex items-center justify-center gap-2 shadow-sm disabled:opacity-70"
                >
                  {ideasLoading ? <Loader2 className="animate-spin text-blue-600" size={20} /> : <Lightbulb size={20} className="text-yellow-500" />}
                  Ideas
                </button>
              </div>
            </form>
          </div>
        </div>

        {/* Right Column: Output */}
        <div className="lg:col-span-7 flex flex-col gap-6">
           {/* Idea Generator Section */}
           {ideas && (
             <div className="bg-yellow-50/50 border border-yellow-100 rounded-xl p-6 animate-fade-in relative">
                <button onClick={() => setIdeas(null)} className="absolute top-4 right-4 text-yellow-600 hover:text-yellow-800 transition-colors">
                    <X size={18} />
                </button>
                <div className="flex items-center gap-2 mb-4">
                    <div className="p-2 bg-yellow-100 rounded-lg text-yellow-600">
                        <Sparkles size={18} />
                    </div>
                    <h4 className="font-black text-yellow-900 tracking-tight">Strategic Brainstorming: Grand Slam Ideas</h4>
                </div>
                <div className="prose prose-sm prose-yellow max-w-none">
                    <ReactMarkdown children={ideas} />
                </div>
             </div>
           )}

           <div className={`flex-1 bg-white border border-slate-200 rounded-xl overflow-hidden flex flex-col relative min-h-[500px] shadow-2xl ${!output ? 'items-center justify-center bg-slate-50/50' : ''}`}>
              {output && (
                <div className="absolute top-0 left-0 right-0 bg-white/95 backdrop-blur-md border-b border-slate-200 p-3 flex justify-between items-center z-10">
                   <div className="flex gap-1 p-1 bg-slate-100 rounded-lg border border-slate-200">
                      <button onClick={() => setViewMode('preview')} className={`px-4 py-1.5 rounded-md text-xs font-bold transition-all ${viewMode === 'preview' ? 'bg-white text-blue-700 shadow-sm' : 'text-slate-500'}`}>Preview</button>
                      <button onClick={() => setViewMode('raw')} className={`px-4 py-1.5 rounded-md text-xs font-bold transition-all ${viewMode === 'raw' ? 'bg-white text-blue-700 shadow-sm' : 'text-slate-500'}`}>Raw Code</button>
                   </div>
                   <button onClick={copyToClipboard} className="flex items-center gap-1.5 px-4 py-1.5 rounded-md text-xs font-bold bg-slate-900 text-white shadow-lg shadow-slate-900/20">
                     {copied ? <Check size={14} /> : <Copy size={14} />} {copied ? 'Copied' : 'Copy'}
                   </button>
                </div>
              )}

              <div className="flex-1 overflow-y-auto p-8 pt-24 relative scrollbar-hide">
                {output ? (
                  viewMode === 'preview' ? (
                     <div className="prose prose-slate prose-lg max-w-none prose-headings:font-black prose-headings:text-blue-950 prose-strong:text-blue-700 prose-li:text-slate-600">
                        <ReactMarkdown children={output} />
                     </div>
                  ) : (
                     <pre className="whitespace-pre-wrap font-mono text-sm text-slate-700 bg-slate-50 p-6 rounded-lg border border-slate-200">{output}</pre>
                  )
                ) : (
                  <div className="text-center p-8 max-w-sm mx-auto">
                     <div className="w-20 h-20 bg-white rounded-3xl flex items-center justify-center mx-auto mb-6 text-blue-600 border border-slate-100 shadow-xl transform rotate-3"><Wand2 size={40} /></div>
                     <h3 className="text-xl text-blue-950 font-black mb-2">Execution Vault</h3>
                     <p className="text-slate-500 text-sm">Deploy a protocol to generate high-status, revenue-generating marketing assets.</p>
                  </div>
                )}
                {refining && (
                    <div className="absolute inset-0 bg-white/80 backdrop-blur-sm flex items-center justify-center z-20">
                        <Loader2 className="animate-spin text-blue-600 mr-2" /> Refining Protocol...
                    </div>
                )}
              </div>

               {output && (
                   <div className="border-t border-slate-200 bg-slate-50 p-4 flex gap-2">
                       <input 
                           type="text" 
                           value={customRefinement}
                           onChange={(e) => setCustomRefinement(e.target.value)}
                           onKeyDown={(e) => e.key === 'Enter' && handleRefine(customRefinement)}
                           placeholder="Enter refinement instruction (e.g. 'Make it more punchy')"
                           className="flex-1 bg-white border border-slate-200 rounded-lg px-4 py-3 text-sm outline-none shadow-sm focus:ring-2 focus:ring-blue-500/20"
                       />
                       <button 
                            onClick={() => handleRefine(customRefinement)}
                            disabled={!customRefinement.trim() || refining}
                            className="px-5 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors shadow-lg shadow-blue-600/20"
                       >
                           <Send size={18} />
                       </button>
                   </div>
               )}
           </div>
        </div>
      </div>

      {error && (
        <div className="fixed bottom-8 left-1/2 -translate-x-1/2 bg-red-600 text-white px-6 py-3 rounded-full shadow-2xl flex items-center gap-3 z-50 animate-bounce">
          <AlertCircle size={20} />
          <span className="font-bold">{error}</span>
          <button onClick={() => setError(null)} className="ml-2 hover:opacity-70"><X size={16} /></button>
        </div>
      )}
    </div>
  );
};

export default ToolRunner;
