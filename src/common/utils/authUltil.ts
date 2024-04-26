import { Request, Response, NextFunction } from "express";
import { jwtUtil } from "./jwtUtil";
export const authUtil = {
  validate: async function (req: any, res: Response, next: NextFunction) {
    try {
      const {
        headers: { authorization },
      } = req;

      if (!authorization) {
        return res.status(403).send({ msg: "unauthenticated user" });
      }

      const result = (jwtUtil.verify(
        authorization as string
      )) as any;

      if (Object.keys(result?.data)?.length < 1) {
        return res.status(403).send({ msg: "unauthenticated user" });
      }
      if (+result.exp - +result.iat > 0) {
        req["user"] = result.data;
      }
    } catch (error: any) {
        return res.status(403).send({ msg: "unauthenticated user", error: error.message });
    }

    return next();
  },
};
