// import proxy from "express-http-proxy";

// export const proxyWithHeader = (serviceUrl) => {
//   return proxy(serviceUrl, {
//     proxyReqOptDecorator: (proxyReqOpts, srcReq) => {
//       if (srcReq.user) {
//         proxyReqOpts.headers["x-user-id"] = srcReq.user.userId;
//       }
//       return proxyReqOpts
//     },
//   });
// };

// import proxy from "express-http-proxy";

// export const proxyWithHeader = (serviceUrl) => {
//   return proxy(serviceUrl, {
//     proxyReqOptDecorator: (proxyReqOpts, srcReq) => {
//       if (srcReq.user?.userId) {
//         proxyReqOpts.headers["x-user-id"] = String(srcReq.user.userId);
//       }

//       return proxyReqOpts;
//     },
//   });
// };

import proxy from "express-http-proxy";

export const proxyWithHeader = (serviceUrl) => {
  return proxy(serviceUrl, {
    proxyReqOptDecorator: (proxyReqOpts, srcReq) => {
      delete proxyReqOpts.headers["x-user-id"];

      if (!srcReq.user?.userId) {
        const err = new Error("Missing authenticated user on proxied request");
        err.status = 401;
        throw err;
      }

      proxyReqOpts.headers["x-user-id"] = String(srcReq.user.userId);

      return proxyReqOpts;
    },
  });
};
