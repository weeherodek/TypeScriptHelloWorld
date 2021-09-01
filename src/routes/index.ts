import { Router } from "express";
import { userRoute } from "./UserRoutes";
import { authRoute } from "./AuthRoutes";

const route = Router();

route.get("/", (req, res) => {
  res.send("Rotas OK!");
});

route.use("/users", userRoute);
route.use("/login", authRoute);

export { route };
