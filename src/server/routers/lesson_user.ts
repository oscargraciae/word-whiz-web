import { z } from "zod";
import db from "../../../lib/db";
import { createRouter } from "../createRouter";

export const lessonUserRouter = createRouter()
  .mutation('create', {
    input: z.object({
      lessonId: z.string(),
    }),
    resolve: async ({ input, ctx }) => {
      const { lessonId }: { lessonId: string } = input;
      const userId: string = ctx.user!.id;
      const lessonUser = await db.lessonUser.findFirst({ where: { lessonId, userId } });

      const vocabularyLesson = await db.vocabularyLearned.findMany({ where: { lessonId, userId } });
      const average = vocabularyLesson.reduce((a, b) => a + b.progress, 0) / vocabularyLesson.length;

      if (!lessonUser) {
        await db.lessonUser.create({ data: { lessonId, userId, progress: 0 } });
      } else {
        await db.lessonUser.update({ data: { progress: Math.floor(average) }, where: { id: lessonUser.id } });
      }
      return { lessonUser }
    }
  })
  .query('lastLessons', {
    resolve: async ({ ctx }) => {
      const userId: string = ctx.user!.id;
      return await db.lessonUser.findMany({
        where: { userId, progress: { lt: 100 } },
        include: {
          lesson: {
            include: {
              lessonUsers: true
            }
          },
        },
        orderBy: {
          updatedAt: 'desc'
        }
      })
    }
  })
