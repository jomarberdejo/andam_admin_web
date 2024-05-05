import prisma from "../lib/prisma.js";

export const QueryListOfResident = async () => {
  try {
    return await prisma.resident.findMany({});
  } catch (err) {
    throw new Error(err.message);
  }
};

export const RegisterResident = async (residentData) => {
  try {
    const createdResident = await prisma.resident.create({
      data: residentData,
    });

    await prisma.agreement.create({
      data: {
        residentId: createdResident.id,
      },
    });

    return { resident: createdResident };
  } catch (err) {
    throw new Error(err.message);
  }
};
