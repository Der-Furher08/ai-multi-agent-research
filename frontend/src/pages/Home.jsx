import Navbar from "../components/Navbar";
import SearchBox from "../components/SearchBox";
import LoadingSpinner from "../components/LoadingSpinner";
import ErrorMessage from "../components/ErrorMessage";
import AgentStatus from "../components/AgentStatus";
import ReportViewer from "../components/ReportViewer";

import useResearch from "../hooks/useResearch";
import useSocket from "../hooks/useSocket";

function Home() {
  const {
    loading,
    research,
    error,
    generateResearch,
  } = useResearch();

  const {
    connected,
    progress,
  } = useSocket();

  return (
    <div className="min-h-screen bg-slate-900 text-white">
      {/* Navbar */}
      <Navbar />

      <main className="max-w-6xl mx-auto px-6 py-10">
        {/* Hero Section */}
        <div className="text-center">
          <h1 className="text-5xl font-bold">
            AI Research Assistant
          </h1>

          <p className="mt-4 text-gray-400 text-lg">
            Let multiple AI agents research any topic and generate a complete report.
          </p>
        </div>

        {/* Socket Status */}
        <div className="mt-8 text-center">
          <span className="text-lg">
            Socket Status:
            {connected
              ? " 🟢 Connected"
              : " 🔴 Disconnected"}
          </span>
        </div>

        {/* Search Box */}
        <div className="mt-10 flex justify-center">
          <SearchBox
            loading={loading}
            onResearch={generateResearch}
          />
        </div>

        {/* Agent Progress */}
        <div className="mt-10 flex justify-center">
          <AgentStatus progress={progress} />
        </div>

        {/* Loading */}
        {loading && (
          <LoadingSpinner />
        )}

        {/* Error */}
        {error && (
          <ErrorMessage message={error} />
        )}

        {/* Research Report */}
        {research && (
          <div className="flex justify-center">
            <ReportViewer research={research} />
          </div>
        )}
      </main>
    </div>
  );
}

export default Home;