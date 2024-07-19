import moment from "moment-timezone";
import prisma from "../lib/prisma.js";

export const QueryListOfFeedback = async (agency) => {
  try {
    const feedbackList = await prisma.feedback.findMany({
      where: {
        agency: agency,
      },
      include: {
        Resident: {
          select: {
            id: true,
            fullName: true,
            imageIdentityUrl: true,
          },
        },
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    const feedbackMap = new Map();
    feedbackList.forEach((feedback) => {
      if (!feedbackMap.has(feedback.residentId)) {
        feedbackMap.set(feedback.residentId, feedback);
      }
    });

    const uniqueFeedbackList = Array.from(feedbackMap.values());

    return uniqueFeedbackList;
  } catch (error) {
    throw new Error(error.message);
  }
};

export const QueryFeedbackById = async (agency, residentId) => {
  try {
    return await prisma.feedback.findMany({
      where: {
        residentId: residentId,
        agency: agency,
      },
      include: {
        Resident: {
          select: {
            id: true,
            fullName: true,
            imageIdentityUrl: true,
          },
        },
      },
    });
  } catch (error) {
    throw new Error(error.message);
  }
};

export const AddFeedback = async (feedbackData) => {
  try {
    const currentDateInManila = moment
      .tz("Asia/Manila")
      .format("YYYY-MM-DD HH:mm:ss");
    return await prisma.feedback.create({
      data: {
        ...feedbackData,
        createdAt: currentDateInManila,
      },
    });
  } catch (error) {
    throw new Error(error.message);
  }
};
