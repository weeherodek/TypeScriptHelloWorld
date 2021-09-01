import { Router } from "express";
import { UserController } from "../controllers/UserController";
import { verifyPath } from "../middlewares/authPathMiddleware";
import { jwtVerify } from "../middlewares/jwtVerifyMiddleware";

const userController = new UserController();
const userRoute = Router();

userRoute
  .route("/")
  .get(jwtVerify, userController.getUsers)
  .post(jwtVerify, userController.createUser);

userRoute
  .route("/:id")
  .delete(verifyPath, jwtVerify, userController.deleteUser)
  .patch(verifyPath, jwtVerify, userController.updateUser)
  .get(verifyPath, jwtVerify, userController.getUser);

export { userRoute };
