import { Request, Response, NextFunction, Router } from "express";
import { authUtil } from "../common/utils/authUltil";
import { categoryService } from "./category.service";

const router = Router();

router.get(
  "/",
  // authUtil.validate,
  async (req: any, res: Response, next: NextFunction) => {
    try {
      const categoryType = req?.query?.type;
      if (categoryType) {
        const category = await categoryService.findOne({ type: categoryType });
        return res.send(category);
      }
      const result = await categoryService.find();
      return res.send(result);
    } catch (error) {
      // 
    }
  }
);

router.post("/", async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { body } = req;
    const result = await categoryService.create(body);
    return res.send(result);
  } catch (error) {
    // 
  }
});

export default router;
