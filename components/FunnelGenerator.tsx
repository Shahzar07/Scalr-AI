import React, { useState } from 'react';
import { FunnelData, FunnelInputState } from '../types';
import { generateFunnelStack } from '../services/geminiService';
import { Loader2, ArrowRight, Zap, Layout, Mail, Copy, Check, MousePointer2 } from 'lucide-react';

const FunnelGenerator: React.FC = () => {
  const [inputs, setInputs] = useState<FunnelInputState>({
    productName: '',
    audience: '',
    coreProblem: '',
  });
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<FunnelData | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<'ads' | 'lp' | 'emails'>('ads');
  const [copiedIndex, setCopiedIndex] = useState<string | null>(null);

  const handleGenerate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputs.productName || !inputs.audience || !inputs.coreProblem) return;

    setLoading(true);
    setError(null);
    setResult(null);

    try {
      const data = await generateFunnelStack(inputs.productName, inputs.audience, inputs.coreProblem);
      setResult(data);
    } catch (err) {
      setError("Failed to generate funnel. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const copyToClipboard = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedIndex(id);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  const renderAds = () => (
    <div className="grid grid-cols-1 gap-6">
      {result?.ads.map((ad, idx) => (
        <div key={idx} className="bg-white border border-slate-200 rounded-xl p-8 hover:shadow-lg transition-all shadow-sm">
          <div className="flex justify-between items-center mb-6 border-b border-slate-100 pb-3">
            <span className="text-blue-600 text-xs font-black tracking-widest uppercase bg-blue-50 px-3 py-1 rounded-full">{ad.type} Ad</span>
            <button 
              onClick={() => copyToClipboard(`Headline: ${ad.headline}\n\n${ad.primaryText}\n\nCTA: ${ad.cta}`, `ad-${idx}`)}
              className="flex items-center gap-1.5 text-xs text-slate-400 hover:text-blue-600 transition-colors font-medium"
              title="Copy Full Ad"
            >
              {copiedIndex === `ad-${idx}` ? <Check size={14} className="text-emerald-500" /> : <Copy size={14} />}
              <span>{copiedIndex === `ad-${idx}` ? 'Copied' : 'Copy Ad'}</span>
            </button>
          </div>
          <div className="space-y-6">
            <div className="group relative">
              <div className="flex justify-between items-start mb-1">
                <span className="text-[10px] text-slate-400 uppercase tracking-widest font-bold">Headline</span>
                <button 
                  onClick={() => copyToClipboard(ad.headline, `ad-${idx}-h`)}
                  className="opacity-0 group-hover:opacity-100 p-1 text-slate-400 hover:text-blue-600 transition-all"
                  title="Copy Headline"
                >
                  {copiedIndex === `ad-${idx}-h` ? <Check size={14} className="text-emerald-500" /> : <Copy size={14} />}
                </button>
              </div>
              <h3 className="text-xl font-bold text-slate-900 leading-tight">{ad.headline}</h3>
            </div>
            
            <div className="group relative">
              <div className="flex justify-between items-start mb-1">
                <span className="text-[10px] text-slate-400 uppercase tracking-widest font-bold">Primary Text</span>
                <button 
                  onClick={() => copyToClipboard(ad.primaryText, `ad-${idx}-p`)}
                  className="opacity-0 group-hover:opacity-100 p-1 text-slate-400 hover:text-blue-600 transition-all"
                  title="Copy Primary Text"
                >
                  {copiedIndex === `ad-${idx}-p` ? <Check size={14} className="text-emerald-500" /> : <Copy size={14} />}
                </button>
              </div>
              <p className="text-slate-600 whitespace-pre-wrap text-sm leading-relaxed">{ad.primaryText}</p>
            </div>

            <div className="group relative pt-2">
              <div className="flex justify-between items-start mb-1">
                <span className="text-[10px] text-slate-400 uppercase tracking-widest font-bold">Call to Action</span>
                <button 
                  onClick={() => copyToClipboard(ad.cta, `ad-${idx}-c`)}
                  className="opacity-0 group-hover:opacity-100 p-1 text-slate-400 hover:text-blue-600 transition-all"
                  title="Copy CTA"
                >
                  {copiedIndex === `ad-${idx}-c` ? <Check size={14} className="text-emerald-500" /> : <Copy size={14} />}
                </button>
              </div>
              <div className="inline-flex items-center px-4 py-2 rounded-lg bg-blue-50 text-blue-700 text-sm font-bold border border-blue-100">
                <MousePointer2 size={14} className="mr-2" />
                {ad.cta}
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );

  const renderLandingPage = () => {
    if (!result?.landingPage) return null;
    const lp = result.landingPage;
    return (
      <div className="bg-white border border-slate-200 rounded-xl overflow-hidden shadow-xl shadow-slate-200/50">
        <div className="bg-slate-50 p-4 border-b border-slate-200 flex justify-between items-center">
            <span className="text-slate-500 text-sm font-mono font-bold tracking-tight">LANDING_PAGE_ASSET.MD</span>
            <button 
              onClick={() => copyToClipboard(`${lp.preHeadline}\n${lp.headline}\n${lp.subHeadline}\n\nVSL Outline:\n${lp.vslScript.join('\n')}`, 'lp')}
              className="flex items-center gap-1.5 text-xs text-slate-500 hover:text-blue-600 transition-colors font-medium"
              title="Copy Landing Page Content"
            >
              {copiedIndex === 'lp' ? <Check size={14} className="text-emerald-500" /> : <Copy size={14} />}
              <span>{copiedIndex === 'lp' ? 'Copied' : 'Copy All'}</span>
            </button>
        </div>
        <div className="p-10 space-y-10">
            <div className="text-center space-y-4 max-w-4xl mx-auto">
                <p className="text-blue-600 font-bold tracking-[0.2em] text-xs uppercase">{lp.preHeadline}</p>
                <h2 className="text-4xl md:text-5xl font-black text-slate-900 leading-tight">{lp.headline}</h2>
                <p className="text-xl text-slate-500 font-medium max-w-2xl mx-auto">{lp.subHeadline}</p>
            </div>
            
            <div className="bg-slate-50 rounded-2xl p-8 border border-slate-200 max-w-3xl mx-auto shadow-inner">
                <div className="flex items-center gap-3 mb-6 border-b border-slate-200 pb-4">
                    <div className="w-2.5 h-2.5 rounded-full bg-red-500 shadow-[0_0_8px_rgba(239,68,68,0.4)]"></div>
                    <span className="text-slate-900 font-black text-sm uppercase tracking-wider">VSL Script Outline</span>
                </div>
                <ul className="space-y-4">
                    {lp.vslScript.map((point, idx) => (
                        <li key={idx} className="flex gap-4 text-slate-700">
                            <span className="text-blue-400 font-mono text-sm select-none pt-0.5 font-bold">{(idx + 1).toString().padStart(2, '0')}</span>
                            <span className="text-base leading-relaxed">{point}</span>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
      </div>
    );
  };

  const renderEmails = () => (
    <div className="space-y-6">
      {result?.emails.map((email, idx) => (
        <div key={idx} className="bg-white border border-slate-200 rounded-xl p-8 shadow-sm hover:shadow-md transition-shadow">
          <div className="flex justify-between items-start mb-6">
             <div className="space-y-1">
                <span className="text-blue-600 text-[10px] font-black tracking-[0.15em] uppercase px-2 py-1 bg-blue-50 rounded border border-blue-100">{email.day} • {email.type}</span>
                <h3 className="text-xl font-bold text-slate-900 leading-snug">{email.subject}</h3>
             </div>
             <button 
              onClick={() => copyToClipboard(`Subject: ${email.subject}\n\n${email.body}`, `email-${idx}`)}
              className="p-2 text-slate-400 hover:text-blue-600 transition-colors"
              title="Copy Email Content"
            >
              {copiedIndex === `email-${idx}` ? <Check size={18} className="text-emerald-500" /> : <Copy size={18} />}
            </button>
          </div>
          <div className="prose prose-slate prose-sm max-w-none text-slate-600 whitespace-pre-wrap font-sans border-t border-slate-100 pt-6 leading-relaxed">
            {email.body}
          </div>
        </div>
      ))}
    </div>
  );

  return (
    <div className="max-w-5xl mx-auto pb-12">
      <div className="text-center mb-12">
        <h2 className="text-4xl font-black text-blue-950 mb-3 tracking-tight">Funnel <span className="text-blue-600">Stack</span></h2>
        <p className="text-slate-500 text-lg">Weaponized direct response assets generated instantly.</p>
      </div>

      <div className="bg-white border border-slate-200 rounded-2xl p-8 md:p-10 mb-12 shadow-xl shadow-slate-200/60 relative overflow-hidden group">
        <div className="absolute top-0 right-0 w-64 h-64 bg-blue-50 rounded-full blur-3xl -mr-32 -mt-32 pointer-events-none"></div>
        <form onSubmit={handleGenerate} className="space-y-8 relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-2">
              <label className="text-xs font-black text-slate-500 uppercase tracking-widest">Product/Offer Name</label>
              <input
                type="text"
                placeholder="e.g. AI Content Agency 2.0"
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-5 py-4 text-slate-900 placeholder-slate-400 focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition-all shadow-inner"
                value={inputs.productName}
                onChange={(e) => setInputs({ ...inputs, productName: e.target.value })}
                required
              />
            </div>
            <div className="space-y-2">
              <label className="text-xs font-black text-slate-500 uppercase tracking-widest">Target Audience</label>
              <input
                type="text"
                placeholder="e.g. Struggling solopreneurs"
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-5 py-4 text-slate-900 placeholder-slate-400 focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition-all shadow-inner"
                value={inputs.audience}
                onChange={(e) => setInputs({ ...inputs, audience: e.target.value })}
                required
              />
            </div>
          </div>
          <div className="space-y-2">
            <label className="text-xs font-black text-slate-500 uppercase tracking-widest">The Core Pain Point</label>
            <textarea
              placeholder="e.g. Spending 40+ hours a week on content that converts 0 clients."
              className="w-full bg-slate-50 border border-slate-200 rounded-xl px-5 py-4 text-slate-900 placeholder-slate-400 focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition-all h-32 resize-none shadow-inner"
              value={inputs.coreProblem}
              onChange={(e) => setInputs({ ...inputs, coreProblem: e.target.value })}
              required
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-black py-5 rounded-xl shadow-lg shadow-blue-600/20 transition-all flex items-center justify-center gap-3 disabled:opacity-70 disabled:cursor-not-allowed group active:scale-[0.99]"
          >
            {loading ? (
              <>
                <Loader2 className="animate-spin" size={20} /> Deploying AI Ghostwriters...
              </>
            ) : (
              <>
                Build The Funnel <ArrowRight className="group-hover:translate-x-1 transition-transform" size={20} />
              </>
            )}
          </button>
        </form>
      </div>

      {error && (
        <div className="bg-red-50 border border-red-100 text-red-600 p-6 rounded-xl mb-8 text-center animate-shake font-medium">
          {error}
        </div>
      )}

      {result && (
        <div className="animate-fade-in-up">
          <div className="flex bg-slate-100 p-1 rounded-xl mb-10 overflow-x-auto scrollbar-hide border border-slate-200">
            <button
              onClick={() => setActiveTab('ads')}
              title="Traffic (Ads)"
              className={`flex-1 flex items-center justify-center gap-2 px-6 py-3 rounded-lg font-black text-xs uppercase tracking-widest transition-all ${
                activeTab === 'ads' ? 'bg-white text-blue-700 shadow-md' : 'text-slate-500 hover:text-slate-900 hover:bg-slate-200'
              }`}
            >
              <Zap size={16} /> <span className="hidden md:inline">Traffic (Ads)</span>
            </button>
            <button
              onClick={() => setActiveTab('lp')}
              title="Landing Page"
              className={`flex-1 flex items-center justify-center gap-2 px-6 py-3 rounded-lg font-black text-xs uppercase tracking-widest transition-all ${
                activeTab === 'lp' ? 'bg-white text-blue-700 shadow-md' : 'text-slate-500 hover:text-slate-900 hover:bg-slate-200'
              }`}
            >
              <Layout size={16} /> <span className="hidden md:inline">Landing Page</span>
            </button>
            <button
              onClick={() => setActiveTab('emails')}
              title="Email Sequence"
              className={`flex-1 flex items-center justify-center gap-2 px-6 py-3 rounded-lg font-black text-xs uppercase tracking-widest transition-all ${
                activeTab === 'emails' ? 'bg-white text-blue-700 shadow-md' : 'text-slate-500 hover:text-slate-900 hover:bg-slate-200'
              }`}
            >
              <Mail size={16} /> <span className="hidden md:inline">Email Sequence</span>
            </button>
          </div>

          <div className="min-h-[400px]">
            {activeTab === 'ads' && renderAds()}
            {activeTab === 'lp' && renderLandingPage()}
            {activeTab === 'emails' && renderEmails()}
          </div>
        </div>
      )}
    </div>
  );
};

export default FunnelGenerator;