import path from 'path';
import dotenv from 'dotenv';

dotenv.config({ path: path.resolve(__dirname+'../../../../.env') })

// export const env = cleanEnv(process.env, {
// //   NODE_ENV: str({ devDefault: testOnly('test'), choices: ['development', 'production', 'test'] }),
//   HOST: host({ devDefault: testOnly('localhost') }),
//   PORT: port({ devDefault: testOnly(3000) }),
// //   CORS_ORIGIN: str({ devDefault: testOnly('http://localhost:3000') }),
// //   COMMON_RATE_LIMIT_MAX_REQUESTS: num({ devDefault: testOnly(1000) }),
// //   COMMON_RATE_LIMIT_WINDOW_MS: num({ devDefault: testOnly(1000) }),
// });

export const env = {
  host: process.env.HOST,
  port: process.env.PORT,
  jwtSecretKey: process.env.JWT_SECRET_KEY
}