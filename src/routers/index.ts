import express from "express";
import contactRouters from "./contact.router";

const routers = express.Router();
routers.use("/contact", contactRouters);

export default routers;
