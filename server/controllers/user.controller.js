import {
  QueryListOfUser,
  QueryUserById,
  CreateUser,
  DeleteUser,
  UpdateUserById,
} from "../services/user.services.js";

export const getAllUserController = async (req, res) => {
  try {
    const agency = req.verifiedUser.agency;
    const users = await QueryListOfUser(agency);
    return res.status(200).json(users);
  } catch (err) {
    console.error(err.message);
    return res.status(500).json({ error: err.message });
  }
};

export const getUserController = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await QueryUserById(id);
    return res.status(200).json(user);
  } catch (err) {
    console.error(err.message);
    return res.status(500).json({ error: err.message });
  }
};

export const addUserController = async (req, res) => {
  try {
    const userData = req.body;
    console.log(userData);
    await CreateUser(userData);

    return res.status(201).json({ message: "New Admin Created Sucessfully!" });
  } catch (err) {
    console.error(err.message);
    return res.status(500).json({ error: err.message });
  }
};

export const deleteUserController = async (req, res) => {
  try {
    const userId = req.params.id;
    const deletedUser = await DeleteUser(userId);
    return res.status(200).json(deletedUser);
  } catch (err) {
    console.error(err.message);
    return res.status(500).json({ error: err.message });
  }
};

export const updateUserController = async (req, res) => {
  try {
    const { id } = req.params;
    const userData = req.body;
    await UpdateUserById(id, userData);
    return res.status(200).json({ mesage: "Profile Updated!" });
  } catch (err) {
    console.error(err.message);
    return res.status(500).json({ error: err.message });
  }
};
