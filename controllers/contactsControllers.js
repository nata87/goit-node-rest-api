import ctrlWrapper from "../helpers/ctrlWrapper.js";
import HttpError from "../helpers/HttpError.js";
import contactsService from "../services/contactsServices.js";

const getAllContacts = async (_, res) => {
  const contacts = await contactsService.getContacts();
  return res.json(contacts);
};

const getOneContact = async (req, res) => {
  const { id } = req.params;
  const contact = await contactsService.getContactById(id);
  if (!contact) {
    throw HttpError(404);
  }

  res.json(contact);
};

const createContact = async (req, res) => {
  const contact = await contactsService.addContact(req.body);
  if (!contact) {
    throw HttpError(404);
  }

  res.status(201).json(contact);
};

const updateContact = async (req, res) => {
  if (JSON.stringify(req.body) === "{}") {
    throw HttpError(400, "Body must have at least one field");
  }

  const { body, params } = req;
  const { id } = params;
  const updatedContact = await contactsService.updateContact(id, body);

  if (!updatedContact) {
    throw HttpError(404);
  }

  res.json(updatedContact);
};

const deleteContact = async (req, res) => {
  const { id } = req.params;
  const contact = await contactsService.removeContactById(id);
  if (!contact) {
    throw HttpError(404);
  }

  res.json(contact);
};

export default {
  getAllContacts: ctrlWrapper(getAllContacts),
  getOneContact: ctrlWrapper(getOneContact),
  deleteContact: ctrlWrapper(deleteContact),
  createContact: ctrlWrapper(createContact),
  updateContact: ctrlWrapper(updateContact),
};
