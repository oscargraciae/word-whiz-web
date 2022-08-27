import { z } from "zod";
import db from "../../../lib/db";
import { createRouter } from "../createRouter";

export const userRouter = createRouter()
  .mutation('update-score', {
    input: z.object({
      score: z.number(),
    }),
    resolve: async ({ input, ctx }) => {
      const user = await db.user.findUnique({ where: { id: ctx.user!.id } });

      if (!user) return { error: 'User not found' };

      await db.user.update( { data: { score: user.score + input.score }, where: { id: user.id } } );
      return {
        isUpdated: true,
      }
    }
  })
