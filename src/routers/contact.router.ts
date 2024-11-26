import express from "express";
import contactController from "../controllers/contact.controllers";
import checkMissingFields from "../middlewares/checkMissingFields";
import { paginateMiddleware } from "../utils/pagination";

const contactRouters = express.Router();

contactRouters.get(
  "/all",
  paginateMiddleware,
  contactController.getAllContacts
);
contactRouters.post(
  "/create",
  checkMissingFields.createContact,
  contactController.createContact
);

export default contactRouters;
