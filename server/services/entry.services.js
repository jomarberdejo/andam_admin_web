import prisma from "../lib/prisma.js";
import moment from "moment-timezone";

export const QueryAllEntry = async (agency) => {
  try {
    return await prisma.entry.findMany({
      where: {
        agency: agency,
      },
    });
  } catch (err) {
    throw new Error(err.message);
  }
};

export const AddEntry = async (entryData) => {
  try {
    const currentDateInManila = moment
      .tz("Asia/Manila")
      .format("YYYY-MM-DD HH:mm:ss");
    return await prisma.entry.create({
      data: {
        ...entryData,
        date: currentDateInManila,
      },
    });
  } catch (err) {
    throw new Error(err.message);
  }
};
