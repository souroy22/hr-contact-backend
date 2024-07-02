import { Request, Response } from "express";
import getUserData from "../utils/getUserByEmail";

const userControllers = {
  getUser: async (req: Request, res: Response) => {
    try {
      const user = await getUserData(req.user.user.email);
      if (!user) {
        return res.status(404).json({ error: "No Such user found" });
      }
    } catch (error) {
      if (error instanceof Error) {
        console.log(`Error: ${error.message}`);
        return res.status(500).json({ error: "Something went wrong!" });
      }
    }
  },
};

export default userControllers;
