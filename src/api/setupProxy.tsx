// src/setupProxy.ts
import { createProxyMiddleware } from 'http-proxy-middleware';

const setupProxy = (app: any) => {
  app.use(
    '/api',
    createProxyMiddleware({
      target: 'http://jointshfrontendapi-env-3.eba-z7bd6rn6.eu-west-1.elasticbeanstalk.com',
      changeOrigin: true,
      pathRewrite: {
        '^/api': '/products',
      },
    })
  );
};

export setupProxy;
