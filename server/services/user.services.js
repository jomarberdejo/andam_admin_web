import prisma from "../lib/prisma.js";

export const QueryListOfUser = async (agency) => {
  try {
    return await prisma.user.findMany({
      where: {
        agency: agency,
      },
      select: {
        id: true,
        name: true,
        username: true,
        email: true,
        agency: true,
        createdAt: true,
      },
    });
  } catch (err) {
    throw new Error(err.message);
  }
};

export const QueryUserById = async (userId) => {
  try {
    return await prisma.user.findUnique({
      where: {
        id: userId,
      },
    });
  } catch (err) {
    throw new Error(err.message);
  }
};

export const CreateUser = async (userData) => {
  try {
    return await prisma.user.create({
      data: userData,
    });
  } catch (err) {
    throw new Error(err.message);
  }
};

export const DeleteUser = async (userId) => {
  try {
    return await prisma.user.delete({
      where: {
        id: userId,
      },
    });
  } catch (err) {
    throw new Error(err.message);
  }
};

export const UpdateUserById = async (id, userData) => {
  const existingUser = await prisma.user.findFirst({
    where: {
      AND: [
        { id: { not: id } },
        {
          OR: [{ username: userData.username }, { email: userData.email }],
        },
      ],
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

  try {
    return await prisma.user.update({
      where: {
        id: id,
      },
      data: userData,
    });
  } catch (err) {
    throw new Error("Error updating user");
  }
};
