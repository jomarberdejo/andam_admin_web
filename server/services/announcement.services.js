import prisma from "../lib/prisma.js";
import moment from "moment-timezone";

export const QueryListOfAnnouncement = async () => {
  try {
    return await prisma.announcement.findMany({});
  } catch (err) {
    throw new Error(err.message);
  }
};

export const AddAnnouncement = async (announcement) => {
  try {
    const currentDateInManila = moment
      .tz("Asia/Manila")
      .format("YYYY-MM-DD HH:mm:ss");
    return await prisma.announcement.create({
      data: {
        ...announcement,
        date: currentDateInManila,
      },
    });
  } catch (err) {
    throw new Error(err.message);
  }
};
