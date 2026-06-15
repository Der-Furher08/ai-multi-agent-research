import { useState } from "react";

function SearchBox({ onResearch, loading }) {
  const [topic, setTopic] = useState("");

  const handleSubmit = () => {
    if (!topic.trim()) return;

    onResearch(topic);
  };

  return (
    <div className="w-full max-w-3xl">
      
      <textarea
        value={topic}
        onChange={(e) => setTopic(e.target.value)}
        placeholder="Ask anything... e.g. Future of Agentic AI"
        rows="4"
        className="
          w-full
          p-4
          rounded-xl
          bg-slate-800
          border
          border-slate-700
          text-white
          outline-none
        "
      />

      <button
        disabled={loading}
        onClick={handleSubmit}
        className="
          mt-4
          px-6
          py-3
          bg-blue-600
          rounded-lg
          hover:bg-blue-700
          disabled:opacity-50
        "
      >
        {loading ? "Researching..." : "Start Research"}
      </button>

    </div>
  );
}

export default SearchBox;