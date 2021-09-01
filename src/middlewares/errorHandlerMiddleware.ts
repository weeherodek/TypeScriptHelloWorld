import { HttpException } from "../error/HttpExceptions";
import { Request, Response, NextFunction, Errback } from "express";

export const noRoute = (req: Request, res: Response, next: NextFunction) => {
  return res.status(404).json({
    status: "Fail",
    message: "Desculpa, essa rota não existe :(",
  });
};

export const internalError = (
  err: HttpException,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const status = err.status || 500;
  const message = err.message || "Internal server error!";
  res.status(status).json({
    status: "Fail",
    message: message,
  });
};
