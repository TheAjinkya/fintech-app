import Dashboard from "./components/Dashboard";
import { InstrumentsTable } from "./components/instruments-table/InstrumentsTable";
import { useInstrumentsData } from "./hooks/useInstrumentsData";

function App() {
  const { data, loading } = useInstrumentsData();

  return (
    <div className="page">
      <div className="card">
        <h1>Financial Instruments</h1>

        {loading ? (
          <p className="loading">Loading market data…</p>
        ) : (
          <InstrumentsTable data={data} />
        )}
      </div>
    </div>
  );
}


export default App;
