const axios = require("axios");

const generateResearch = async (topic) => {
  try {
    const response = await axios.post(
      `${process.env.FASTAPI_URL}/research`,
      {
        topic: topic,
      }
    );

    return response.data;

  } catch (error) {
    console.error("FastAPI Error:", error.message);

    throw new Error(
      error.response?.data?.detail ||
      "AI service is unavailable"
    );
  }
};

module.exports = {
  generateResearch,
};