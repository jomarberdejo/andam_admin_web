import {
  AddFeedback,
  QueryFeedbackById,
  QueryListOfFeedback,
} from "../services/feedback.services.js";

export const getAllFeedbackController = async (req, res) => {
  try {
    const agency = req.verifiedUser.agency;
    const feedback = await QueryListOfFeedback(agency);
    return res.status(200).json(feedback);
  } catch (error) {
    return res.status(500).json({
      error: error.message,
    });
  }
};

export const getFeedbackByIdController = async (req, res) => {
  try {
    const { id } = req.params;
    const agency = req.verifiedUser.agency;
    const feedback = await QueryFeedbackById(agency, id);
    return res.status(200).json(feedback);
  } catch (error) {
    return res.status(500).json({
      error: error.message,
    });
  }
};

export const addFeedbackController = async (req, res) => {
  try {
    const feedbackData = req.body;
    console.log(feedbackData);

    const newFeedback = await AddFeedback(feedbackData);
    return res.status(201).json(newFeedback);
  } catch (error) {
    return res.status(500).json({
      error: error.message,
    });
  }
};
