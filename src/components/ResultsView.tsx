import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Copy, Check, FileJson, Code } from 'lucide-react';

const ResultsView: React.FC = () => {
  const [copied, setCopied] = useState(false);
  const [viewMode, setViewMode] = useState<'raw' | 'table'>('raw');

  const dummyData = [
    { id: 1, name: "Elena Rostova", role: "Data Scientist", status: "Active" },
    { id: 2, name: "Marcus Chen", role: "Product Manager", status: "Inactive" },
    { id: 3, name: "Sarah Jenkins", role: "UX Designer", status: "Active" }
  ];

  const handleCopy = () => {
    navigator.clipboard.writeText(JSON.stringify(dummyData, null, 2));
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.4 }}
      className="mt-8"
    >
      <div className="glass-panel p-6 rounded-2xl">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-2">
            <FileJson size={18} className="text-[var(--accent-color)]" />
            <h3 className="font-semibold">Generated Output</h3>
          </div>

          <div className="flex items-center space-x-4">
            <div className="flex p-1 rounded-lg bg-black/5 dark:bg-white/5 border border-[var(--border-color)]">
              <button
                onClick={() => setViewMode('raw')}
                className={`p-1.5 rounded-md smooth-transition ${viewMode === 'raw' ? 'bg-white dark:bg-zinc-800 shadow-sm' : 'opacity-60 hover:opacity-100'}`}
                title="Raw JSON"
              >
                <Code size={16} />
              </button>
              <button
                onClick={() => setViewMode('table')}
                className={`p-1.5 rounded-md smooth-transition ${viewMode === 'table' ? 'bg-white dark:bg-zinc-800 shadow-sm' : 'opacity-60 hover:opacity-100'}`}
                title="Table View"
              >
                <FileJson size={16} />
              </button>
            </div>

            <button
              onClick={handleCopy}
              className="flex items-center space-x-2 px-3 py-1.5 rounded-lg bg-black/5 dark:bg-white/5 border border-[var(--border-color)] hover:bg-[var(--accent-color)] hover:text-white hover:border-transparent smooth-transition group"
            >
              <AnimatePresence mode="wait">
                {copied ? (
                  <motion.div
                    key="check"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    exit={{ scale: 0 }}
                  >
                    <Check size={14} className="text-green-500 group-hover:text-white" />
                  </motion.div>
                ) : (
                  <motion.div
                    key="copy"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    exit={{ scale: 0 }}
                  >
                    <Copy size={14} />
                  </motion.div>
                )}
              </AnimatePresence>
              <span className="text-sm font-medium">{copied ? 'Copied!' : 'Copy'}</span>
            </button>
          </div>
        </div>

        <div className="relative overflow-hidden rounded-xl bg-black/5 dark:bg-white/5 border border-[var(--border-color)] group">
          <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>

          {viewMode === 'raw' ? (
            <pre className="p-4 text-sm font-mono overflow-x-auto text-[var(--accent-color)] dark:text-[#61dafb]">
              <code>{JSON.stringify(dummyData, null, 2)}</code>
            </pre>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-[var(--border-color)]">
                    {Object.keys(dummyData[0]).map((key) => (
                      <th key={key} className="p-3 text-xs font-medium opacity-70 uppercase tracking-wider">
                        {key}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {dummyData.map((row, i) => (
                    <tr key={i} className="border-b border-[var(--border-color)] last:border-0 hover:bg-black/5 dark:hover:bg-white/5 smooth-transition">
                      {Object.values(row).map((val: any, j) => (
                        <td key={j} className="p-3 text-sm">
                          {typeof val === 'string' && (val === 'Active' || val === 'Inactive') ? (
                            <span className={`px-2 py-1 rounded-full text-xs font-medium ${val === 'Active' ? 'bg-green-500/20 text-green-600 dark:text-green-400' : 'bg-red-500/20 text-red-600 dark:text-red-400'}`}>
                              {val}
                            </span>
                          ) : val}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default ResultsView;
