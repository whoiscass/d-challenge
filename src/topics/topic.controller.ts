import { Request, Response, NextFunction, Router } from "express";
import { authUtil } from "../common/utils/authUltil";
import { topicService } from "./topic.service";

const router = Router();

router.get(
  "/",
  // authUtil.validate,
  async (req: any, res: Response, next: NextFunction) => {
    try {
      const topicType = req?.query?.type;
      if (topicType) {
        const topic = await topicService.findOne({ type: topicType });
        return res.send(topic);
      }
      const result = await topicService.find();
      return res.send(result);
    } catch (error) {
      // 
    }
  }
);

router.post("/", async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { body } = req;
    const result = await topicService.create(body);
    return res.send(result);
  } catch (error) {
    // 
  }
});

export default router;
