import {
  QueryListOfReports,
  QueryReportById,
  CreateReport,
  DeleteReportById,
  UpdateAllReport,
} from "../services/report.services.js";
import { io } from "../main.js";

export const getAllReportsController = async (req, res) => {
  try {
    const agency = req.verifiedUser.agency;
    console.log(agency);
    const reports = await QueryListOfReports(agency);
    return res.status(200).json(reports);
  } catch (err) {
    console.error(err.message);
    return res.status(500).json({ error: err.message });
  }
};

export const getReportController = async (req, res) => {
  try {
    const reportId = req.params.id;
    const report = await QueryReportById(reportId);
    return res.status(200).json(report);
  } catch (err) {
    console.error(err.message);
    return res.status(500).json({ error: err.message });
  }
};

export const addReportController = async (req, res) => {
  try {
    const reportData = req.body;
    console.log(reportData);
    const newReport = await CreateReport(reportData);
    io.emit("newReport", newReport);
    return res.status(201).json(newReport);
  } catch (err) {
    console.error(err.message);
    return res.status(500).json({ error: err.message });
  }
};

export const deleteReportController = async (req, res) => {
  try {
    const reportId = req.params.id;
    const deletedReport = await DeleteReportById(reportId);
    return res.status(200).json(deletedReport);
  } catch (err) {
    console.error(err.message);
    return res.status(500).json({ error: err.message });
  }
};

export const updateReportController = async (req, res) => {
  try {
    const reportData = req.body;
    const agency = req.verifiedUser.agency;
    const updatedReport = await UpdateAllReport(agency, reportData);
    return res.status(200).json(updatedReport);
  } catch (err) {
    console.error(err.message);
    return res.status(500).json({ error: err.message });
  }
};
