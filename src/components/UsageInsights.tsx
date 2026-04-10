import React from 'react';
import { motion } from 'framer-motion';
import { Activity, Database, Cpu, HardDrive } from 'lucide-react';

// Pre-generate random history data outside to avoid React purity warnings
const mockHistoryData = Array.from({ length: 40 }, () => Math.floor(Math.random() * 100));

const UsageInsights: React.FC = () => {
  // Mock data for the dashboard
  const totalTokens = 1245920;
  const promptTokens = 980100;
  const completionTokens = 265820;

  const historyData = mockHistoryData;

  const models = [
    { name: 'Llama-3-8B-Instruct', tokens: 650000, color: 'bg-emerald-500' },
    { name: 'Mistral-7B-v0.2', tokens: 320000, color: 'bg-blue-500' },
    { name: 'GPT-4-Turbo', tokens: 180000, color: 'bg-purple-500' },
    { name: 'Claude-3-Haiku', tokens: 95920, color: 'bg-orange-500' },
  ];

  const maxModelTokens = Math.max(...models.map(m => m.tokens));

  return (
    <div className="flex flex-col min-h-full space-y-6 pb-12 font-mono text-sm">
      <div className="flex flex-col space-y-2 font-sans">
        <h1 className="text-3xl font-bold tracking-tight">Usage Insights</h1>
        <p className="text-sm opacity-70">Monitor token consumption and resource allocation across models.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

        {/* Panel 1: Overview */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="solid-panel p-5 flex flex-col space-y-4"
        >
          <div className="flex items-center space-x-2 border-b border-[var(--border-color)] pb-2 mb-2">
            <Cpu size={16} className="text-[var(--accent-color)]" />
            <h2 className="font-bold uppercase tracking-wider text-xs">Global Token Usage</h2>
          </div>

          <div className="flex justify-between items-end">
            <div>
              <div className="text-xs opacity-60 uppercase mb-1">Total Processed</div>
              <div className="text-4xl font-light">{totalTokens.toLocaleString()}</div>
            </div>
            <div className="text-right">
              <div className="text-xs opacity-60 uppercase mb-1">Estimated Cost</div>
              <div className="text-xl text-[var(--accent-color)]">~$4.20</div>
            </div>
          </div>

          <div className="space-y-3 mt-4">
            <div>
              <div className="flex justify-between text-xs mb-1">
                <span>Prompt ({(promptTokens/totalTokens*100).toFixed(1)}%)</span>
                <span>{promptTokens.toLocaleString()}</span>
              </div>
              <div className="h-2 w-full bg-black/10 dark:bg-white/10 rounded-full overflow-hidden">
                <div className="h-full bg-[var(--accent-color)]" style={{ width: `${(promptTokens/totalTokens)*100}%` }}></div>
              </div>
            </div>
            <div>
              <div className="flex justify-between text-xs mb-1">
                <span>Completion ({(completionTokens/totalTokens*100).toFixed(1)}%)</span>
                <span>{completionTokens.toLocaleString()}</span>
              </div>
              <div className="h-2 w-full bg-black/10 dark:bg-white/10 rounded-full overflow-hidden">
                <div className="h-full bg-blue-500 opacity-80" style={{ width: `${(completionTokens/totalTokens)*100}%` }}></div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Panel 2: Context Window (RAM style) */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="solid-panel p-5 flex flex-col space-y-4"
        >
          <div className="flex items-center space-x-2 border-b border-[var(--border-color)] pb-2 mb-2">
            <HardDrive size={16} className="text-[var(--accent-color)]" />
            <h2 className="font-bold uppercase tracking-wider text-xs">Context Buffer (Latest Session)</h2>
          </div>

          <div className="flex justify-between items-end mb-2">
            <div>
              <div className="text-3xl font-light">3.2k<span className="text-sm opacity-50">/8k</span></div>
              <div className="text-xs opacity-60 uppercase mt-1">Tokens in Memory</div>
            </div>
            <div className="text-right opacity-80">
              40% Used
            </div>
          </div>

          <div className="flex h-12 gap-1 items-end mt-4">
            {Array.from({ length: 20 }).map((_, i) => {
              const isUsed = i < 8;
              const isWarning = i >= 6 && i < 8;
              return (
                <div
                  key={i}
                  className={`flex-1 rounded-sm ${
                    isUsed
                      ? isWarning
                        ? 'bg-yellow-500/80 h-full'
                        : 'bg-[var(--accent-color)] h-full'
                      : 'bg-black/5 dark:bg-white/5 h-1/3'
                  }`}
                />
              )
            })}
          </div>
          <div className="flex justify-between text-[10px] opacity-50 uppercase mt-1">
            <span>0</span>
            <span>4k</span>
            <span>8k</span>
          </div>
        </motion.div>

        {/* Panel 3: History Graph (Network style) */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="solid-panel p-5 flex flex-col space-y-4 col-span-1 lg:col-span-2"
        >
          <div className="flex items-center space-x-2 border-b border-[var(--border-color)] pb-2 mb-2">
            <Activity size={16} className="text-[var(--accent-color)]" />
            <h2 className="font-bold uppercase tracking-wider text-xs">Throughput History (Last 24h)</h2>
          </div>

          <div className="relative h-32 flex items-end gap-[2px] pt-4">
            {historyData.map((val, i) => (
              <div
                key={i}
                className="relative group flex-1 bg-[var(--accent-color)] opacity-60 hover:opacity-100 smooth-transition rounded-t-sm"
                style={{ height: `${val}%` }}
              >
                <div className="opacity-0 group-hover:opacity-100 absolute bottom-full mb-2 bg-[var(--card-bg)] border border-[var(--border-color)] p-1 text-xs rounded pointer-events-none transform -translate-x-1/2 left-1/2 z-10 whitespace-nowrap shadow-sm smooth-transition">
                  {val * 124} t/s
                </div>
              </div>
            ))}

            {/* Horizontal grid lines */}
            <div className="absolute inset-0 pointer-events-none flex flex-col justify-between border-l border-b border-[var(--border-color)]">
              <div className="w-full border-t border-[var(--border-color)] opacity-30"></div>
              <div className="w-full border-t border-[var(--border-color)] opacity-30"></div>
              <div className="w-full border-t border-[var(--border-color)] opacity-30"></div>
              <div className="w-full border-t border-[var(--border-color)] opacity-30"></div>
            </div>
          </div>
        </motion.div>

        {/* Panel 4: Process List / Model Breakdown */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="solid-panel p-5 flex flex-col space-y-4 col-span-1 lg:col-span-2"
        >
          <div className="flex items-center space-x-2 border-b border-[var(--border-color)] pb-2 mb-2">
            <Database size={16} className="text-[var(--accent-color)]" />
            <h2 className="font-bold uppercase tracking-wider text-xs">Model Breakdown</h2>
          </div>

          <div className="w-full overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-[var(--border-color)] opacity-60 text-xs uppercase">
                  <th className="pb-2 font-normal">Model</th>
                  <th className="pb-2 font-normal text-right">Tokens</th>
                  <th className="pb-2 font-normal w-1/2 pl-4">Usage Share</th>
                </tr>
              </thead>
              <tbody>
                {models.map((model, i) => (
                  <tr key={i} className="border-b border-[var(--border-color)] border-opacity-30 hover:bg-black/5 dark:hover:bg-white/5 smooth-transition">
                    <td className="py-3 font-medium">{model.name}</td>
                    <td className="py-3 text-right">{model.tokens.toLocaleString()}</td>
                    <td className="py-3 pl-4">
                      <div className="flex items-center space-x-2">
                        <div className="h-2 flex-1 bg-black/10 dark:bg-white/10 rounded-full overflow-hidden">
                          <div className={`h-full ${model.color}`} style={{ width: `${(model.tokens / maxModelTokens) * 100}%` }}></div>
                        </div>
                        <span className="text-xs opacity-60 w-10 text-right">
                          {((model.tokens / totalTokens) * 100).toFixed(1)}%
                        </span>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </motion.div>

      </div>
    </div>
  );
};

export default UsageInsights;
