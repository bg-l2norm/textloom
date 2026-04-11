import React from 'react';
import SpotlightCard from './SpotlightCard';

// Pre-calculate random values outside the component to avoid react-hooks/purity errors
const umapData1 = Array.from({ length: 40 }).map(() => ({
  left: 20 + Math.random() * 60,
  top: 20 + Math.random() * 60,
  scale: 0.5 + Math.random()
}));

const umapData2 = Array.from({ length: 20 }).map(() => ({
  left: 10 + Math.random() * 40,
  top: 50 + Math.random() * 40
}));

const heatmapData = Array.from({ length: 15 }).map(() => Math.random());

const ngramData = Array.from({ length: 16 }).map((_, i) => {
  const row = Math.floor(i / 4);
  const col = i % 4;
  const isDiag = row === col;
  return isDiag ? 0.9 : Math.random() * 0.4;
});

const confidenceData = Array.from({ length: 30 }).map(() => ({
  x: Math.random() * 90 + 5,
  y: Math.random() * 90 + 5
}));

const interventionData = Array.from({ length: 5 }).map(() => ({
  h1: Math.random() * 20 + 10,
  h2: Math.random() * 30 + 10,
  h3: Math.random() * 40 + 20
}));

const DatasetInsights: React.FC = () => {
  return (
    <div className="flex flex-col min-h-full space-y-6 pb-12 font-sans">
      <div className="flex flex-col space-y-2">
        <h1 className="text-3xl font-bold tracking-tight">Dataset Distribution Insights</h1>
        <p className="text-sm opacity-70">Deep dive into 25+ visual dimensions of your synthetic dataset. Analyze quality, diversity, and alignment.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">

        {/* 1. Sequence Length Distribution (Histogram) */}
        <SpotlightCard className="p-4 rounded-xl flex flex-col min-h-[200px]">
          <h3 className="text-xs font-semibold uppercase tracking-wider opacity-70 mb-4 border-b border-[var(--border-color)] pb-2">1. Sequence Lengths</h3>
          <div className="flex-1 flex items-end space-x-1 mt-2">
            {[4, 12, 25, 45, 60, 85, 100, 70, 40, 20, 10, 5].map((h, i) => (
              <div key={i} className="flex-1 bg-[var(--accent-color)] opacity-80 hover:opacity-100 rounded-t-sm" style={{ height: `${h}%` }}></div>
            ))}
          </div>
          <div className="flex justify-between text-[10px] opacity-50 mt-2">
            <span>0 tkns</span>
            <span>2048 tkns</span>
          </div>
        </SpotlightCard>

        {/* 2. Vocabulary Richness (Radial Gauge) */}
        <SpotlightCard className="p-4 rounded-xl flex flex-col items-center justify-center min-h-[200px]">
          <h3 className="w-full text-left text-xs font-semibold uppercase tracking-wider opacity-70 mb-4 border-b border-[var(--border-color)] pb-2">2. Vocab Richness</h3>
          <div className="relative w-24 h-24 mt-2">
            <svg viewBox="0 0 36 36" className="w-full h-full">
              <path d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="currentColor" strokeWidth="3" className="text-black/10 dark:text-white/10" strokeDasharray="100, 100" />
              <path d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="currentColor" strokeWidth="3" className="text-[var(--accent-color)]" strokeDasharray="82, 100" />
            </svg>
            <div className="absolute inset-0 flex items-center justify-center flex-col">
              <span className="text-xl font-bold">82</span>
              <span className="text-[8px] uppercase opacity-60">Score</span>
            </div>
          </div>
        </SpotlightCard>

        {/* 3. Semantic Diversity UMAP (Scatter Plot) */}
        <SpotlightCard className="p-4 rounded-xl flex flex-col min-h-[200px]">
          <h3 className="text-xs font-semibold uppercase tracking-wider opacity-70 mb-2 border-b border-[var(--border-color)] pb-2">3. Semantic UMAP</h3>
          <div className="flex-1 relative w-full h-full border border-[var(--border-color)] bg-black/5 dark:bg-white/5 rounded overflow-hidden mt-2">
            {umapData1.map((pos, i) => (
              <div key={i} className="absolute w-2 h-2 rounded-full bg-[var(--accent-color)] opacity-70"
                style={{
                  left: `${pos.left}%`,
                  top: `${pos.top}%`,
                  transform: `scale(${pos.scale})`
                }}
              ></div>
            ))}
             {umapData2.map((pos, i) => (
              <div key={i + 40} className="absolute w-2 h-2 rounded-full bg-blue-500 opacity-60"
                style={{
                  left: `${pos.left}%`,
                  top: `${pos.top}%`,
                }}
              ></div>
            ))}
          </div>
        </SpotlightCard>

        {/* 4. Task Category Distribution (Treemap Mock) */}
        <SpotlightCard className="p-4 rounded-xl flex flex-col min-h-[200px]">
          <h3 className="text-xs font-semibold uppercase tracking-wider opacity-70 mb-2 border-b border-[var(--border-color)] pb-2">4. Task Treemap</h3>
          <div className="flex-1 w-full flex flex-col gap-1 mt-2">
            <div className="flex w-full gap-1 h-1/2">
              <div className="bg-[var(--accent-color)] w-2/3 h-full rounded-sm opacity-80 flex items-center justify-center p-1"><span className="text-[10px] text-white truncate">Reasoning</span></div>
              <div className="bg-blue-500 w-1/3 h-full rounded-sm opacity-80 flex items-center justify-center p-1"><span className="text-[10px] text-white truncate">Coding</span></div>
            </div>
            <div className="flex w-full gap-1 h-1/2">
              <div className="flex flex-col w-1/2 gap-1 h-full">
                <div className="bg-emerald-500 w-full h-1/2 rounded-sm opacity-80 flex items-center justify-center p-1"><span className="text-[10px] text-white truncate">Writing</span></div>
                <div className="bg-purple-500 w-full h-1/2 rounded-sm opacity-80 flex items-center justify-center p-1"><span className="text-[10px] text-white truncate">Math</span></div>
              </div>
              <div className="bg-orange-500 w-1/2 h-full rounded-sm opacity-80 flex items-center justify-center p-1"><span className="text-[10px] text-white truncate">Extraction</span></div>
            </div>
          </div>
        </SpotlightCard>

        {/* 5. Prompt vs Completion Ratio (Stacked Bar) */}
        <SpotlightCard className="p-4 rounded-xl flex flex-col min-h-[200px]">
          <h3 className="text-xs font-semibold uppercase tracking-wider opacity-70 mb-4 border-b border-[var(--border-color)] pb-2">5. P/C Ratio</h3>
          <div className="flex-1 flex flex-col justify-center space-y-4">
             <div>
              <div className="flex justify-between text-[10px] mb-1"><span>Average</span><span>1 : 3.4</span></div>
              <div className="w-full h-4 rounded-full overflow-hidden flex">
                <div className="bg-zinc-400 h-full w-1/4"></div>
                <div className="bg-[var(--accent-color)] h-full w-3/4"></div>
              </div>
             </div>
             <div className="flex items-center space-x-4 text-xs">
                <div className="flex items-center space-x-1"><div className="w-3 h-3 bg-zinc-400 rounded-sm"></div><span>Prompt</span></div>
                <div className="flex items-center space-x-1"><div className="w-3 h-3 bg-[var(--accent-color)] rounded-sm"></div><span>Completion</span></div>
             </div>
          </div>
        </SpotlightCard>

        {/* 6. Toxicity / Safety Scores (Sparkline) */}
        <SpotlightCard className="p-4 rounded-xl flex flex-col min-h-[200px]">
          <h3 className="text-xs font-semibold uppercase tracking-wider opacity-70 mb-2 border-b border-[var(--border-color)] pb-2">6. Toxicity Risk</h3>
          <div className="flex-1 w-full flex items-end pb-2 relative">
             <svg className="w-full h-full" preserveAspectRatio="none" viewBox="0 0 100 100">
               <path d="M0,80 L10,75 L20,85 L30,60 L40,90 L50,80 L60,95 L70,85 L80,90 L90,80 L100,85" fill="none" stroke="currentColor" strokeWidth="2" className="text-red-500" />
               <line x1="0" y1="50" x2="100" y2="50" stroke="currentColor" strokeWidth="1" strokeDasharray="4 4" className="text-black/20 dark:text-white/20" />
             </svg>
             <div className="absolute top-2 right-2 text-xs font-mono text-green-500 bg-green-500/10 px-2 py-0.5 rounded">Safe 99.8%</div>
          </div>
        </SpotlightCard>

        {/* 7. Hallucination Risk (Heatmap Mock) */}
        <SpotlightCard className="p-4 rounded-xl flex flex-col min-h-[200px]">
          <h3 className="text-xs font-semibold uppercase tracking-wider opacity-70 mb-2 border-b border-[var(--border-color)] pb-2">7. Hallucination Heatmap</h3>
          <div className="flex-1 grid grid-cols-5 grid-rows-3 gap-1 mt-2">
            {heatmapData.map((intensity, i) => (
              <div key={i} className="rounded-sm" style={{ backgroundColor: `rgba(217, 119, 87, ${intensity * 0.8 + 0.1})` }}></div>
            ))}
          </div>
        </SpotlightCard>

        {/* 8. Instruction Complexity (Bell Curve) */}
        <SpotlightCard className="p-4 rounded-xl flex flex-col min-h-[200px]">
          <h3 className="text-xs font-semibold uppercase tracking-wider opacity-70 mb-2 border-b border-[var(--border-color)] pb-2">8. Complexity Curve</h3>
          <div className="flex-1 w-full h-full relative mt-2">
            <svg className="w-full h-full absolute inset-0" preserveAspectRatio="none" viewBox="0 0 100 100">
              <path d="M0,100 C20,100 30,10 50,10 C70,10 80,100 100,100" fill="none" stroke="currentColor" strokeWidth="3" className="text-[var(--accent-color)]" />
              <path d="M0,100 C20,100 30,10 50,10 C70,10 80,100 100,100 Z" fill="currentColor" className="text-[var(--accent-color)] opacity-20" />
            </svg>
            <div className="absolute bottom-0 w-full flex justify-between text-[10px] opacity-50">
              <span>Simple</span>
              <span>Complex</span>
            </div>
          </div>
        </SpotlightCard>

        {/* 9. N-gram Overlap (Matrix) */}
        <SpotlightCard className="p-4 rounded-xl flex flex-col min-h-[200px]">
          <h3 className="text-xs font-semibold uppercase tracking-wider opacity-70 mb-2 border-b border-[var(--border-color)] pb-2">9. N-gram Overlap</h3>
          <div className="flex-1 grid grid-cols-4 grid-rows-4 gap-0.5 mt-2">
            {ngramData.map((intensity, i) => (
              <div key={i} className="rounded-sm" style={{ backgroundColor: `rgba(217, 119, 87, ${intensity})` }}></div>
            ))}
          </div>
        </SpotlightCard>

        {/* 10. Language/Locale Breakdown (Donut Chart) */}
        <SpotlightCard className="p-4 rounded-xl flex flex-col items-center justify-center min-h-[200px]">
          <h3 className="w-full text-left text-xs font-semibold uppercase tracking-wider opacity-70 mb-4 border-b border-[var(--border-color)] pb-2">10. Locale Breakdown</h3>
          <div className="relative w-24 h-24 mt-2">
             <svg viewBox="0 0 36 36" className="w-full h-full">
               <path d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="currentColor" strokeWidth="6" className="text-[var(--accent-color)]" strokeDasharray="60, 100" />
               <path d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="currentColor" strokeWidth="6" className="text-blue-500" strokeDasharray="25, 100" strokeDashoffset="-60" />
               <path d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="currentColor" strokeWidth="6" className="text-emerald-500" strokeDasharray="15, 100" strokeDashoffset="-85" />
             </svg>
             <div className="absolute inset-0 flex items-center justify-center">
               <span className="text-xs font-bold">EN 60%</span>
             </div>
          </div>
        </SpotlightCard>

        {/* 11. Formatting Consistency (Gauge) */}
        <SpotlightCard className="p-4 rounded-xl flex flex-col items-center justify-center min-h-[200px]">
          <h3 className="w-full text-left text-xs font-semibold uppercase tracking-wider opacity-70 mb-4 border-b border-[var(--border-color)] pb-2">11. JSON Formatting</h3>
          <div className="relative w-24 h-24 mt-2 overflow-hidden">
             <svg viewBox="0 0 36 18" className="w-full h-full">
               <path d="M18 18 A 15.9155 15.9155 0 0 1 33.9155 18" fill="none" stroke="currentColor" strokeWidth="4" className="text-black/10 dark:text-white/10" style={{ transformOrigin: "18px 18px", transform: "rotate(180deg)" }} />
               <path d="M18 18 A 15.9155 15.9155 0 0 1 33.9155 18" fill="none" stroke="currentColor" strokeWidth="4" className="text-[var(--accent-color)]" strokeDasharray="48, 100" style={{ transformOrigin: "18px 18px", transform: "rotate(180deg)" }} />
             </svg>
             <div className="absolute bottom-0 left-0 w-full flex items-center justify-center flex-col">
               <span className="text-xl font-bold">98%</span>
               <span className="text-[8px] uppercase opacity-60">Valid</span>
             </div>
          </div>
        </SpotlightCard>

        {/* 12. Entity Density (Bar Chart) */}
        <SpotlightCard className="p-4 rounded-xl flex flex-col min-h-[200px]">
          <h3 className="text-xs font-semibold uppercase tracking-wider opacity-70 mb-4 border-b border-[var(--border-color)] pb-2">12. Entity Density</h3>
          <div className="flex-1 flex flex-col justify-between mt-2 space-y-2">
            {[ {label: 'ORG', val: 80}, {label: 'PER', val: 65}, {label: 'LOC', val: 40}, {label: 'DATE', val: 55} ].map((item, i) => (
               <div key={i} className="flex items-center space-x-2">
                  <span className="text-[10px] w-8">{item.label}</span>
                  <div className="flex-1 h-3 bg-black/5 dark:bg-white/5 rounded-full overflow-hidden">
                    <div className="h-full bg-[var(--accent-color)]" style={{ width: `${item.val}%` }}></div>
                  </div>
               </div>
            ))}
          </div>
        </SpotlightCard>

        {/* 13. Flesch-Kincaid Readability (Line Chart) */}
        <SpotlightCard className="p-4 rounded-xl flex flex-col min-h-[200px]">
          <h3 className="text-xs font-semibold uppercase tracking-wider opacity-70 mb-2 border-b border-[var(--border-color)] pb-2">13. Readability Score</h3>
          <div className="flex-1 w-full h-full relative mt-2">
             <svg className="w-full h-full absolute inset-0" preserveAspectRatio="none" viewBox="0 0 100 100">
               <polyline points="0,80 20,60 40,70 60,30 80,40 100,20" fill="none" stroke="currentColor" strokeWidth="2" className="text-blue-500" />
               <circle cx="60" cy="30" r="3" className="fill-blue-500" />
             </svg>
             <div className="absolute top-2 left-2 text-[10px] opacity-70">Avg: Grade 10</div>
          </div>
        </SpotlightCard>

        {/* 14. Code vs Text Proportion (Donut) */}
        <SpotlightCard className="p-4 rounded-xl flex flex-col items-center justify-center min-h-[200px]">
          <h3 className="w-full text-left text-xs font-semibold uppercase tracking-wider opacity-70 mb-4 border-b border-[var(--border-color)] pb-2">14. Code vs Text</h3>
          <div className="relative w-24 h-24 mt-2">
             <svg viewBox="0 0 36 36" className="w-full h-full">
               <path d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="currentColor" strokeWidth="8" className="text-purple-500" strokeDasharray="30, 100" />
               <path d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="currentColor" strokeWidth="8" className="text-black/10 dark:text-white/10" strokeDasharray="70, 100" strokeDashoffset="-30" />
             </svg>
             <div className="absolute inset-0 flex items-center justify-center flex-col">
               <span className="text-xs font-bold text-purple-500">30%</span>
               <span className="text-[8px] uppercase opacity-60">Code</span>
             </div>
          </div>
        </SpotlightCard>

        {/* 15. Duplication Rate (Progress Bar) */}
        <SpotlightCard className="p-4 rounded-xl flex flex-col min-h-[200px]">
          <h3 className="text-xs font-semibold uppercase tracking-wider opacity-70 mb-4 border-b border-[var(--border-color)] pb-2">15. Duplication Rate</h3>
          <div className="flex-1 flex flex-col justify-center">
            <div className="flex justify-between items-end mb-2">
               <span className="text-2xl font-bold text-green-500">1.2%</span>
               <span className="text-[10px] opacity-50 uppercase">Target &lt; 5%</span>
            </div>
            <div className="w-full h-2 bg-black/10 dark:bg-white/10 rounded-full overflow-hidden">
               <div className="h-full bg-green-500 w-[1.2%]"></div>
            </div>
            <p className="text-[10px] opacity-60 mt-4 leading-relaxed">Exact string match and near-duplicate MinHash threshold passed.</p>
          </div>
        </SpotlightCard>

        {/* 16. Sentiment Polarity (Diverging Bars) */}
        <SpotlightCard className="p-4 rounded-xl flex flex-col min-h-[200px]">
          <h3 className="text-xs font-semibold uppercase tracking-wider opacity-70 mb-4 border-b border-[var(--border-color)] pb-2">16. Sentiment Polarity</h3>
          <div className="flex-1 flex flex-col justify-center space-y-2 relative">
            <div className="absolute left-1/2 top-0 bottom-0 w-px bg-black/20 dark:bg-white/20 -translate-x-1/2"></div>
            {[ {l: 'Pos', w: 60, c: 'bg-green-500'}, {l: 'Neu', w: 30, c: 'bg-zinc-400'}, {l: 'Neg', w: 40, c: 'bg-red-500'} ].map((item, i) => (
              <div key={i} className="flex items-center w-full relative h-4">
                 <div className="w-1/2 flex justify-end pr-2">
                   {i === 2 && <div className={`h-full ${item.c}`} style={{ width: `${item.w}%` }}></div>}
                 </div>
                 <div className="w-1/2 flex justify-start pl-2">
                   {i !== 2 && <div className={`h-full ${item.c}`} style={{ width: `${item.w}%` }}></div>}
                 </div>
                 <span className="absolute left-1/2 -translate-x-1/2 text-[8px] bg-[var(--card-bg)] px-1">{item.l}</span>
              </div>
            ))}
          </div>
        </SpotlightCard>

        {/* 17. PII Exposure Risk (Status List) */}
        <SpotlightCard className="p-4 rounded-xl flex flex-col min-h-[200px]">
          <h3 className="text-xs font-semibold uppercase tracking-wider opacity-70 mb-4 border-b border-[var(--border-color)] pb-2">17. PII Risk</h3>
          <div className="flex-1 flex flex-col space-y-3 mt-2">
            {[ {l: 'Emails', s: 'Clean', c: 'text-green-500'}, {l: 'Phone Nos', s: 'Clean', c: 'text-green-500'}, {l: 'Names', s: 'Pseudonymized', c: 'text-yellow-500'} ].map((item, i) => (
              <div key={i} className="flex justify-between items-center text-xs">
                <span className="opacity-80">{item.l}</span>
                <span className={`font-mono ${item.c}`}>{item.s}</span>
              </div>
            ))}
          </div>
        </SpotlightCard>

        {/* 18. Reward Model Score (Box Plot) */}
        <SpotlightCard className="p-4 rounded-xl flex flex-col min-h-[200px]">
          <h3 className="text-xs font-semibold uppercase tracking-wider opacity-70 mb-4 border-b border-[var(--border-color)] pb-2">18. Reward Scores</h3>
          <div className="flex-1 relative w-full h-full flex flex-col justify-center px-4 mt-2">
            <div className="w-full h-1 bg-black/10 dark:bg-white/10 rounded-full relative">
               <div className="absolute top-1/2 -translate-y-1/2 left-[20%] right-[10%] h-4 bg-black/20 dark:bg-white/20 border-l-2 border-r-2 border-[var(--accent-color)]">
                 <div className="absolute top-0 bottom-0 left-[60%] w-0.5 bg-black dark:bg-white"></div>
               </div>
               <div className="absolute top-1/2 -translate-y-1/2 left-[5%] w-1 h-3 bg-black/50 dark:bg-white/50"></div>
               <div className="absolute top-1/2 -translate-y-1/2 right-[5%] w-1 h-3 bg-black/50 dark:bg-white/50"></div>
            </div>
            <div className="flex justify-between text-[10px] opacity-50 mt-4">
              <span>Low</span>
              <span>High</span>
            </div>
          </div>
        </SpotlightCard>

        {/* 19. Active Learning Confidence (Scatter with Threshold) */}
        <SpotlightCard className="p-4 rounded-xl flex flex-col min-h-[200px]">
          <h3 className="text-xs font-semibold uppercase tracking-wider opacity-70 mb-2 border-b border-[var(--border-color)] pb-2">19. Model Confidence</h3>
          <div className="flex-1 relative w-full h-full mt-2 border-l border-b border-[var(--border-color)]">
             <div className="absolute top-[30%] w-full border-t border-dashed border-red-500 opacity-50"></div>
             {confidenceData.map((pos, i) => {
               const isLow = pos.y < 30;
               return (
                 <div key={i} className={`absolute w-1.5 h-1.5 rounded-full ${isLow ? 'bg-red-500' : 'bg-green-500'} opacity-70`}
                   style={{ left: `${pos.x}%`, bottom: `${pos.y}%` }}
                 ></div>
               )
             })}
             <span className="absolute top-[30%] right-1 text-[8px] text-red-500 -translate-y-full">Threshold</span>
          </div>
        </SpotlightCard>

        {/* 20. Domain/Topic Clusters (Bubble Chart) */}
        <SpotlightCard className="p-4 rounded-xl flex flex-col min-h-[200px]">
          <h3 className="text-xs font-semibold uppercase tracking-wider opacity-70 mb-2 border-b border-[var(--border-color)] pb-2">20. Topic Clusters</h3>
          <div className="flex-1 relative w-full h-full mt-2">
             <div className="absolute w-16 h-16 rounded-full bg-blue-500/20 border border-blue-500/50 flex items-center justify-center top-2 left-2 text-[8px]">Tech</div>
             <div className="absolute w-12 h-12 rounded-full bg-emerald-500/20 border border-emerald-500/50 flex items-center justify-center bottom-4 right-4 text-[8px]">Sci</div>
             <div className="absolute w-20 h-20 rounded-full bg-[var(--accent-color)]/20 border border-[var(--accent-color)]/50 flex items-center justify-center top-6 right-2 text-[8px]">Creative</div>
             <div className="absolute w-10 h-10 rounded-full bg-purple-500/20 border border-purple-500/50 flex items-center justify-center bottom-2 left-6 text-[8px]">Med</div>
          </div>
        </SpotlightCard>

        {/* 21. Curator Interventions (Stacked Columns) */}
        <SpotlightCard className="p-4 rounded-xl flex flex-col min-h-[200px]">
          <h3 className="text-xs font-semibold uppercase tracking-wider opacity-70 mb-4 border-b border-[var(--border-color)] pb-2">21. Interventions</h3>
          <div className="flex-1 flex items-end justify-between space-x-2 mt-2 px-2 border-b border-[var(--border-color)]">
             {interventionData.map((d, i) => (
                <div key={i} className="w-1/5 flex flex-col justify-end h-full gap-0.5">
                   <div className="w-full bg-red-400 opacity-80" style={{ height: `${d.h1}%` }}></div>
                   <div className="w-full bg-yellow-400 opacity-80" style={{ height: `${d.h2}%` }}></div>
                   <div className="w-full bg-[var(--accent-color)] opacity-80" style={{ height: `${d.h3}%` }}></div>
                </div>
             ))}
          </div>
        </SpotlightCard>

        {/* 22. Token Efficiency (Area Chart) */}
        <SpotlightCard className="p-4 rounded-xl flex flex-col min-h-[200px]">
          <h3 className="text-xs font-semibold uppercase tracking-wider opacity-70 mb-2 border-b border-[var(--border-color)] pb-2">22. Token Efficiency</h3>
          <div className="flex-1 w-full h-full relative mt-2">
             <svg className="w-full h-full absolute inset-0" preserveAspectRatio="none" viewBox="0 0 100 100">
               <path d="M0,100 L0,60 L20,50 L40,70 L60,30 L80,40 L100,20 L100,100 Z" fill="currentColor" className="text-emerald-500 opacity-20" />
               <path d="M0,60 L20,50 L40,70 L60,30 L80,40 L100,20" fill="none" stroke="currentColor" strokeWidth="2" className="text-emerald-500" />
             </svg>
          </div>
        </SpotlightCard>

        {/* 23. Syntax Tree Depth (Histogram) */}
        <SpotlightCard className="p-4 rounded-xl flex flex-col min-h-[200px]">
          <h3 className="text-xs font-semibold uppercase tracking-wider opacity-70 mb-4 border-b border-[var(--border-color)] pb-2">23. Syntax Depth</h3>
          <div className="flex-1 flex items-end space-x-1 mt-2 border-b border-[var(--border-color)]">
            {[10, 30, 80, 100, 60, 40, 20, 5].map((h, i) => (
              <div key={i} className="flex-1 bg-purple-500 opacity-80 rounded-t-sm" style={{ height: `${h}%` }}></div>
            ))}
          </div>
          <div className="flex justify-between text-[10px] opacity-50 mt-1"><span>Shallow</span><span>Deep</span></div>
        </SpotlightCard>

        {/* 24. Knowledge Graph Density (Network SVG) */}
        <SpotlightCard className="p-4 rounded-xl flex flex-col items-center justify-center min-h-[200px]">
          <h3 className="w-full text-left text-xs font-semibold uppercase tracking-wider opacity-70 mb-2 border-b border-[var(--border-color)] pb-2">24. Graph Density</h3>
          <div className="relative w-full flex-1 mt-2">
             <svg className="w-full h-full" viewBox="0 0 100 100">
                <line x1="20" y1="20" x2="50" y2="50" stroke="currentColor" className="opacity-20" />
                <line x1="80" y1="30" x2="50" y2="50" stroke="currentColor" className="opacity-20" />
                <line x1="30" y1="80" x2="50" y2="50" stroke="currentColor" className="opacity-20" />
                <line x1="70" y1="70" x2="50" y2="50" stroke="currentColor" className="opacity-20" />
                <line x1="20" y1="20" x2="80" y2="30" stroke="currentColor" className="opacity-20" />
                <line x1="80" y1="30" x2="70" y2="70" stroke="currentColor" className="opacity-20" />

                <circle cx="50" cy="50" r="5" className="fill-[var(--accent-color)]" />
                <circle cx="20" cy="20" r="3" className="fill-blue-500" />
                <circle cx="80" cy="30" r="3" className="fill-emerald-500" />
                <circle cx="30" cy="80" r="3" className="fill-purple-500" />
                <circle cx="70" cy="70" r="3" className="fill-yellow-500" />
             </svg>
          </div>
        </SpotlightCard>

        {/* 25. Output Diversity Self-BLEU (Gauge) */}
        <SpotlightCard className="p-4 rounded-xl flex flex-col items-center justify-center min-h-[200px]">
          <h3 className="w-full text-left text-xs font-semibold uppercase tracking-wider opacity-70 mb-4 border-b border-[var(--border-color)] pb-2">25. Self-BLEU</h3>
          <div className="relative w-24 h-24 mt-2 overflow-hidden">
             <svg viewBox="0 0 36 18" className="w-full h-full">
               <path d="M18 18 A 15.9155 15.9155 0 0 1 33.9155 18" fill="none" stroke="currentColor" strokeWidth="4" className="text-black/10 dark:text-white/10" style={{ transformOrigin: "18px 18px", transform: "rotate(180deg)" }} />
               <path d="M18 18 A 15.9155 15.9155 0 0 1 33.9155 18" fill="none" stroke="currentColor" strokeWidth="4" className="text-emerald-500" strokeDasharray="20, 100" style={{ transformOrigin: "18px 18px", transform: "rotate(180deg)" }} />
             </svg>
             <div className="absolute bottom-0 left-0 w-full flex items-center justify-center flex-col">
               <span className="text-xl font-bold">0.12</span>
               <span className="text-[8px] uppercase opacity-60">Score (Low is Good)</span>
             </div>
          </div>
        </SpotlightCard>

        {/* 26. Role Alternation / Multi-turn Turns (Step Chart) */}
        <SpotlightCard className="p-4 rounded-xl flex flex-col min-h-[200px]">
          <h3 className="text-xs font-semibold uppercase tracking-wider opacity-70 mb-2 border-b border-[var(--border-color)] pb-2">26. Turns per Convo</h3>
          <div className="flex-1 w-full h-full relative mt-2 border-l border-b border-[var(--border-color)]">
             <svg className="w-full h-full absolute inset-0" preserveAspectRatio="none" viewBox="0 0 100 100">
               <polyline points="0,80 20,80 20,50 40,50 40,70 60,70 60,30 80,30 80,60 100,60" fill="none" stroke="currentColor" strokeWidth="2" className="text-blue-500" />
             </svg>
          </div>
        </SpotlightCard>

        {/* 27. Instruction Following Constraints Score (Radar / Polar) */}
        <SpotlightCard className="p-4 rounded-xl flex flex-col items-center justify-center min-h-[200px]">
          <h3 className="w-full text-left text-xs font-semibold uppercase tracking-wider opacity-70 mb-2 border-b border-[var(--border-color)] pb-2">27. Constraints Met</h3>
          <div className="relative w-full flex-1 mt-2 flex items-center justify-center">
             <svg viewBox="0 0 100 100" className="w-24 h-24">
                <polygon points="50,10 90,40 75,90 25,90 10,40" fill="none" stroke="currentColor" strokeWidth="1" className="opacity-20" />
                <polygon points="50,30 80,45 70,80 30,80 20,45" fill="currentColor" className="text-[var(--accent-color)] opacity-40" />
                <polygon points="50,30 80,45 70,80 30,80 20,45" fill="none" stroke="currentColor" strokeWidth="2" className="text-[var(--accent-color)]" />
             </svg>
          </div>
        </SpotlightCard>

      </div>
    </div>
  );
};

export default DatasetInsights;