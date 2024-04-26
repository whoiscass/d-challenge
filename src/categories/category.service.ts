import { Category } from "./category.schema";

export const categoryService = {
  create: async function (requestBody: any) {
    try {
      const newCategory = new Category({ ...requestBody });
      return await newCategory.save();
    } catch (error) {
      console.log(error)
    }
  },

  find: async function () {
    try {
      const result = await Category.find({});
      return result;
    } catch (error) {
      return error;
    }
  },

  findOne: async function (query: any) {
    try {
      return await Category.findOne(query);
    } catch (error) {
      // 
    }
  },
};
