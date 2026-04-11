import React from 'react';
import { motion } from 'framer-motion';
import { Layers, Settings, Database, Activity } from 'lucide-react';

interface LayoutProps {
  children: React.ReactNode;
  activeTab: string;
  onTabChange: (id: string) => void;
}

const Layout: React.FC<LayoutProps> = ({ children, activeTab, onTabChange }) => {
  const navItems = [
    { id: 'generate', icon: <Layers size={20} />, label: 'Generate Data' },
    { id: 'datasets', icon: <Database size={20} />, label: 'Dataset Insights' },
    { id: 'usage', icon: <Activity size={20} />, label: 'Usage Insights' },
    { id: 'settings', icon: <Settings size={20} />, label: 'Settings' },
  ];

  return (
    <div className="flex h-screen overflow-hidden text-[var(--text-color)] bg-[var(--bg-color)] relative">
      {/* Animated Grid Background */}
      <div className="grid-background-container">
        <div className="grid-background-mask">
          <div className="grid-layer grid-layer-1"></div>
          <div className="grid-layer grid-layer-2"></div>
        </div>
      </div>

      {/* Sidebar */}
      <motion.aside
        initial={{ x: -250 }}
        animate={{ x: 0 }}
        transition={{ type: "spring", stiffness: 400, damping: 40 }}
        className="w-64 flex flex-col solid-sidebar z-10 shadow-[4px_0_24px_-12px_rgba(0,0,0,0.1)]"
      >
        <div className="p-6">
          <div className="flex items-center space-x-3 mb-8">
            <div className="w-8 h-8 rounded-lg bg-[var(--accent-color)] flex items-center justify-center text-white font-bold">
              T
            </div>
            <h1 className="text-xl font-semibold tracking-tight">TextLoom</h1>
          </div>

          <nav className="space-y-2">
            {navItems.map((item) => (
              <motion.button
                key={item.id}
                onClick={() => onTabChange(item.id)}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                transition={{ type: "spring", stiffness: 400, damping: 25 }}
                className={`w-full flex items-center space-x-3 px-4 py-2.5 rounded-lg smooth-transition border ${
                  activeTab === item.id
                    ? 'bg-[var(--card-bg)] text-[var(--accent-color)] border-[var(--border-color)] shadow-sm'
                    : 'border-transparent hover:bg-black/5 dark:hover:bg-white/10 opacity-70 hover:opacity-100'
                }`}
              >
                {item.icon}
                <span className="font-medium text-sm">{item.label}</span>
              </motion.button>
            ))}
          </nav>
        </div>

        <div className="mt-auto p-6">
          <div className="flex items-center space-x-3 px-4 py-2 rounded-lg bg-black/5 dark:bg-white/5 border border-[var(--border-color)]">
            <div className="w-2 h-2 rounded-full bg-green-500 shadow-[0_0_8px_rgba(34,197,94,0.8)]"></div>
            <span className="text-xs font-medium opacity-70">Local LLM Ready</span>
          </div>
        </div>
      </motion.aside>

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col relative overflow-hidden">
        {/* Top Header */}
        <header className="h-16 flex items-center px-8 border-b border-[var(--border-color)] bg-[var(--bg-color)] z-10">
          <h2 className="text-lg font-medium opacity-80 capitalize">
            {navItems.find(i => i.id === activeTab)?.label}
          </h2>
        </header>

        {/* Content Scroll Area */}
        <div className="flex-1 overflow-y-auto p-8 z-0 relative">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ type: "spring", stiffness: 400, damping: 40 }}
            className="max-w-6xl mx-auto min-h-full"
          >
            {children}
          </motion.div>
        </div>
      </main>
    </div>
  );
};

export default Layout;
