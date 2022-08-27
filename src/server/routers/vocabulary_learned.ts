import { z } from "zod";
import db from "../../../lib/db";
import { createRouter } from "../createRouter";

const TIMES_TO_LEARN_VOCABULARY = 15;

export const vocabularyLearnedRouter = createRouter()
  .mutation('create', {
    input: z.object({
      vocabularyId: z.string(),
      status: z.string(),
      lessonId: z.string(),
    }),
    resolve: async ({ input, ctx }) => {
      const { vocabularyId, status, lessonId } = input;
      const vocabulary = await db.vocabularyLearned.findUnique({ where: { vocabularyId: input.vocabularyId } });

      if (!vocabulary) {
        const correctTimes = status === 'correct' ? 1 : 0;
        const progress = Math.ceil((correctTimes / TIMES_TO_LEARN_VOCABULARY) * 100);
        await db.vocabularyLearned.create({ data: { vocabularyId, lessonId, timesPractices: 1, userId: ctx.user!.id, correctTimes: status === 'correct' ? 1 : 0, progress } });

      } else {
        let correctTimes = status === 'correct' ? (vocabulary.correctTimes + 1) : (vocabulary.correctTimes - 1);
        let progress = Math.ceil((correctTimes / TIMES_TO_LEARN_VOCABULARY) * 100);

        if (progress < 0) {
          progress = 0;
          correctTimes = 0;
        }

        if (progress >= 100) {
          progress = 100;
          correctTimes = TIMES_TO_LEARN_VOCABULARY;
        }

        await db.vocabularyLearned.update(
          { data: {
            timesPractices: vocabulary.timesPractices + 1,
            correctTimes,
            progress,
          },
          where: { id: vocabulary.id } });
      }

      return { success: true }
    }
  })
  .query('getAll', {
    resolve: async ({ ctx }) => {
      const userId = ctx.user!.id;
      return await db.vocabularyLearned.findMany({
        where: { userId },
        include: { vocabulary: true },
        orderBy: { updatedAt: 'desc' }
      })
    }
  })
