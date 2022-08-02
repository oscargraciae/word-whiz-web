import * as trpc from '@trpc/server';
import * as trpcNext from '@trpc/server/adapters/next';
import { getSession } from 'next-auth/react';
import db from '../../lib/db';

export async function createContext (opts: trpcNext.CreateNextContextOptions) {
  const { req, res } = opts;
  const session = await getSession({ req })
  return { req, res, prisma: db, user: session?.user };
};

export type Context = trpc.inferAsyncReturnType<typeof createContext>;
