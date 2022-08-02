import { createRouter } from "../createRouter";

import { cardRouter } from "./card";

export const appRouter = createRouter()
  .merge("card.", cardRouter)

export type AppRouter = typeof appRouter;
