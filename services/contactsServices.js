import Contact from "../db/models/Contact.js";

export const getContactById = (id) => Contact.findByPk(id);
export const updateContact = async (id, data) => {
  const contact = await getContactById(id);
  if (!contact) {
    return null;
  }
  return contact.update(data, {
    returning: true,
  });
};

export default {
  getContactById,
  updateContact,
};
