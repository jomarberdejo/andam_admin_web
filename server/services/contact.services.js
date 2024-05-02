import prisma from "../lib/prisma.js";

export const QueryListOfContacts = async () => {
  try {
    return await prisma.contact.findMany({});
  } catch (error) {
    throw new Error(error.message);
  }
};

export const UpdateContact = async (id, data) => {
  try {
    console.log(data);
    return await prisma.contact.update({
      where: {
        id: id,
      },
      data: {
        number: data.number,
      },
    });
  } catch (error) {
    throw new Error(error.message);
  }
};

export const AddContact = async (contactData) => {
  try {
    return await prisma.contact.create({
      data: {
        ...contactData,
      },
    });
  } catch (error) {
    throw new Error(error.message);
  }
};
