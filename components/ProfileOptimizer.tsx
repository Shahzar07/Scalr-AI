
// Add React to imports to resolve namespace errors for React.FC and React.FormEvent
import React, { useState } from 'react';
import { optimizeProfile, generateImage } from '../services/geminiService';
import { Loader2, Globe, Target, ShieldCheck, Zap, TrendingUp, Sparkles, Eye, AlertCircle, Copy, Check } from 'lucide-react';
import ReactMarkdown from 'react-markdown';

const ProfileOptimizer: React.FC = () => {
  const [url, setUrl] = useState('');
  const [portfolioUrl, setPortfolioUrl] = useState('');
  const [competitorUrls, setCompetitorUrls] = useState('');
  const [goals, setGoals] = useState('Get High-Ticket Clients');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);
  
  const [coverLoading, setCoverLoading] = useState(false);
  const [generatedCover, setGeneratedCover] = useState<string | null>(null);

  const handleAnalyze = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!url.trim()) return;

    setLoading(true);
    setError(null);
    setResult(null);
    setGeneratedCover(null);

    try {
      const audit = await optimizeProfile(url, goals, portfolioUrl, competitorUrls);
      setResult(audit);
    } catch (err: any) {
      setError("Audit Interrupted. Verify profile is public and links are active.");
    } finally {
      setLoading(false);
    }
  };

  const copyResult = () => {
    if (result) {
      navigator.clipboard.writeText(result);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="space-y-8 pb-20">
      <div className="text-center">
        <div className="inline-flex items-center gap-2 px-3 py-1 bg-blue-50 text-blue-700 text-xs font-bold uppercase tracking-wider rounded-full mb-4 border border-blue-100">
           <ShieldCheck size={14} /> Elite Monetization Engine
        </div>
        <h2 className="text-4xl font-black text-blue-950 mb-3 tracking-tight">Brutal <span className="text-blue-600">Audit</span> & Conversion</h2>
        <p className="text-slate-500 max-w-2xl mx-auto text-lg">We scrape your profile, analyze your proof points, and architect a custom $10k+ monetization roadmap.</p>
      </div>

      <div className="bg-white border border-slate-200 rounded-3xl p-8 shadow-2xl shadow-slate-200/50 relative overflow-hidden">
        <div className="absolute top-0 right-0 p-10 opacity-5 pointer-events-none">
            <TrendingUp size={120} className="text-blue-600" />
        </div>
        
        <form onSubmit={handleAnalyze} className="space-y-6 relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
            <div className="md:col-span-6 space-y-2">
              <label className="text-xs font-black text-slate-500 uppercase tracking-widest flex items-center gap-2">
                <Globe size={14} /> Profile URL (Live Scrape)
              </label>
              <input 
                type="text" 
                placeholder="LinkedIn, X, or Upwork profile link..."
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-5 py-4 text-slate-900 focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition-all"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                required
              />
            </div>
            <div className="md:col-span-6 space-y-2">
              <label className="text-xs font-black text-slate-500 uppercase tracking-widest flex items-center gap-2">
                <Target size={14} /> Portfolio (Expertise Proof)
              </label>
              <input 
                type="text" 
                placeholder="https://yourportfolio.com..."
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-5 py-4 text-slate-900 focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition-all"
                value={portfolioUrl}
                onChange={(e) => setPortfolioUrl(e.target.value)}
              />
            </div>
            <div className="md:col-span-6 space-y-2">
              <label className="text-xs font-black text-slate-500 uppercase tracking-widest flex items-center gap-2">
                <Eye size={14} /> Competitor URLs (Gap Audit)
              </label>
              <input 
                type="text" 
                placeholder="Competitor profile links..."
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-5 py-4 text-slate-900 focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition-all"
                value={competitorUrls}
                onChange={(e) => setCompetitorUrls(e.target.value)}
              />
            </div>
            <div className="md:col-span-6 space-y-2">
              <label className="text-xs font-black text-slate-500 uppercase tracking-widest flex items-center gap-2">
                <Sparkles size={14} /> Strategic Objective
              </label>
              <select 
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-5 py-4 text-slate-900 focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition-all appearance-none cursor-pointer"
                value={goals}
                onChange={(e) => setGoals(e.target.value)}
              >
                <option value="Get High-Ticket Clients">Get High-Ticket Clients</option>
                <option value="Maximize SEO Search Ranking">Maximize SEO Search Ranking</option>
                <option value="Increase Hourly Rate">Increase Hourly Rate</option>
                <option value="Beat Specific Competitors">Beat Specific Competitors</option>
              </select>
            </div>
          </div>

          <button
            type="submit"
            disabled={loading || !url}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-black py-5 rounded-2xl shadow-xl shadow-blue-600/30 transition-all flex items-center justify-center gap-3 disabled:opacity-70 group active:scale-[0.98]"
          >
            {loading ? (
              <>
                <Loader2 className="animate-spin" size={20} /> Auditing Live Data...
              </>
            ) : (
              <>
                Run Brutal Audit <Zap className="group-hover:scale-110 transition-transform" size={20} />
              </>
            )}
          </button>
        </form>
      </div>

      {error && (
        <div className="bg-red-50 border border-red-100 text-red-600 p-6 rounded-2xl flex items-center gap-3 animate-fade-in">
          <AlertCircle size={20} />
          <p className="font-bold">{error}</p>
        </div>
      )}

      {result && (
        <div className="animate-fade-in space-y-8">
          <div className="bg-white border border-slate-200 rounded-3xl overflow-hidden shadow-2xl">
            <div className="bg-slate-900 text-white p-6 flex justify-between items-center">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-blue-500/20 rounded-lg text-blue-400">
                    <Sparkles size={20} />
                </div>
                <h3 className="font-black text-lg">Monetization & Conversion Strategy</h3>
              </div>
              <button 
                onClick={copyResult}
                className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all ${copied ? 'bg-emerald-500 text-white' : 'bg-white/10 hover:bg-white/20 text-white border border-white/10'}`}
              >
                {copied ? <Check size={16} /> : <Copy size={16} />}
                {copied ? 'Copied' : 'Copy Strategy'}
              </button>
            </div>
            
            <div className="p-8 md:p-12 bg-white">
              <div className="prose prose-slate prose-lg max-w-none prose-headings:text-blue-950 prose-headings:font-black prose-strong:text-blue-700 prose-p:text-slate-600 prose-li:text-slate-600">
                <ReactMarkdown children={String(result || '')} />
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProfileOptimizer;
