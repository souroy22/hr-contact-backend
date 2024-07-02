import express from "express";
import checkMissingFields from "../middlewares/checkMissingFields";
import authControllers from "../controllers/auth.controllers";
import validateEmail from "../middlewares/validateEmailId";

const authRouter = express.Router();

authRouter.post(
  "/signup",
  checkMissingFields.signup,
  validateEmail,
  authControllers.signup
);
authRouter.post("/signin", checkMissingFields.signin, authControllers.signin);

export default authRouter;
