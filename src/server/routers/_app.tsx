import { createRouter } from "../createRouter";

import { cardRouter } from "./card";
import { lessonRouter } from "./lesson";
import { lessonUserRouter } from "./lesson_user";
import { topicRouter } from "./topics";
import { userRouter } from "./user";
import { vocabularyLearnedRouter } from "./vocabulary_learned";

export const appRouter = createRouter()
  .merge("card.", cardRouter)
  .merge("lesson.", lessonRouter)
  .merge("topic.", topicRouter)
  .merge("user.", userRouter)
  .merge('vocabulary_learned.', vocabularyLearnedRouter)
  .merge('lesson_user.', lessonUserRouter)

export type AppRouter = typeof appRouter;
