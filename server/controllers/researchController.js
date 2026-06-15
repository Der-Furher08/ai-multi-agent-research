const { generateResearch } = require("../services/aiService");


const researchController = async (req, res) => {
  try {

    const { topic } = req.body;

    if (!topic) {
      return res.status(400).json({
        success: false,
        message: "Topic is required",
      });
    }

    const result = await generateResearch(topic);


    res.status(200).json({
      success: true,
      data: result.data,
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message,
    });

  }
};


module.exports = {
  researchController,
};