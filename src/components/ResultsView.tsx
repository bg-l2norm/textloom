import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Copy, Check, FileJson, Code } from 'lucide-react';
import SpotlightCard from './SpotlightCard';

const ResultsView: React.FC = () => {
  const [copied, setCopied] = useState(false);
  const [viewMode, setViewMode] = useState<'raw' | 'table'>('raw');

  const dummyData = [
    {
      id: 1,
      input: "How do I implement a custom hook for window size in React?",
      discovered_steps: "1. Define state for width and height. 2. Create effect to add resize listener. 3. Update state on resize. 4. Cleanup listener.",
      output: "```javascript\nimport { useState, useEffect } from 'react';\n\nfunction useWindowSize() {\n  const [size, setSize] = useState([window.innerWidth, window.innerHeight]);\n  // ...\n}\n```"
    },
    {
      id: 2,
      input: "Explain the difference between useMemo and useCallback.",
      discovered_steps: "1. Define useMemo as caching a value. 2. Define useCallback as caching a function. 3. Provide an example of each. 4. Explain when to use them.",
      output: "useMemo is used to memoize the result of a calculation. It returns a memoized value.\n\nuseCallback is used to memoize a function itself. It returns a memoized callback."
    },
    {
      id: 3,
      input: "What are React Server Components?",
      discovered_steps: "1. Define what they are (run only on server). 2. Contrast with Client Components. 3. List benefits (smaller bundles, direct DB access).",
      output: "React Server Components allow you to write UI that can be rendered and optionally cached on the server. Unlike Client Components, they never send JavaScript to the browser."
    }
  ];

  const handleCopy = async () => {
    const text = JSON.stringify(dummyData, null, 2);
    try {
      await navigator.clipboard.writeText(text);
    } catch (err) {
      console.warn("Clipboard API failed, using fallback.", err);
      const textArea = document.createElement("textarea");
      textArea.value = text;
      textArea.style.position = "fixed";
      textArea.style.left = "-999999px";
      textArea.style.top = "-999999px";
      document.body.appendChild(textArea);
      textArea.focus();
      textArea.select();
      try {
        document.execCommand('copy');
      } catch (e) {
        console.error("Fallback copy failed", e);
      }
      textArea.remove();
    }
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.4, type: "spring", stiffness: 400, damping: 40 }}
      className="mt-8"
    >
      <SpotlightCard className="p-6 rounded-2xl">
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
          {viewMode === 'raw' ? (
            <pre className="p-4 text-sm font-mono overflow-x-auto text-[var(--accent-color)] dark:text-[#61dafb]">
              <code>{JSON.stringify(dummyData, null, 2)}</code>
            </pre>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-[var(--border-color)]">
                    {dummyData.length > 0 && Object.keys(dummyData[0]).map((key) => (
                      <th key={key} className="p-3 text-xs font-medium opacity-70 uppercase tracking-wider">
                        {key}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {dummyData.map((row, i) => (
                    <motion.tr
                      key={i}
                      whileHover={{ backgroundColor: "rgba(0,0,0,0.02)" }}
                      className="border-b border-[var(--border-color)] last:border-0 dark:hover:bg-white/5 smooth-transition"
                    >
                      {Object.entries(row).map(([key, val], j) => (
                        <td key={j} className={`p-3 text-sm ${key !== 'id' ? 'min-w-[200px] max-w-xs align-top' : ''}`}>
                          {key !== 'id' ? (
                            <div className="line-clamp-3 hover:line-clamp-none smooth-transition text-xs opacity-80 bg-black/5 dark:bg-white/5 p-2 rounded">
                              {val as React.ReactNode}
                            </div>
                          ) : (
                            <span className="font-mono text-xs opacity-50">{val as React.ReactNode}</span>
                          )}
                        </td>
                      ))}
                    </motion.tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </SpotlightCard>
    </motion.div>
  );
};

export default ResultsView;
