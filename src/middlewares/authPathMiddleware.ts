import { Request, Response, NextFunction } from "express";

const verifyPath = async (req: Request, res: Response, next: NextFunction) => {
  const { id } = req.params;

  if (isNaN(Number(id))) {
    return res.status(400).json({
      status: "Fail",
      message: "Sorry, input a valid ID in path.",
    });
  }
  next();
};

export { verifyPath };
