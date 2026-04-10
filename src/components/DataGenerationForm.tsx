import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Sliders, Cpu, Zap } from 'lucide-react';

const DataGenerationForm: React.FC = () => {
  const [modelType, setModelType] = useState<'local' | 'api'>('local');
  const [temperature, setTemperature] = useState(0.7);

  return (
    <div className="grid grid-cols-1 xl:grid-cols-3 gap-8 h-full">
      {/* Main Form Area */}
      <div className="xl:col-span-2 space-y-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="glass-panel p-6 rounded-2xl"
        >
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
              <div className="absolute -inset-0.5 bg-gradient-to-r from-[var(--accent-color)] to-purple-500 rounded-xl blur opacity-20 group-hover:opacity-40 transition duration-500"></div>
              <textarea
                className="relative w-full h-48 p-4 rounded-xl bg-black/5 dark:bg-white/5 border border-[var(--border-color)] focus:outline-none focus:ring-2 focus:ring-[var(--accent-color)] font-mono text-sm smooth-transition resize-none"
                placeholder={`{\n  "type": "object",\n  "properties": {\n    "name": { "type": "string" }\n  }\n}`}
              ></textarea>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="flex justify-end"
        >
          <button className="flex items-center space-x-2 px-8 py-3 rounded-xl bg-[var(--accent-color)] hover:bg-[var(--accent-hover)] text-white font-medium shadow-lg shadow-[var(--accent-color)]/30 smooth-transition transform hover:scale-105 active:scale-95">
            <Zap size={18} className="fill-current" />
            <span>Generate Data</span>
          </button>
        </motion.div>
      </div>

      {/* Configuration Sidebar */}
      <motion.div
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.3 }}
        className="space-y-6"
      >
        <div className="glass-panel p-6 rounded-2xl">
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
        </div>
      </motion.div>
    </div>
  );
};

export default DataGenerationForm;
