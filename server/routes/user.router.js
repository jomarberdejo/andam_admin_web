import { Router } from "express";
import {
  addUserController,
  deleteUserController,
  getAllUserController,
  getUserController,
  updateUserController,
} from "../controllers/user.controller.js";
import { verifyUser } from "../middleware/middleware.js";
const userRouter = Router();

userRouter.get("/", verifyUser, getAllUserController);
userRouter.get("/:id", getUserController);
userRouter.post("/", addUserController);
userRouter.delete("/:id", deleteUserController);
userRouter.put("/:id", updateUserController);

export default userRouter;
