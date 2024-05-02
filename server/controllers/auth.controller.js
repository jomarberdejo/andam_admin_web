import { AuthenticateUser, CreateUser } from "../services/auth.services.js";

export const registerController = async (req, res) => {
  try {
    const userData = req.body;
    console.log(userData);
    const newUser = await CreateUser(userData);

    return res.status(201).json(newUser);
  } catch (err) {
    console.error(err.message);
    return res.status(500).json({ error: err.message });
  }
};

export const loginController = async (req, res) => {
  try {
    const userData = req.body;
    console.log(userData);
    const authenticatedUser = await AuthenticateUser(userData);
    const { userInfo, token } = authenticatedUser;

    return res.status(200).json({
      userInfo,
      token,
    });
  } catch (err) {
    console.error(err.message);
    return res.status(401).json({ error: err.message });
  }
};
