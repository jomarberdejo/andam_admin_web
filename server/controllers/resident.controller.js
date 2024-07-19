import {
  getStorage,
  ref,
  uploadBytes,
  getDownloadURL,
  updateMetadata,
} from "firebase/storage";
import {
  AuthenticateResident,
  QueryListOfResident,
  RegisterResident,
  UpdateResidentById,
  QueryResidentById,
} from "../services/resident.services.js";
import firebase from "../firebase/firebaseConfig.js";
import { generateUniqueFilename } from "../helpers/index.js";

const storage = getStorage(firebase);

export const getAllResidentController = async (req, res) => {
  try {
    const residents = await QueryListOfResident();
    return res.status(200).json(residents);
  } catch (err) {
    console.error(err.message);
    return res.status(500).json({ error: err.message });
  }
};

export const getResidentById = async (req, res) => {
  try {
    const { id } = req.body;
    const resident = await QueryResidentById(id);
    return res.status(200).json(resident);
  } catch (err) {
    console.error(err.message);
    return res.status(500).json({ error: err.message });
  }
};

export const registerController = async (req, res) => {
  try {
    const residentData = req.body;
    const file = req.file;
    const uniqueFilename = generateUniqueFilename(file.originalname);
    const storageRef = ref(storage, uniqueFilename);

    await uploadBytes(storageRef, file.buffer);

    await updateMetadata(storageRef, {
      contentType: "image/jpeg",
    });

    const downloadURL = await getDownloadURL(storageRef);

    const newResident = await RegisterResident({
      ...residentData,
      imageIdentityUrl: downloadURL,
    });

    return res.status(201).json(newResident);
  } catch (err) {
    console.error(err.message);
    return res.status(500).json({ error: err.message });
  }
};

export const loginController = async (req, res) => {
  try {
    const residentData = req.body;
    const authenticatedResident = await AuthenticateResident(residentData);
    const residentInfo = authenticatedResident;

    return res.status(200).json(residentInfo);
  } catch (err) {
    console.error(err.message);
    return res.status(401).json({ error: err.message });
  }
};

export const updateResidentController = async (req, res) => {
  try {
    const { id } = req.params;
    let residentData = req.body;
    const file = req.file;
    console.log(id);

    if (file) {
      console.log(file);
      const uniqueFilename = generateUniqueFilename(file.originalname);
      const storageRef = ref(storage, uniqueFilename);

      await uploadBytes(storageRef, file.buffer);

      await updateMetadata(storageRef, {
        contentType: "image/jpeg",
      });

      const downloadURL = await getDownloadURL(storageRef);
      residentData.imageIdentityUrl = downloadURL;
    }

    const updatedResident = await UpdateResidentById(id, residentData);
    return res.status(200).json(updatedResident);
  } catch (err) {
    console.error(err.message);
    return res.status(500).json({ error: err.message });
  }
};
