import Contact from "../db/models/Contact.js";

const getContactById = (id) => Contact.findByPk(id);
const updateContact = async (id, data) => {
  const contact = await getContactById(id);
  if (!contact) {
    return null;
  }
  return contact.update(data, {
    returning: true,
  });
};

const getContacts = async () => Contact.findAll();

export default {
  getContactById,
  updateContact,
  getContacts,
};
