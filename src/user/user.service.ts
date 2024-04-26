import { encrypt } from "../common/utils/hash";
import { jwtUtil } from "../common/utils/jwtUtil";
import { User } from "./user.schema";

export const userService = {
  create: async function (requestBody: any) {
    try {
      const { name, email, password, role } = requestBody;
      const hashPassword = await encrypt.hash(password);
      const user = new User({ name, email, password: hashPassword, role });
      const result = await user.save();
      return result;
    } catch (error) {
      return error;
    }
  },

  find: async function () {
    try {
      const result = await User.find({});
      return result;
    } catch (error) {
      return error;
    }
  },

  findOne: async function (email: string, password: string) {
    try {
      const user = await User.findOne({ email });
      if (user === null || user === undefined) {
        throw new Error('user not found');
      }
      const allowed = await encrypt.compare(password, user?.password as string);

      if (!allowed) {
        return;
      }

      const token = jwtUtil.sign(user);

      return { authentication: token, user };
    } catch (error) {
      return error;
    }
  },
};
