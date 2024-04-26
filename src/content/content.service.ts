import { Content } from './content.schema';
import { Category } from "../categories/category.schema";

export const contentService = {
  create: async function (requestBody: any) {
    try {
      const newContent = new Content({ ...requestBody });
      return await newContent.save();
    } catch (error) {
      console.log(error)
    }
  },

  find: async function () {
    try {
      const result = await Content.find({})
      .populate('category')
      .populate('user')
      .populate('topic')
      .exec();
      return result;
    } catch (error) {
      return error;
    }
  },

  findOne: async function (id: string) {
    try {
      return await Content.findById(id);
    } catch (error) {
      // 
    }
  },
};
