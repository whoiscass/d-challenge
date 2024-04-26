import { env } from './common/utils/envConfig';
import mongoose from 'mongoose';
import { app, logger } from './server';

const start = async () => {
  try {
    await mongoose.connect("mongodb://root:root@mongodb:27017/");
    const server = app.listen(env.port, () => {
      const { host, port } = env;
      logger.info(`Server (Server running on port http://${host}:${port}`);
    });
    
    const onCloseSignal = () => {
      logger.info('sigint received, shutting down');
      server.close(() => {
        logger.info('server closed');
        process.exit();
      });
      setTimeout(() => process.exit(1), 10000).unref(); // Force shutdown after 10s
    };
    
    process.on('SIGINT', onCloseSignal);
    process.on('SIGTERM', onCloseSignal);
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

start();