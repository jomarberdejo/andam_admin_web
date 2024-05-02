import {
  QueryListOfContacts,
  UpdateContact,
  AddContact,
} from "../services/contact.services.js";

export const getAllContactsController = async (req, res) => {
  try {
    const contacts = await QueryListOfContacts();
    return res.status(200).json(contacts);
  } catch (error) {
    return res.status(500).json({
      error: error.message,
    });
  }
};

export const addContactController = async (req, res) => {
  try {
    const contactData = req.body;
    const existingContacts = await QueryListOfContacts();

    const existingContactNumber = existingContacts.find(
      (contact) =>
        contact.number === contactData.number &&
        contact.agency !== contactData.agency
    );

    if (existingContactNumber) {
      return res.status(400).json({
        error: "A contact with this number already exists.",
      });
    }

    const existingContactAgency = existingContacts.find(
      (contact) => contact.agency === contactData.agency
    );

    if (existingContactAgency) {
      const updatedContact = await UpdateContact(
        existingContactAgency.id,
        contactData
      );
      return res.status(200).json(updatedContact);
    } else {
      const newContact = await AddContact(contactData);
      return res.status(201).json(newContact);
    }
  } catch (error) {
    return res.status(500).json({
      error: error.message,
    });
  }
};
