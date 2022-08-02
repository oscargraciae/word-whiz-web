import { z } from 'zod';
import db from '../../../lib/db';
import { createRouter } from '../createRouter';

export const cardRouter = createRouter()
  .query('get', {
    input: z.object({
        slug: z.string().nonempty(),
      }),
    async resolve({ input }) {
      console.log('get card=========>', input);
      return await db.card.findFirst({
        where: { slug: input.slug },
        include: {
          cardSocialLinks: true,
        }
      });
    },
  })
  .mutation('create', {
    input: z.object({
      url: z.string(),
    }),
    async resolve({ input, ctx }) {
      const { url } = input;
      console.log('ctx.user', ctx.user);
      return await db.card.create({
        data: {
          slug: url.toLowerCase().replace(/\s/g, '-'),
          name: ctx.user!.name!,
          userId: ctx.user!.id,
          description: 'No se por que tengo que poner una descripcion',
          cover: 'https://picsum.photos/600/200',
        }
      })
    }
  })
  .mutation('update', {
    input: z.object({
      id: z.string().nonempty(),
      name: z.string(),
      description: z.string().nullable(),
    }),
    resolve: async ({ input }) => {
      const { id, name, description } = input
      return {
        isUpdated: await db.card.update({
          data: { name, description },
          where: { id },
        })
      }
    }
  })
