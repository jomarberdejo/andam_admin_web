import { QueryAllEntry, AddEntry } from "../services/entry.services.js";

export const getAllEntryController = async (req, res) => {
  try {
    const agency = req.verifiedUser.agency;
    console.log(agency);
    const entryData = await QueryAllEntry(agency);
    return res.status(200).json(entryData);
  } catch (err) {
    console.error(err.message);
    return res.status(500).json({ error: err.message });
  }
};

export const addEntryController = async (req, res) => {
  try {
    const entryData = req.body;
    console.log(entryData);
    const newEntry = await AddEntry(entryData);

    return res.status(201).json(newEntry);
  } catch (err) {
    console.error(err.message);
    return res.status(500).json({ error: err.message });
  }
};
