import mongoose, { Schema, Document } from "mongoose";

interface IContact extends Document {
  name: string;
  contactNumber: string;
  companyName: string;
  location: string;
  role: string;
}

const contactSchema: Schema = new Schema({
  name: { type: String, trim: true },
  contactNumber: { type: String, required: true, unique: true },
  companyName: { type: String, required: true },
  location: { type: String },
  role: {
    type: String,
    required: true,
    enum: [
      "FRONTEND",
      "BACKEND",
      "FULL_STACK",
      "REACT",
      "SOFTWARE_ENGINEER",
      "DOTNET",
    ],
  },
});

const Contact = mongoose.model<IContact>("Contact", contactSchema);

export default Contact;
