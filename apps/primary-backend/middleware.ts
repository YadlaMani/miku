import type { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
export function authMiddleware(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) {
    return res.status(401).json({
      message: "Unauthorized",
    });
  }
  const decoded = jwt.verify(token, process.env.JWT_PUBLIC_KEY!);
  if (!decoded) {
    return res.status(401).json({
      message: "Unauthorized",
    });
  }
  const userId = (decoded as any).payload.sub;
  if (!userId) {
    return res.status(401).json({
      message: "Unauthorized",
    });
  }
  req.userId = userId;
  next();
}
