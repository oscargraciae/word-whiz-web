import db from "../../../lib/db";
import { createRouter } from "../createRouter";

export const topicRouter = createRouter()
  .query('getAll', {
    resolve: async () => {
      return {
        topics: await db.topic.findMany({ orderBy: { name: 'asc' } }),
      };
    }
  })
