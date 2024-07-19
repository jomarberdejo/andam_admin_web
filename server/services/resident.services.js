import prisma from "../lib/prisma.js";
import bcrypt from "bcrypt";

export const QueryListOfResident = async () => {
  try {
    return await prisma.resident.findMany({
      include: {
        feedbacks: true,
        reports: true,
      },
    });
  } catch (err) {
    throw new Error(err.message);
  }
};
export const QueryResidentById = async (id) => {
  try {
    return await prisma.resident.findFirst({
      where: {
        id: id,
      },
      include: {
        feedbacks: true,
        reports: true,
      },
    });
  } catch (err) {
    throw new Error(err.message);
  }
};

export const RegisterResident = async (residentData) => {
  const existingResident = await prisma.resident.findFirst({
    where: {
      OR: [{ username: residentData.username }, { email: residentData.email }],
    },
  });

  if (existingResident) {
    let errorMessage = "";
    if (
      existingResident.username === residentData.username &&
      existingResident.email === residentData.email
    ) {
      errorMessage = "Username and email already taken.";
    } else if (existingResident.username === residentData.username) {
      errorMessage = "Username already taken.";
    } else {
      errorMessage = "Email already taken.";
    }
    throw new Error(errorMessage);
  }

  const hashPassword = await bcrypt.hash(residentData.password, 10);

  try {
    const agreement = await prisma.agreement.create({
      data: {},
    });
    const createdResident = await prisma.resident.create({
      data: {
        ...residentData,
        agreementId: agreement.id,
        password: hashPassword,
      },
    });

    return { resident: createdResident };
  } catch (err) {
    throw new Error(err.message);
  }
};

export const AuthenticateResident = async (residentData) => {
  const resident = await prisma.resident.findUnique({
    where: {
      username: residentData.username,
    },
  });

  if (!resident) {
    throw new Error("Invalid username or password");
  }

  const comparePassword = await bcrypt.compare(
    residentData.password,
    resident.password
  );

  if (comparePassword) {
    const residentInfo = {
      id: resident.id,
      fullName: resident.fullName,
      username: resident.username,
      email: resident.email,
      imageIdentityUrl: resident.imageIdentityUrl,
      contactNumber: resident.contactNumber,
    };
    return residentInfo;
  } else {
    throw new Error("Incorrect password.");
  }
};

export const UpdateResidentById = async (id, residentData) => {
  const existingUser = await prisma.resident.findFirst({
    where: {
      AND: [{ id: { not: id } }, { email: residentData.email }],
    },
  });

  if (existingUser) {
    throw new Error("Email already taken.");
  }

  try {
    return await prisma.resident.update({
      where: {
        id: id,
      },
      data: residentData,
    });
  } catch (err) {
    throw new Error("Error updating user");
  }
};
