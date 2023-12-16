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
                vocabularyLearned: true
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
        lessons: await db.lesson.findMany({
          where: { isActive: true, topicId },
          include: {
            lessonUsers: true,
          },
          orderBy: { name: 'asc' }
        }),
      }
    }
  })
  .query('getWords', {
    resolve: async ({ input }) => {
      return {
        words: await db.vocabulary.findMany({
          select: {
            id: true,
            wordEnglish: true,
          },
          skip: 50,
          take: 10,
        }),
      }
    }
  })
