import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Zap, Settings, RefreshCw, Cpu, CheckCircle2, ChevronRight, Activity, Loader2 } from 'lucide-react';

export default function App() {
  const [formData, setFormData] = useState({
    process_name: '',
    workflow_steps: '',
    pain_points: '',
    target_goal: ''
  });
  
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);
    setResult(null);

    try {
      const response = await fetch('/api/analyze', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      if (!response.ok) {
        throw new Error('Failed to analyze process');
      }

      const data = await response.json();
      setResult(data);
    } catch (err) {
      setError(err.message || 'Something went wrong');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 py-12 px-4 sm:px-6 lg:px-8 font-sans">
      <div className="max-w-7xl mx-auto space-y-8">
        
        {/* Header */}
        <div className="text-center space-y-4 mb-12">
          <motion.div 
            initial={{ scale: 0.9, opacity: 0 }} 
            animate={{ scale: 1, opacity: 1 }} 
            transition={{ duration: 0.5 }}
            className="inline-flex items-center justify-center p-4 bg-brand-500 rounded-2xl shadow-lg shadow-brand-500/30 mb-2"
          >
            <Activity className="w-10 h-10 text-white" />
          </motion.div>
          <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 tracking-tight">
            Process Excellence <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-500 to-indigo-600">Copilot</span>
          </h1>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            Harness the power of AI to identify simplification, standardization, and automation opportunities in your workflows.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Input Form Panel */}
          <motion.div 
            initial={{ x: -20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            className="lg:col-span-5 glass-panel p-8"
          >
            <h2 className="text-2xl font-bold text-slate-800 mb-6 flex items-center">
              <Settings className="w-6 h-6 mr-2 text-brand-500" />
              Process Context
            </h2>
            
            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-1">Process Name</label>
                <input 
                  type="text" 
                  name="process_name"
                  required
                  value={formData.process_name}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-brand-500 focus:border-brand-500 transition-all bg-white/50 backdrop-blur-sm"
                  placeholder="e.g., Health claims processing"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-1">Current Workflow Steps</label>
                <textarea 
                  name="workflow_steps"
                  required
                  rows="3"
                  value={formData.workflow_steps}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-brand-500 focus:border-brand-500 transition-all bg-white/50 backdrop-blur-sm"
                  placeholder="e.g., 1. Receive claim 2. Data entry 3. Verification..."
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-1">Known Pain Points</label>
                <textarea 
                  name="pain_points"
                  required
                  rows="2"
                  value={formData.pain_points}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-brand-500 focus:border-brand-500 transition-all bg-white/50 backdrop-blur-sm"
                  placeholder="e.g., Manual verification takes too long and causes backlog."
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-1">Target Goal</label>
                <input 
                  type="text" 
                  name="target_goal"
                  required
                  value={formData.target_goal}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-brand-500 focus:border-brand-500 transition-all bg-white/50 backdrop-blur-sm"
                  placeholder="e.g., Reduce claims processing time by 50%"
                />
              </div>

              <button 
                type="submit" 
                disabled={isLoading}
                className="w-full mt-4 bg-gradient-to-r from-brand-600 to-indigo-600 hover:from-brand-500 hover:to-indigo-500 text-white font-bold py-4 px-6 rounded-xl shadow-lg shadow-brand-500/30 transition-all transform hover:scale-[1.02] disabled:opacity-70 disabled:hover:scale-100 flex items-center justify-center"
              >
                {isLoading ? (
                  <><Loader2 className="w-5 h-5 mr-2 animate-spin" /> Analyzing Workflow...</>
                ) : (
                  <><Zap className="w-5 h-5 mr-2" /> Generate Transformation Plan</>
                )}
              </button>
            </form>
          </motion.div>

          {/* Results Panel */}
          <motion.div 
            initial={{ x: 20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            className="lg:col-span-7"
          >
            <AnimatePresence mode="wait">
              {!result && !isLoading && !error && (
                <motion.div 
                  initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                  className="h-full flex flex-col items-center justify-center p-12 text-center glass-panel"
                >
                  <div className="w-20 h-20 bg-slate-100 rounded-full flex items-center justify-center mb-6">
                    <Zap className="w-10 h-10 text-slate-400" />
                  </div>
                  <h3 className="text-xl font-semibold text-slate-700 mb-2">Ready to Optimize</h3>
                  <p className="text-slate-500 max-w-md">Provide your process details on the left, and our AI Copilot will generate a structured Lean & Automation transformation plan.</p>
                </motion.div>
              )}

              {isLoading && (
                <motion.div 
                  initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                  className="h-full flex flex-col items-center justify-center p-12 text-center glass-panel"
                >
                  <div className="relative w-24 h-24 mb-6">
                    <div className="absolute inset-0 border-4 border-brand-200 rounded-full"></div>
                    <div className="absolute inset-0 border-4 border-brand-500 rounded-full border-t-transparent animate-spin"></div>
                    <Zap className="w-8 h-8 text-brand-500 absolute inset-0 m-auto animate-pulse" />
                  </div>
                  <h3 className="text-xl font-semibold text-slate-700 animate-pulse">Running LCEL Prompt Chain...</h3>
                  <p className="text-slate-500 mt-2">Analyzing waste, mapping standardization, and finding AI opportunities.</p>
                </motion.div>
              )}

              {error && (
                <motion.div 
                  initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                  className="h-full flex flex-col items-center justify-center p-12 text-center glass-panel border-red-200 bg-red-50/50"
                >
                  <div className="text-red-500 text-lg font-semibold mb-2">Analysis Failed</div>
                  <div className="text-slate-600">{error}</div>
                </motion.div>
              )}

              {result && !isLoading && (
                <motion.div 
                  initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
                  className="space-y-6"
                >
                  <div className="flex gap-4">
                    <div className="glass-panel p-6 flex-1 flex items-center justify-between">
                      <div>
                        <div className="text-sm font-semibold text-slate-500 mb-1 uppercase tracking-wider">Impact Score</div>
                        <div className="text-3xl font-extrabold text-slate-900">{result.overall_impact_score}<span className="text-lg text-slate-400">/10</span></div>
                      </div>
                      <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                        <Activity className="w-6 h-6 text-green-600" />
                      </div>
                    </div>
                    <div className="glass-panel p-6 flex-1 flex items-center justify-between">
                      <div>
                        <div className="text-sm font-semibold text-slate-500 mb-1 uppercase tracking-wider">Est. Effort</div>
                        <div className="text-2xl font-extrabold text-slate-900">{result.estimated_effort}</div>
                      </div>
                      <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                        <CheckCircle2 className="w-6 h-6 text-blue-600" />
                      </div>
                    </div>
                  </div>

                  <div className="glass-panel overflow-hidden">
                    
                    {/* Section 1 */}
                    <div className="p-6 border-b border-slate-100">
                      <h3 className="text-lg font-bold text-slate-800 flex items-center mb-4">
                        <RefreshCw className="w-5 h-5 text-brand-500 mr-2" />
                        Process Simplification
                      </h3>
                      <ul className="space-y-3">
                        {result.process_simplification.map((item, i) => (
                          <li key={i} className="flex items-start">
                            <ChevronRight className="w-5 h-5 text-brand-400 mr-2 flex-shrink-0 mt-0.5" />
                            <span className="text-slate-700">{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Section 2 */}
                    <div className="p-6 border-b border-slate-100 bg-slate-50/50">
                      <h3 className="text-lg font-bold text-slate-800 flex items-center mb-4">
                        <CheckCircle2 className="w-5 h-5 text-green-500 mr-2" />
                        Standardization Opportunities
                      </h3>
                      <ul className="space-y-3">
                        {result.process_standardization.map((item, i) => (
                          <li key={i} className="flex items-start">
                            <ChevronRight className="w-5 h-5 text-green-400 mr-2 flex-shrink-0 mt-0.5" />
                            <span className="text-slate-700">{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Section 3 */}
                    <div className="p-6 border-b border-slate-100">
                      <h3 className="text-lg font-bold text-slate-800 flex items-center mb-4">
                        <Cpu className="w-5 h-5 text-indigo-500 mr-2" />
                        Automation & AI Ideas
                      </h3>
                      <ul className="space-y-3">
                        {result.automation_and_ai.map((item, i) => (
                          <li key={i} className="flex items-start">
                            <ChevronRight className="w-5 h-5 text-indigo-400 mr-2 flex-shrink-0 mt-0.5" />
                            <span className="text-slate-700">{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Section 4 */}
                    <div className="p-6 bg-slate-50/50">
                      <h3 className="text-lg font-bold text-slate-800 flex items-center mb-4">
                        <Zap className="w-5 h-5 text-amber-500 mr-2" />
                        Continuous Improvement
                      </h3>
                      <ul className="space-y-3">
                        {result.improvement_opportunities.map((item, i) => (
                          <li key={i} className="flex items-start">
                            <ChevronRight className="w-5 h-5 text-amber-400 mr-2 flex-shrink-0 mt-0.5" />
                            <span className="text-slate-700">{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
