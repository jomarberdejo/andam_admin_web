import {
  AddAnnouncement,
  QueryListOfAnnouncement,
} from "../services/announcement.services.js";
export const getAllAnnouncementController = async (req, res) => {
  try {
    const announcement = await QueryListOfAnnouncement();
    return res.status(200).json(announcement);
  } catch (error) {
    return res.status(500).json({
      error: error.message,
    });
  }
};

// export const getAnnouncementByIdController = async (req, res) => {
//   try {
//     const { id } = req.params;
//     const agency = req.verifiedUser.agency;
//     const feedback = await QueryFeedbackById(agency, id);
//     return res.status(200).json(feedback);
//   } catch (error) {
//     return res.status(500).json({
//       error: error.message,
//     });
//   }
// };

export const addAnnouncementController = async (req, res) => {
  try {
    const announcementData = req.body;
    console.log(announcementData);

    const newAnnouncement = await AddAnnouncement(announcementData);
    return res.status(201).json(newAnnouncement);
  } catch (error) {
    return res.status(500).json({
      error: error.message,
    });
  }
};
