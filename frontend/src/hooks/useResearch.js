import { useState } from "react";
import { startResearch } from "../services/researchService";

function useResearch() {
  const [loading, setLoading] = useState(false);
  const [research, setResearch] = useState(null);
  const [error, setError] = useState("");

  const generateResearch = async (topic) => {
    try {
      setLoading(true);
      setError("");
      setResearch(null);

      const response = await startResearch(topic);

      setResearch(response.data);

    } catch (err) {
      console.error(err);

      setError(
        err.response?.data?.message ||
        "Failed to generate research"
      );

    } finally {
      setLoading(false);
    }
  };

  return {
    loading,
    research,
    error,
    generateResearch,
  };
}

export default useResearch;