import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Sliders, Cpu, Zap, GitBranch, ShieldCheck, RefreshCw, Settings, Database, Cloud, Brain, Users, Network, Save } from 'lucide-react';
import SpotlightCard from './SpotlightCard';

const DataGenerationForm: React.FC = () => {
  const [modelType, setModelType] = useState<'local' | 'api'>('local');
  const [temperature, setTemperature] = useState(0.7);
  const [pipelineStrategy, setPipelineStrategy] = useState<'standard' | 'hierarchical'>('hierarchical');
  const [rowCount, setRowCount] = useState(1000);

  const [promptInstruction, setPromptInstruction] = useState('');
  const [jsonSchema, setJsonSchema] = useState('');
  const [maxTokens, setMaxTokens] = useState(2048);

  const [recursiveCategorization, setRecursiveCategorization] = useState(true);
  const [curatorStudent, setCuratorStudent] = useState(true);
  const [diversityLoss, setDiversityLoss] = useState(true);
  const [closedFeedback, setClosedFeedback] = useState(true);

  // New state variables for HF integration and roles/memory
  const [hfDatasetUrl, setHfDatasetUrl] = useState('');
  const [isDatasetLinked, setIsDatasetLinked] = useState(false);
  const [datasetScenario, setDatasetScenario] = useState('Read columns: input, output. Generate 100 new synthetic variations maintaining the same tone but switching to a sci-fi context. Reverse prompt from output if input is missing.');

  const [activeRole, setActiveRole] = useState<'orchestrator' | 'curator' | 'student'>('orchestrator');
  const [roleMemories, setRoleMemories] = useState({
    orchestrator: '- Current objective: Expanding math reasoning dataset.\n- Rule: Avoid repetitive phrasing in outputs.\n- Node mapping: Column \'question\' -> Node [Student Gen]\n- Auto-correction active: If output fails validation, retry with temperature 0.2',
    curator: '',
    student: ''
  });

  const [isLoadingDataset, setIsLoadingDataset] = useState(false);
  const [datasetError, setDatasetError] = useState('');

  const linkDataset = async () => {
    if (!hfDatasetUrl.trim()) return;

    if (isDatasetLinked) {
      // Unlink
      setIsDatasetLinked(false);
      return;
    }

    setIsLoadingDataset(true);
    setDatasetError('');

    try {
      // Parse out the dataset name, handling simple cases
      // E.g., 'HuggingFaceH4/instruction-dataset' or 'rotten_tomatoes'
      const datasetName = hfDatasetUrl.trim();

      // Attempt to fetch schema/columns
      const res = await fetch(`https://datasets-server.huggingface.co/info?dataset=${encodeURIComponent(datasetName)}`);

      if (!res.ok) {
        throw new Error(`Failed to fetch dataset info (Status: ${res.status})`);
      }

      const data = await res.json();

      if (data.error) {
        throw new Error(data.error);
      }

      // Extract columns
      const datasetInfo = data.dataset_info;
      if (!datasetInfo) throw new Error("No dataset info returned");

      // Get the first split/config
      const configKey = Object.keys(datasetInfo)[0];
      if (!configKey) throw new Error("No configs found in dataset");

      const features = datasetInfo[configKey].features;
      if (!features) throw new Error("No features found in dataset config");

      const columns = Object.keys(features);

      // Update the scenario text area with a smart default based on the columns
      setDatasetScenario(`Discovered columns: ${columns.join(', ')}.\n\nInstructions:\n1. Read existing rows.\n2. Using the available columns, generate 100 new synthetic variations.\n3. Reverse prompt from output if input is missing.`);
      setIsDatasetLinked(true);
    } catch (err: unknown) {
      console.error("Dataset linking error:", err);
      setDatasetError((err instanceof Error ? err.message : 'Failed to link dataset') + ' - Falling back to manual mapping.');
      setDatasetScenario('Unable to automatically fetch columns.\n\nInstructions:\n1. Manually map your dataset columns here.\n2. Provide specific generation rules.');
      setIsDatasetLinked(true);
    } finally {
      setIsLoadingDataset(false);
    }
  };

  return (
    <div className="grid grid-cols-1 xl:grid-cols-3 gap-8 items-start">
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
              value={promptInstruction}
              onChange={(e) => setPromptInstruction(e.target.value)}
            ></textarea>
          </div>

          <div>
            <label className="block text-sm font-medium opacity-80 mb-2">JSON Schema (Optional)</label>
            <div className="relative group">
              <textarea
                className="relative w-full h-48 p-4 rounded-xl bg-black/5 dark:bg-white/5 border border-[var(--border-color)] focus:outline-none focus:ring-2 focus:ring-[var(--accent-color)] font-mono text-sm smooth-transition resize-none"
                placeholder={`{\n  "type": "object",\n  "properties": {\n    "name": { "type": "string" }\n  }\n}`}
                value={jsonSchema}
                onChange={(e) => setJsonSchema(e.target.value)}
              ></textarea>
            </div>
          </div>
          </SpotlightCard>
        </motion.div>

        {/* Source Dataset Integration Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.12, type: "spring", stiffness: 400, damping: 40 }}
        >
          <SpotlightCard className="p-6 rounded-2xl">
            <div className="flex items-center space-x-2 mb-4">
              <Cloud size={18} className="text-[var(--accent-color)]" />
              <h3 className="font-semibold">HuggingFace Dataset Integration</h3>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium opacity-80 mb-2">Dataset ID or URL</label>
                <div className="flex space-x-2">
                  <input
                    type="text"
                    value={hfDatasetUrl}
                    onChange={(e) => setHfDatasetUrl(e.target.value)}
                    placeholder="e.g., cornell-movie-review-data/rotten_tomatoes"
                    className="flex-1 p-3 rounded-xl bg-black/5 dark:bg-white/5 border border-[var(--border-color)] focus:outline-none focus:ring-2 focus:ring-[var(--accent-color)] smooth-transition text-sm"
                  />
                  <button
                    onClick={linkDataset}
                    disabled={isLoadingDataset}
                    className={`px-4 py-2 rounded-xl text-sm font-medium smooth-transition ${isDatasetLinked ? 'bg-green-500/20 text-green-700 dark:text-green-400 border border-green-500/30' : 'bg-black/10 dark:bg-white/10 hover:bg-black/20 dark:hover:bg-white/20'} ${isLoadingDataset ? 'opacity-50 cursor-not-allowed' : ''}`}
                  >
                    {isLoadingDataset ? 'Linking...' : isDatasetLinked ? 'Linked' : 'Link Dataset'}
                  </button>
                </div>
                {datasetError && (
                  <p className="text-red-500 text-xs mt-2">{datasetError}</p>
                )}
              </div>

              {isDatasetLinked && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  className="pt-2"
                >
                  <label className="flex items-center justify-between text-sm font-medium opacity-80 mb-2">
                    <span>Soft-Coded Scenario & Column Mapping</span>
                    <span className="text-[10px] uppercase tracking-wider bg-black/10 dark:bg-white/10 px-2 py-0.5 rounded-full">LLM Editable</span>
                  </label>
                  <p className="text-xs opacity-60 mb-2 leading-relaxed">
                    Instruct the orchestrator on how to use the columns. This area is soft-coded; the AI can dynamically update these rules if it encounters errors or needs to adapt (e.g., reverse generation).
                  </p>
                  <textarea
                    value={datasetScenario}
                    onChange={(e) => setDatasetScenario(e.target.value)}
                    className="w-full h-32 p-4 rounded-xl bg-[var(--bg-color)] border border-[var(--border-color)] focus:outline-none focus:ring-2 focus:ring-[var(--accent-color)] smooth-transition resize-y text-sm font-mono opacity-90"
                    placeholder="E.g., Read 'input' and 'output' columns. If 'output' exists but 'input' is missing, run reverse-prompting agent..."
                  ></textarea>
                </motion.div>
              )}
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
                    <span className="font-mono">{maxTokens}</span>
                  </div>
                  <input
                    type="range"
                    min="100" max="8000" step="100"
                    value={maxTokens}
                    onChange={(e) => setMaxTokens(parseInt(e.target.value))}
                    className="w-full h-1.5 bg-black/10 dark:bg-white/10 rounded-lg appearance-none cursor-pointer accent-[var(--accent-color)]"
                  />
                </div>
              </div>
            </div>
          </div>
        </SpotlightCard>

        <SpotlightCard className="p-6 rounded-2xl mt-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-2">
              <Network size={18} className="text-[var(--accent-color)]" />
              <h3 className="font-semibold">Soft-Coded Roles & Memory</h3>
            </div>
          </div>

          <div className="space-y-4">
            <div className="p-3 rounded-xl bg-black/5 dark:bg-white/5 border border-[var(--border-color)]">
              <h4 className="text-xs font-semibold opacity-70 mb-3 uppercase tracking-wider">Dynamic Hierarchy</h4>
              <div className="space-y-2">
                <div
                  onClick={() => setActiveRole('orchestrator')}
                  className={`flex items-center space-x-2 text-sm p-1.5 rounded-lg cursor-pointer smooth-transition ${activeRole === 'orchestrator' ? 'bg-black/10 dark:bg-white/10 shadow-sm ring-1 ring-[var(--accent-color)]/50' : 'hover:bg-black/5 dark:hover:bg-white/5'}`}
                >
                  <Brain size={14} className="text-[var(--accent-color)]" />
                  <span className="font-medium">Orchestrator</span>
                  <span className="text-[10px] opacity-60">(Reads rules, routes tasks)</span>
                </div>
                <div className="pl-5 border-l border-black/10 dark:border-white/10 space-y-2 relative ml-2">
                  <div className="absolute top-0 -left-[1px] w-[1px] h-3 bg-black/20 dark:bg-white/20"></div>
                  <div
                    onClick={() => setActiveRole('curator')}
                    className={`flex items-center space-x-2 text-sm p-1.5 rounded-lg cursor-pointer smooth-transition ${activeRole === 'curator' ? 'bg-black/10 dark:bg-white/10 shadow-sm ring-1 ring-green-500/50' : 'hover:bg-black/5 dark:hover:bg-white/5'}`}
                  >
                    <ShieldCheck size={14} className="text-green-500" />
                    <span>Curator Node</span>
                  </div>
                  <div
                    onClick={() => setActiveRole('student')}
                    className={`flex items-center space-x-2 text-sm p-1.5 rounded-lg cursor-pointer smooth-transition ${activeRole === 'student' ? 'bg-black/10 dark:bg-white/10 shadow-sm ring-1 ring-blue-500/50' : 'hover:bg-black/5 dark:hover:bg-white/5'}`}
                  >
                    <Users size={14} className="text-blue-500" />
                    <span>Student / Gen Node</span>
                  </div>
                </div>
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="text-sm font-medium opacity-80">{activeRole.charAt(0).toUpperCase() + activeRole.slice(1)} Memory</label>
                <div className="flex space-x-1">
                  <button className="p-1 hover:bg-black/10 dark:hover:bg-white/10 rounded smooth-transition" title="Save Memory State">
                    <Save size={12} className="opacity-70" />
                  </button>
                  <button
                    onClick={() => setRoleMemories(prev => ({
                      ...prev,
                      [activeRole]: activeRole === 'orchestrator'
                        ? '- Current objective: Expanding math reasoning dataset.\n- Rule: Avoid repetitive phrasing in outputs.\n- Node mapping: Column \'question\' -> Node [Student Gen]\n- Auto-correction active: If output fails validation, retry with temperature 0.2'
                        : ''
                    }))}
                    className="p-1 hover:bg-black/10 dark:hover:bg-white/10 rounded smooth-transition"
                    title="Reset Memory"
                  >
                    <RefreshCw size={12} className="opacity-70" />
                  </button>
                </div>
              </div>
              <textarea
                value={roleMemories[activeRole]}
                onChange={(e) => setRoleMemories(prev => ({ ...prev, [activeRole]: e.target.value }))}
                className="w-full h-32 p-3 rounded-xl bg-[var(--bg-color)] border border-[var(--border-color)] focus:outline-none focus:ring-2 focus:ring-[var(--accent-color)] smooth-transition resize-y text-xs font-mono opacity-90 leading-relaxed"
                placeholder={`Memory area for the ${activeRole.charAt(0).toUpperCase() + activeRole.slice(1)} to store rules, state, and corrections...`}
              ></textarea>
              <p className="text-[10px] opacity-50 mt-1">
                This context is fluid and persists across generation batches. The LLM can edit this to self-correct.
              </p>
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
