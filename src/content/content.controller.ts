import { Request, Response, NextFunction, Router } from "express";
import { authUtil } from "../common/utils/authUltil";
import { contentService } from "./content.service";

const router = Router();

router.get(
  "/",
  // authUtil.validate,
  async (req: any, res: Response, next: NextFunction) => {
    try {
      const result = await contentService.find();
      return res.send(result);
    } catch (error) {
      // 
    }
  }
);

router.post("/", async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { body } = req;
    const result = await contentService.create(body);
    return res.send(result);
  } catch (error) {
    // 
  }
});

export default router;
