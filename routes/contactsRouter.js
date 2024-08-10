import express from "express";
import ctrl from "../controllers/contactsControllers.js";
import contactSchemas from "../schemas/contactsSchemas.js";
import validateBody from "../helpers/validateBody.js";

const contactsRouter = express.Router();

contactsRouter
  .get("/", ctrl.getAllContacts)
  .post(
    "/",
    validateBody(contactSchemas.createContactSchema),
    ctrl.createContact
  );

contactsRouter
  .get("/:id", ctrl.getOneContact)
  .put(
    "/:id",
    validateBody(contactSchemas.updateContactSchema),
    ctrl.updateContact
  )
  .delete("/:id", ctrl.deleteContact);

contactsRouter.patch(
  "/:id/favorite",
  validateBody(contactSchemas.updateContactStatusSchema),
  ctrl.updateContact
);

export default contactsRouter;
