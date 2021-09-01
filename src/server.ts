import dotenv from "dotenv";
dotenv.config({ path: ".env" });

import express, { urlencoded } from "express";
import cors from "cors";

import { route } from "./routes/";
import { noRoute, internalError } from "./middlewares/errorHandlerMiddleware";

require("./database"); // Database connection

const app = express();

app.use(urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());

app.use("/api/v1/", route);

app.use(noRoute);
app.use(internalError);

export { app };
