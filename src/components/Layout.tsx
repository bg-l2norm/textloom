import React from 'react';
import { motion } from 'framer-motion';
import { Layers, Settings, Database, Activity } from 'lucide-react';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const [activeTab, setActiveTab] = React.useState('generate');

  const navItems = [
    { id: 'generate', icon: <Layers size={20} />, label: 'Generate Data' },
    { id: 'datasets', icon: <Database size={20} />, label: 'Datasets' },
    { id: 'activity', icon: <Activity size={20} />, label: 'Activity' },
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
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
        className="w-64 flex flex-col glass-sidebar z-10"
      >
        <div className="p-6">
          <div className="flex items-center space-x-3 mb-8">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-blue-500 to-purple-500 flex items-center justify-center text-white font-bold shadow-lg">
              T
            </div>
            <h1 className="text-xl font-semibold tracking-tight">TextLoom</h1>
          </div>

          <nav className="space-y-2">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`w-full flex items-center space-x-3 px-4 py-2.5 rounded-lg smooth-transition ${
                  activeTab === item.id
                    ? 'bg-[var(--accent-color)] text-white shadow-md'
                    : 'hover:bg-black/5 dark:hover:bg-white/10 text-opacity-80'
                }`}
              >
                {item.icon}
                <span className="font-medium text-sm">{item.label}</span>
              </button>
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
      <main className="flex-1 flex flex-col relative overflow-hidden bg-black/5 dark:bg-white/5 backdrop-blur-3xl">
        {/* Top Header */}
        <header className="h-16 flex items-center px-8 glass-panel border-t-0 border-l-0 border-r-0 z-10">
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
            transition={{ duration: 0.3 }}
            className="max-w-6xl mx-auto h-full"
          >
            {children}
          </motion.div>
        </div>
      </main>
    </div>
  );
};

export default Layout;
