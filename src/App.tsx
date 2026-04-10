import Layout from './components/Layout';
import DataGenerationForm from './components/DataGenerationForm';
import ResultsView from './components/ResultsView';

function App() {
  return (
    <Layout>
      <div className="flex flex-col min-h-full space-y-8 pb-12">
        <div className="flex flex-col space-y-2">
          <h1 className="text-3xl font-bold tracking-tight">Generate Synthetic Data</h1>
          <p className="text-sm opacity-70">Design the structure and instruct the model to produce high-quality mock data.</p>
        </div>

        <DataGenerationForm />

        <ResultsView />
      </div>
    </Layout>
  );
}

export default App;
