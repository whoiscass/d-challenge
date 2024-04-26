import { Topic } from './topic.schema';
import { Category } from "../categories/category.schema";

export const topicService = {
  create: async function (requestBody: any) {
    try {
      const newTopic = new Topic({ ...requestBody });
      return await newTopic.save();
    } catch (error) {
      console.log(error)
    }
  },

  find: async function () {
    try {
      const result = await Topic.find({}).populate('category').exec();
      return result;
    } catch (error) {
      return error;
    }
  },

  findOne: async function (query: any) {
    try {
      return await Topic.findOne(query).populate('category').exec();
    } catch (error) {
      // 
    }
  },
};
