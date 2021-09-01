import { NextFunction, Request, Response } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { dbQuery } from "../database";

interface JwtPayload {
  userInfo: string;
  iat: number;
  exp: number;
}

export const jwtVerify = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const token = req.headers["x-access-token"];
  try {
    const verificationToken = await jwt.verify(
      String(token),
      String(process.env?.JWT_SECRET)
    );

    if (verificationToken) {
      const { userInfo, iat, exp } = verificationToken as JwtPayload;
      const [user, password] = userInfo.split(":");
      const selectedUser = await dbQuery(
        `Select * from users where user = "${user}"`
      );
      const correctUser = await bcrypt.compare(
        password,
        selectedUser[0].password
      );
      if (selectedUser && correctUser) {
        return next();
      }
    }
  } catch (error) {
    console.log(error);
    return res.status(401).json({
      status: "Fail",
      message: "Please, provide your JWT.",
    });
  }
};
