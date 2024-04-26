import jwt, { JsonWebTokenError } from 'jsonwebtoken';

import { env } from "./envConfig";
import e from 'express';
export const jwtUtil = {
    sign: function(data: any) {
        return jwt.sign({
            exp: Math.floor(Date.now() / 1000) + (60 * 60),
            data
          }, env.jwtSecretKey as string);
    },

    verify: function(token: string) {
        try {
            const result = jwt.verify(token, env.jwtSecretKey as string);
            return result;
        } catch (error: any) {
            throw new Error(error.message);
        }
    }
}