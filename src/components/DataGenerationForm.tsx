import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Sliders, Cpu, Zap, GitBranch, ShieldCheck, RefreshCw, Settings, Database } from 'lucide-react';
import SpotlightCard from './SpotlightCard';

const DataGenerationForm: React.FC = () => {
  const [modelType, setModelType] = useState<'local' | 'api'>('local');
  const [temperature, setTemperature] = useState(0.7);
  const [pipelineStrategy, setPipelineStrategy] = useState<'standard' | 'hierarchical'>('hierarchical');
  const [rowCount, setRowCount] = useState(1000);

  const [recursiveCategorization, setRecursiveCategorization] = useState(true);
  const [curatorStudent, setCuratorStudent] = useState(true);
  const [diversityLoss, setDiversityLoss] = useState(true);
  const [closedFeedback, setClosedFeedback] = useState(true);

  return (
    <div className="grid grid-cols-1 xl:grid-cols-3 gap-8 h-full">
      {/* Main Form Area */}
      <div className="xl:col-span-2 space-y-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, type: "spring", stiffness: 400, damping: 40 }}
        >
          <SpotlightCard className="p-6 rounded-2xl">
          <div className="mb-4">
            <label className="block text-sm font-medium opacity-80 mb-2">Prompt Instruction</label>
            <textarea
              className="w-full h-32 p-4 rounded-xl bg-black/5 dark:bg-white/5 border border-[var(--border-color)] focus:outline-none focus:ring-2 focus:ring-[var(--accent-color)] smooth-transition resize-none placeholder-opacity-50"
              placeholder="E.g., Generate a list of 10 fictional user profiles with names, emails, and job titles..."
            ></textarea>
          </div>

          <div>
            <label className="block text-sm font-medium opacity-80 mb-2">JSON Schema (Optional)</label>
            <div className="relative group">
              <textarea
                className="relative w-full h-48 p-4 rounded-xl bg-black/5 dark:bg-white/5 border border-[var(--border-color)] focus:outline-none focus:ring-2 focus:ring-[var(--accent-color)] font-mono text-sm smooth-transition resize-none"
                placeholder={`{\n  "type": "object",\n  "properties": {\n    "name": { "type": "string" }\n  }\n}`}
              ></textarea>
            </div>
          </div>
          </SpotlightCard>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15, type: "spring", stiffness: 400, damping: 40 }}
        >
          <SpotlightCard className="p-6 rounded-2xl">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-2">
                <Database size={18} className="text-[var(--accent-color)]" />
                <h3 className="font-semibold">Dataset Sizing</h3>
              </div>
            </div>

            <div>
              <div className="flex justify-between text-sm mb-2">
                <span className="opacity-80">Target Row Count</span>
                <span className="font-mono font-medium">{rowCount.toLocaleString()}</span>
              </div>
              <input
                type="range"
                min="100" max="10000" step="100"
                value={rowCount}
                onChange={(e) => setRowCount(parseInt(e.target.value))}
                className="w-full h-1.5 bg-black/10 dark:bg-white/10 rounded-lg appearance-none cursor-pointer accent-[var(--accent-color)]"
              />
              <div className="flex justify-between text-xs opacity-50 mt-1">
                <span>100</span>
                <span>10,000+</span>
              </div>
            </div>
          </SpotlightCard>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, type: "spring", stiffness: 400, damping: 40 }}
          className="flex justify-end"
        >
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="flex items-center space-x-2 px-8 py-3 rounded-xl bg-[var(--accent-color)] hover:bg-[var(--accent-hover)] text-white font-medium shadow-lg shadow-[var(--accent-color)]/30 smooth-transition"
          >
            <Zap size={18} className="fill-current" />
            <span>Generate Data</span>
          </motion.button>
        </motion.div>
      </div>

      {/* Configuration Sidebar */}
      <motion.div
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.3, type: "spring", stiffness: 400, damping: 40 }}
        className="space-y-6"
      >
        <SpotlightCard className="p-6 rounded-2xl">
          <div className="flex items-center space-x-2 mb-6">
            <Cpu size={18} className="text-[var(--accent-color)]" />
            <h3 className="font-semibold">Model Configuration</h3>
          </div>

          <div className="space-y-6">
            {/* Model Toggle */}
            <div>
              <div className="flex p-1 rounded-lg bg-black/5 dark:bg-white/5 border border-[var(--border-color)]">
                <button
                  onClick={() => setModelType('local')}
                  className={`flex-1 py-1.5 text-sm font-medium rounded-md smooth-transition ${modelType === 'local' ? 'bg-white dark:bg-zinc-800 shadow-sm' : 'opacity-60 hover:opacity-100'}`}
                >
                  Local
                </button>
                <button
                  onClick={() => setModelType('api')}
                  className={`flex-1 py-1.5 text-sm font-medium rounded-md smooth-transition ${modelType === 'api' ? 'bg-white dark:bg-zinc-800 shadow-sm' : 'opacity-60 hover:opacity-100'}`}
                >
                  API
                </button>
              </div>
            </div>

            {/* Model Select */}
            <div>
              <label className="block text-xs font-medium opacity-70 mb-1.5">Select Model</label>
              <select className="w-full p-2.5 rounded-lg bg-black/5 dark:bg-white/5 border border-[var(--border-color)] focus:outline-none focus:ring-2 focus:ring-[var(--accent-color)] text-sm appearance-none cursor-pointer">
                {modelType === 'local' ? (
                  <>
                    <option>Llama 3 (8B)</option>
                    <option>Mistral v0.2</option>
                    <option>Phi-3 Mini</option>
                  </>
                ) : (
                  <>
                    <option>GPT-4o</option>
                    <option>Claude 3.5 Sonnet</option>
                    <option>Gemini 1.5 Pro</option>
                  </>
                )}
              </select>
            </div>

            {/* Advanced Settings */}
            <div className="pt-4 border-t border-[var(--border-color)]">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-2">
                  <Sliders size={16} className="opacity-70" />
                  <span className="text-sm font-medium">Parameters</span>
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <div className="flex justify-between text-xs mb-1">
                    <span className="opacity-70">Temperature</span>
                    <span className="font-mono">{temperature}</span>
                  </div>
                  <input
                    type="range"
                    min="0" max="2" step="0.1"
                    value={temperature}
                    onChange={(e) => setTemperature(parseFloat(e.target.value))}
                    className="w-full h-1.5 bg-black/10 dark:bg-white/10 rounded-lg appearance-none cursor-pointer accent-[var(--accent-color)]"
                  />
                </div>

                <div>
                  <div className="flex justify-between text-xs mb-1">
                    <span className="opacity-70">Max Tokens</span>
                    <span className="font-mono">2048</span>
                  </div>
                  <input
                    type="range"
                    min="100" max="8000" step="100"
                    defaultValue="2048"
                    className="w-full h-1.5 bg-black/10 dark:bg-white/10 rounded-lg appearance-none cursor-pointer accent-[var(--accent-color)]"
                  />
                </div>
              </div>
            </div>
          </div>
        </SpotlightCard>

        <SpotlightCard className="p-6 rounded-2xl mt-6">
          <div className="flex items-center space-x-2 mb-6">
            <GitBranch size={18} className="text-[var(--accent-color)]" />
            <h3 className="font-semibold">Pipeline Strategy</h3>
          </div>

          <div className="space-y-6">
            {/* Strategy Toggle */}
            <div>
              <div className="flex p-1 rounded-lg bg-black/5 dark:bg-white/5 border border-[var(--border-color)] mb-4">
                <button
                  onClick={() => setPipelineStrategy('standard')}
                  className={`flex-1 py-1.5 text-sm font-medium rounded-md smooth-transition ${pipelineStrategy === 'standard' ? 'bg-white dark:bg-zinc-800 shadow-sm' : 'opacity-60 hover:opacity-100'}`}
                >
                  Standard
                </button>
                <button
                  onClick={() => setPipelineStrategy('hierarchical')}
                  className={`flex-1 py-1.5 text-sm font-medium rounded-md smooth-transition ${pipelineStrategy === 'hierarchical' ? 'bg-white dark:bg-zinc-800 shadow-sm' : 'opacity-60 hover:opacity-100'}`}
                >
                  Hierarchical
                </button>
              </div>
              <p className="text-xs opacity-70 leading-relaxed">
                {pipelineStrategy === 'hierarchical'
                  ? 'Advanced multi-agent generation for large-scale finetuning datasets (1000+ rows) with diversity controls.'
                  : 'Straightforward generation for small, quick tests.'}
              </p>
            </div>

            {/* Hierarchical Settings */}
            {pipelineStrategy === 'hierarchical' && (
              <div className="pt-4 border-t border-[var(--border-color)] space-y-3">
                <label className="flex items-start space-x-3 cursor-pointer group">
                  <div className="relative flex items-center justify-center mt-0.5">
                    <input type="checkbox" checked={recursiveCategorization} onChange={(e) => setRecursiveCategorization(e.target.checked)} className="peer sr-only" />
                    <div className="w-4 h-4 border border-[var(--border-color)] rounded bg-black/5 dark:bg-white/5 peer-checked:bg-[var(--accent-color)] peer-checked:border-[var(--accent-color)] smooth-transition"></div>
                    <CheckIcon className={`absolute w-3 h-3 text-white pointer-events-none smooth-transition ${recursiveCategorization ? 'opacity-100 scale-100' : 'opacity-0 scale-50'}`} />
                  </div>
                  <div>
                    <span className="text-sm font-medium block">Recursive Categorization</span>
                    <span className="text-xs opacity-60">Build taxonomy before generating</span>
                  </div>
                </label>

                <label className="flex items-start space-x-3 cursor-pointer group">
                  <div className="relative flex items-center justify-center mt-0.5">
                    <input type="checkbox" checked={curatorStudent} onChange={(e) => setCuratorStudent(e.target.checked)} className="peer sr-only" />
                    <div className="w-4 h-4 border border-[var(--border-color)] rounded bg-black/5 dark:bg-white/5 peer-checked:bg-[var(--accent-color)] peer-checked:border-[var(--accent-color)] smooth-transition"></div>
                    <CheckIcon className={`absolute w-3 h-3 text-white pointer-events-none smooth-transition ${curatorStudent ? 'opacity-100 scale-100' : 'opacity-0 scale-50'}`} />
                  </div>
                  <div>
                    <div className="flex items-center space-x-1">
                      <ShieldCheck size={14} className="text-[var(--accent-color)]" />
                      <span className="text-sm font-medium block">Curator / Student Pipeline</span>
                    </div>
                    <span className="text-xs opacity-60">Validates and refines generation steps</span>
                  </div>
                </label>

                <label className="flex items-start space-x-3 cursor-pointer group">
                  <div className="relative flex items-center justify-center mt-0.5">
                    <input type="checkbox" checked={diversityLoss} onChange={(e) => setDiversityLoss(e.target.checked)} className="peer sr-only" />
                    <div className="w-4 h-4 border border-[var(--border-color)] rounded bg-black/5 dark:bg-white/5 peer-checked:bg-[var(--accent-color)] peer-checked:border-[var(--accent-color)] smooth-transition"></div>
                    <CheckIcon className={`absolute w-3 h-3 text-white pointer-events-none smooth-transition ${diversityLoss ? 'opacity-100 scale-100' : 'opacity-0 scale-50'}`} />
                  </div>
                  <div>
                    <div className="flex items-center space-x-1">
                      <RefreshCw size={14} className="text-[var(--accent-color)]" />
                      <span className="text-sm font-medium block">Diversity Loss Prevention</span>
                    </div>
                    <span className="text-xs opacity-60">Enforce embedding distance variance</span>
                  </div>
                </label>

                <label className="flex items-start space-x-3 cursor-pointer group">
                  <div className="relative flex items-center justify-center mt-0.5">
                    <input type="checkbox" checked={closedFeedback} onChange={(e) => setClosedFeedback(e.target.checked)} className="peer sr-only" />
                    <div className="w-4 h-4 border border-[var(--border-color)] rounded bg-black/5 dark:bg-white/5 peer-checked:bg-[var(--accent-color)] peer-checked:border-[var(--accent-color)] smooth-transition"></div>
                    <CheckIcon className={`absolute w-3 h-3 text-white pointer-events-none smooth-transition ${closedFeedback ? 'opacity-100 scale-100' : 'opacity-0 scale-50'}`} />
                  </div>
                  <div>
                    <div className="flex items-center space-x-1">
                      <Settings size={14} className="text-[var(--accent-color)]" />
                      <span className="text-sm font-medium block">Closed-Feedback Edit</span>
                    </div>
                    <span className="text-xs opacity-60">Autonomously edit prompt configs</span>
                  </div>
                </label>
              </div>
            )}
          </div>
        </SpotlightCard>
      </motion.div>
    </div>
  );
};

// Helper component for custom checkboxes
const CheckIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <polyline points="20 6 9 17 4 12"></polyline>
  </svg>
);

export default DataGenerationForm;
