import { z } from "zod";
import db from "../../../lib/db";
import { createRouter } from "../createRouter";

export const lessonRouter = createRouter()
  .query('get', {
    input: z.object({
      id: z.string(),
    }),
    resolve: async ({ input }) => {
      return {
        lesson: await db.lesson.findUnique({
          where: { id: input.id },
          include: {
            vocabulary: {
              where: { isActive: true },
              include: {
                vocabularyLerned: true
              }
            },
          }
        }),
      }
    }
  })
  .query('getAll', {
    input: z.object({
      topicId: z.string().nonempty(),
    }),
    resolve: async ({ input }) => {
      const { topicId } = input;
      return {
        lessons: await db.lesson.findMany({ where: { isActive: true, topicId }, orderBy: { name: 'asc' } }),
      }
    }
  })
