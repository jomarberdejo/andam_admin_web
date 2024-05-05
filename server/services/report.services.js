import prisma from "../lib/prisma.js";
import moment from "moment-timezone";

export const QueryListOfReports = async (agency) => {
  try {
    return await prisma.report.findMany({
      where: {
        agency: agency,
      },
      select: {
        id: true,
        name: true,
        contact: true,
        detail: true,
        location: true,
        agency: true,
        latitude: true,
        longitude: true,
        reportedAt: true,
        isNew: true,
        residentId: true,
      },
    });
  } catch (err) {
    throw new Error(err.message);
  }
};

export const QueryReportById = async (reportId) => {
  try {
    return await prisma.report.findUnique({
      where: {
        id: reportId,
      },
    });
  } catch (err) {
    throw new Error(err.message);
  }
};

export const CreateReport = async (reportData) => {
  try {
    const currentDateInManila = moment
      .tz("Asia/Manila")
      .format("YYYY-MM-DD HH:mm:ss");
    return await prisma.report.create({
      data: {
        ...reportData,
        reportedAt: currentDateInManila,
      },
    });
  } catch (err) {
    throw new Error(err.message);
  }
};

export const DeleteReportById = async (reportId) => {
  try {
    return await prisma.report.delete({
      where: {
        id: reportId,
      },
    });
  } catch (err) {
    throw new Error(err.message);
  }
};

export const UpdateAllReport = async (agency, reportData) => {
  try {
    return await prisma.report.updateMany({
      where: {
        isNew: true,
        agency,
      },
      data: reportData,
    });
  } catch (err) {
    throw new Error(err.message);
  }
};
