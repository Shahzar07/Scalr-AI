
import React, { useState } from 'react';
import { runTool } from '../services/geminiService';
import { Tool } from '../types';
import { Terminal, Send, Loader2, Copy, Check, Info, Sparkles, Wand2 } from 'lucide-react';
import ReactMarkdown from 'react-markdown';

const PromptArchitect: React.FC = () => {
  const [platform, setPlatform] = useState('ChatGPT (GPT-4o)');
  const [role, setRole] = useState('Senior Backend Engineer');
  const [goal, setGoal] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  const mockTool: Tool = {
    id: 'prompt-architect-internal',
    title: 'The Prompt Architect',
    description: 'Internal engine',
    iconName: 'Terminal',
    category: 'Shadow Ops',
    systemInstruction: `
      You are a World-Class Senior Prompt Engineer. 
      Your task is to generate a highly detailed, instruction-perfect prompt for another AI platform.
      
      PLATFORM RULES:
      - For ChatGPT: Use clear Markdown, distinct sections (Persona, Task, Context, Constraints), and structured output requests.
      - For Claude: Use XML tags (e.g., <system_prompt>, <task>, <examples>) to structure the request. Claude is logic-heavy.
      - For Midjourney: Use keyword-dense, comma-separated descriptors, aspect ratios, and lighting styles.
      - For Gemini: Use conversational yet strict instructions with explicit reasoning steps.

      The prompt you generate should be a "Master Class" in prompt engineering that ensures 100% success on the first attempt.
    `,
    inputs: [],
    promptTemplate: 'Generate a perfect {platform} prompt for a {role} to achieve: {goal}.'
  };

  const handleGenerate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!goal.trim()) return;

    setLoading(true);
    setResult(null);

    try {
      const prompt = await runTool(mockTool, { platform, role, goal });
      setResult(prompt);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const copyToClipboard = () => {
    if (result) {
      navigator.clipboard.writeText(result);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="space-y-8 pb-20">
      <div className="text-center">
        <div className="inline-flex items-center gap-2 px-3 py-1 bg-slate-900 text-white text-xs font-bold uppercase tracking-wider rounded-full mb-4 shadow-lg">
           <Terminal size={14} /> AI Instruction Layer
        </div>
        <h2 className="text-4xl font-black text-blue-950 mb-3 tracking-tight">The Prompt <span className="text-blue-600">Architect</span></h2>
        <p className="text-slate-500 max-w-2xl mx-auto text-lg leading-relaxed">
          Generate high-converting, platform-aware prompts that ensure other AI models execute your vision with zero ambiguity.
        </p>
      </div>

      <div className="bg-white border border-slate-200 rounded-3xl p-8 shadow-2xl shadow-slate-200/50">
        <form onSubmit={handleGenerate} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-xs font-black text-slate-500 uppercase tracking-widest flex items-center gap-2">
                Target AI Platform
              </label>
              <select 
                value={platform}
                onChange={(e) => setPlatform(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-5 py-4 text-slate-900 focus:ring-2 focus:ring-blue-500/20 outline-none appearance-none cursor-pointer"
              >
                <option>ChatGPT (GPT-4o)</option>
                <option>Claude 3.5 Sonnet</option>
                <option>Gemini Pro</option>
                <option>Midjourney v6.1</option>
                <option>Flux.1 (Image AI)</option>
                <option>Video AI (Veo/Sora)</option>
              </select>
            </div>
            <div className="space-y-2">
              <label className="text-xs font-black text-slate-500 uppercase tracking-widest flex items-center gap-2">
                AI Persona/Role
              </label>
              <input 
                type="text" 
                value={role}
                onChange={(e) => setRole(e.target.value)}
                placeholder="e.g. Senior Copywriter, Python Expert..."
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-5 py-4 text-slate-900 focus:ring-2 focus:ring-blue-500/20 outline-none"
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-xs font-black text-slate-500 uppercase tracking-widest">
              Vision & Goal
            </label>
            <textarea 
              value={goal}
              onChange={(e) => setGoal(e.target.value)}
              placeholder="Describe exactly what you want the AI to build or write..."
              className="w-full bg-slate-50 border border-slate-200 rounded-xl px-5 py-4 text-slate-900 focus:ring-2 focus:ring-blue-500/20 outline-none min-h-[120px] resize-none"
            />
          </div>

          <button
            type="submit"
            disabled={loading || !goal.trim()}
            className="w-full bg-slate-900 hover:bg-black text-white font-black py-5 rounded-2xl shadow-xl transition-all flex items-center justify-center gap-3 disabled:opacity-70 group active:scale-[0.98]"
          >
            {loading ? <Loader2 className="animate-spin" size={20} /> : <Wand2 size={20} />}
            Engineer Prompt Protocol
          </button>
        </form>
      </div>

      {result && (
        <div className="animate-fade-in bg-white border border-slate-200 rounded-3xl overflow-hidden shadow-2xl">
           <div className="bg-slate-900 p-4 flex justify-between items-center px-8">
              <div className="flex items-center gap-2 text-white">
                 <Sparkles size={18} className="text-blue-400" />
                 <span className="font-black text-sm uppercase tracking-widest">Engineered Prompt Result</span>
              </div>
              <button 
                onClick={copyToClipboard}
                className="flex items-center gap-2 px-4 py-2 bg-white/10 hover:bg-white/20 text-white rounded-xl text-xs font-bold transition-all border border-white/10"
              >
                {copied ? <Check size={14} className="text-emerald-400" /> : <Copy size={14} />}
                {copied ? 'Copied' : 'Copy Prompt'}
              </button>
           </div>
           <div className="p-8 md:p-12 prose prose-slate max-w-none">
              <ReactMarkdown children={result} />
           </div>
        </div>
      )}
    </div>
  );
};

export default PromptArchitect;
