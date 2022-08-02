import { createRouter } from "../createRouter";

export const itemRouter = createRouter()
  .query('get', {
    resolve: async () => {
      return {
        items: []
      }
    }
  })
