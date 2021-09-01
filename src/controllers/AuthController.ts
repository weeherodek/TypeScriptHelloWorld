import { Request, Response } from "express";
import { dbQuery } from "../database";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

class AuthController {
  async login(req: Request, res: Response) {
    if (!req.headers.authorization) {
      return res.status(401).json({
        status: "Fail",
        message: "Please, insert a basic auth in the request.",
      });
    }
    const authorization = Buffer.from(
      String(req.headers.authorization?.split(" ")[1]),
      "base64"
    ).toString();
    const [user, password] = authorization.split(":");
    if (!user || !password) {
      return res.status(401).json({
        status: "Fail",
        message: "Please, insert a basic auth in the request.",
      });
    }
    try {
      const userQuery = await dbQuery(
        `Select * from users where user = "${user}"`
      );
      const isUser = await bcrypt.compare(password, userQuery[0].password);
      if (isUser) {
        const authorization = Buffer.from(
          String(req.headers.authorization?.split(" ")[1]),
          "base64"
        ).toString();
        const token = await jwt.sign(
          { userInfo: authorization },
          String(process.env?.JWT_SECRET),
          {
            expiresIn: "1h",
          }
        );

        return res.status(200).json({
          status: "Success",
          message: `Logged with success user ${user}.`,
          token,
        });
      }
      return res.status(401).json({
        status: "Fail",
        message: "Sorry, some info is wrong, try again.",
      });
    } catch (error) {
      return res.status(500).json({
        status: "Fail",
        message: "Internal Error, sorry.",
        erro: error,
      });
    }
  }
}

export { AuthController };
