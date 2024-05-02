import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import prisma from "../lib/prisma.js";
export const CreateUser = async (userData) => {
  const existingUser = await prisma.user.findFirst({
    where: {
      OR: [{ username: userData.username }, { email: userData.email }],
    },
  });

  if (existingUser) {
    let errorMessage = "";
    if (
      existingUser.username === userData.username &&
      existingUser.email === userData.email
    ) {
      errorMessage = "Username and email already taken.";
    } else if (existingUser.username === userData.username) {
      errorMessage = "Username already taken.";
    } else {
      errorMessage = "Email already taken.";
    }
    throw new Error(errorMessage);
  }

  const hashPassword = await bcrypt.hash(userData.password, 10);

  try {
    return await prisma.user.create({
      data: { ...userData, password: hashPassword },
    });
  } catch (err) {
    throw new Error(err.message);
  }
};

export const AuthenticateUser = async (userData) => {
  const user = await prisma.user.findUnique({
    where: {
      username: userData.username,
    },
  });

  if (!user) {
    throw new Error("Invalid username or password");
  }

  const comparePassword = await bcrypt.compare(
    userData.password,
    user.password
  );

  if (comparePassword) {
    const { token, expiresIn } = generateToken({
      id: user.id,
      username: user.username,
      email: user.email,
      agency: user.agency,
    });
    const userInfo = {
      id: user.id,
      name: user.name,
      username: user.username,
      email: user.email,
      agency: user.agency,
    };
    return {
      userInfo: { ...userInfo },
      token: token,
      expiresIn: expiresIn,
    };
  } else {
    throw new Error("Incorrect password.");
  }
};

const generateToken = ({ id, username, email, agency }) => {
  try {
    const token = jwt.sign(
      {
        id,
        username,
        email,
        agency,
        iat: Math.floor(Date.now() / 1000),
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "1hr",
      }
    );

    return {
      token,
    };
  } catch (err) {
    throw new Error(err.message);
  }
};
