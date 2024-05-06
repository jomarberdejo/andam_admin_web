import prisma from "../lib/prisma.js";

export const QueryListOfResident = async () => {
  try {
    return await prisma.resident.findMany({
      include: {
        reports: true,
      },
    });
  } catch (err) {
    throw new Error(err.message);
  }
};

export const RegisterResident = async (residentData) => {
  try {
    const agreement = await prisma.agreement.create({
      data: {},
    });
    console.log(agreement);
    const createdResident = await prisma.resident.create({
      data: { ...residentData, agreementId: agreement.id },
    });

    return { resident: createdResident };
  } catch (err) {
    throw new Error(err.message);
  }
};
