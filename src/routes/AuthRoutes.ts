import { Router } from "express";
import { AuthController } from "../controllers/AuthController";

const authController = new AuthController();
const authRoute = Router();

authRoute.get("/", authController.login);

export { authRoute };
