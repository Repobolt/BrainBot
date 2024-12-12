import { Router } from "express";
import userRout from "./user-routes.js";
import chatRout from "./chat-rout.js";
const appRouter = Router();
appRouter.use("/user", userRout); //app .ts me api/v1 pe aane ke baad appRoute ko redirect hoga,
// agar request user ka hua to upar wala rout samhalega
appRouter.use("/chat", chatRout);
export default appRouter;
//# sourceMappingURL=index.js.map