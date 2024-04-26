import { Request, Response, NextFunction, Router } from "express";
import { userService } from "./user.service";
import { authUtil } from "../common/utils/authUltil";

const router = Router();

router.get(
  "/",
  // authUtil.validate,
  async (req: any, res: Response, next: NextFunction) => {
    const result = await userService.find();
    return res.send(result);
  }
);

router.post("/", async (req: Request, res: Response, next: NextFunction) => {
  const { body } = req;
  const result = await userService.create(body);
  return res.send(result);
});

router.post(
  "/login",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const {
        body: { email, password },
      } = req;
      const result = await userService.findOne(email, password);
      return res.send(result);
    } catch (error: any) {
        return res.send({ msg: error.message})
    }
  }
);

export default router;
