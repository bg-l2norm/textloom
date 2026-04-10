import { useState } from 'react';
import Layout from './components/Layout';
import DataGenerationForm from './components/DataGenerationForm';
import ResultsView from './components/ResultsView';
import UsageInsights from './components/UsageInsights';

function App() {
  const [activeTab, setActiveTab] = useState('generate');

  return (
    <Layout activeTab={activeTab} onTabChange={setActiveTab}>
      {activeTab === 'generate' && (
        <div className="flex flex-col min-h-full space-y-8 pb-12">
          <div className="flex flex-col space-y-2">
            <h1 className="text-3xl font-bold tracking-tight">Generate Synthetic Data</h1>
            <p className="text-sm opacity-70">Design the structure and instruct the model to produce high-quality mock data.</p>
          </div>

          <DataGenerationForm />

          <ResultsView />
        </div>
      )}
      {activeTab === 'usage' && (
        <UsageInsights />
      )}
      {/* Placeholders for other tabs */}
      {activeTab === 'datasets' && (
        <div className="p-8 text-center opacity-50">Datasets content coming soon...</div>
      )}
      {activeTab === 'settings' && (
        <div className="p-8 text-center opacity-50">Settings content coming soon...</div>
      )}
    </Layout>
  );
}

export default App;
