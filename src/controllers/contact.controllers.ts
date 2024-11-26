import express, { Request, Response } from "express";
import Contact from "../models/Contact.model";
import { checkForDuplicateContact } from "../utils/checkForDuplicateContact";
import { paginate } from "../utils/pagination";

const router = express.Router();

// Create HR record
const contactController = {
  createContact: async (req: Request, res: Response) => {
    try {
      const { name, contactNumber, companyName, location, role } = req.body;
      const isExist = await checkForDuplicateContact(contactNumber);
      if (isExist) {
        return res
          .status(400)
          .json({ error: "This contact number is already exist" });
      }
      const newContact = new Contact({
        name,
        contactNumber,
        companyName,
        location,
        role,
      });
      await newContact.save();
      res.status(201).json(newContact);
    } catch (error) {
      if (error instanceof Error) {
        console.log(`Error: ${error.message}`);
        return res.status(500).json({ error: "Something went wrong!" });
      }
    }
  },
  getAllContacts: async (req: Request, res: Response) => {
    try {
      const { searchQuery, location, role } = req.query;

      const filter: any = {};

      if (searchQuery) {
        filter.$or = [
          { name: { $regex: searchQuery as string, $options: "i" } },
          { contactNumber: { $regex: searchQuery as string, $options: "i" } },
          { companyName: { $regex: searchQuery as string, $options: "i" } },
        ];
      }

      if (location) {
        filter.location = { $regex: location, $options: "i" };
      }

      if (role) {
        filter.role = role;
      }

      const contactsQuery = Contact.find(filter);
      const contacts = await paginate(contactsQuery, req.pagination);
      return res.status(200).json(contacts);
    } catch (error) {
      if (error instanceof Error) {
        console.log(`Error: ${error.message}`);
        return res.status(500).json({ error: "Something went wrong!" });
      }
    }
  },
};

export default contactController;
