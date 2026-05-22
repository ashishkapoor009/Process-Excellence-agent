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
    <div className="min-h-screen bg-slate-50 py-12 px-4 sm:px-6 lg:px-8 font-sans">
      <div className="max-w-5xl mx-auto space-y-6">
        
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-blue-700 mb-2 flex items-center justify-center">
            ⚙️ Process Excellence Copilot
          </h1>
          <p className="text-lg text-slate-600">
            Analyze workflows, eliminate waste, and discover AI automation opportunities using Lean/Six Sigma principles.
          </p>
        </div>

        {/* Inputs section */}
        <div className="bg-white border border-slate-200 rounded-xl shadow-sm p-6">
          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-6">
              {/* Left Column */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-slate-800 border-b pb-2">📋 Process Details</h3>
                
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Process Name</label>
                  <input 
                    type="text" 
                    name="process_name"
                    required
                    value={formData.process_name}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 rounded-lg border border-slate-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="e.g., Health claims processing"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Target Goal</label>
                  <input 
                    type="text" 
                    name="target_goal"
                    required
                    value={formData.target_goal}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 rounded-lg border border-slate-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="e.g., Reduce claims processing time by 50%"
                  />
                </div>
              </div>

              {/* Right Column */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-slate-800 border-b pb-2">🔄 Current State</h3>
                
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Current Workflow Steps</label>
                  <textarea 
                    name="workflow_steps"
                    required
                    rows="3"
                    value={formData.workflow_steps}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 rounded-lg border border-slate-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="e.g., 1. Receive claim 2. Data entry 3. Verification..."
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Known Pain Points / Bottlenecks</label>
                  <textarea 
                    name="pain_points"
                    required
                    rows="2"
                    value={formData.pain_points}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 rounded-lg border border-slate-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="e.g., Manual verification takes too long and causes backlog."
                  />
                </div>
              </div>
            </div>

            <button 
              type="submit" 
              disabled={isLoading}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-4 rounded-lg shadow-sm transition-colors disabled:opacity-50 flex items-center justify-center text-lg"
            >
              {isLoading ? (
                <><Loader2 className="w-5 h-5 mr-2 animate-spin" /> Analyzing Process...</>
              ) : (
                "Analyze Process & Generate Plan ✨"
              )}
            </button>
          </form>
        </div>

        {/* Results Section */}
        <div className="bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden">
          <div className="bg-slate-50 px-6 py-4 border-b border-slate-200 flex items-center cursor-pointer">
            <h3 className="text-lg font-medium text-slate-800 flex-1">Transformation Plan Output</h3>
          </div>
          <div className="p-6">
            <AnimatePresence mode="wait">
              {!result && !isLoading && !error && (
                <div className="text-slate-500 italic">
                  *Your transformation plan will appear here...*
                </div>
              )}

              {isLoading && (
                <div className="flex flex-col items-center justify-center py-8 text-blue-600">
                  <Loader2 className="w-8 h-8 animate-spin mb-2" />
                  <p>Running Prompt Chain...</p>
                </div>
              )}

              {error && (
                <div className="text-red-600 bg-red-50 p-4 rounded-lg">
                  <strong>Analysis Failed:</strong> {error}
                </div>
              )}

              {result && !isLoading && (
                <motion.div 
                  initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
                  className="space-y-6 prose prose-slate max-w-none"
                >
                  <div className="border-b pb-4">
                    <h2 className="text-2xl font-bold flex items-center mb-4">
                      🚀 Process Transformation Plan
                    </h2>
                    <p className="text-lg mb-1">
                      <strong>Business Impact:</strong> {"🔵".repeat(result.overall_impact_score)}{"⚪".repeat(10 - result.overall_impact_score)} ({result.overall_impact_score}/10)
                    </p>
                    <p className="text-lg">
                      <strong>Estimated Effort:</strong> {result.estimated_effort}
                    </p>
                  </div>

                  <div>
                    <h3 className="text-xl font-bold flex items-center mb-3 text-slate-800">
                      🔍 Identified Inefficiencies & Waste (Simplification)
                    </h3>
                    <ul className="list-disc pl-5 space-y-1">
                      {result.process_simplification.map((item, i) => (
                        <li key={i}>{item}</li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <h3 className="text-xl font-bold flex items-center mb-3 text-slate-800">
                      🛠️ Lean / Six Sigma Recommendations (Standardization)
                    </h3>
                    <ul className="list-disc pl-5 space-y-1">
                      {result.process_standardization.map((item, i) => (
                        <li key={i}>{item}</li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <h3 className="text-xl font-bold flex items-center mb-3 text-slate-800">
                      🤖 AI & Automation Opportunities
                    </h3>
                    <ul className="list-disc pl-5 space-y-1">
                      {result.automation_and_ai.map((item, i) => (
                        <li key={i}>{item}</li>
                      ))}
                    </ul>
                  </div>

                  <div className="bg-slate-50 p-4 rounded-lg border">
                    <h3 className="text-lg font-bold mb-2">📈 Expected Business Impact / Continuous Improvement</h3>
                    <ul className="list-disc pl-5 space-y-1">
                      {result.improvement_opportunities.map((item, i) => (
                        <li key={i}>{item}</li>
                      ))}
                    </ul>
                  </div>

                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  );
}
