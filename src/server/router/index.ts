import { router } from '../service/trpc';
import { postRouter } from './post';
import { userRouter } from './user';

export const appRouter = router({
  post: postRouter,
  user: userRouter,
});

// This type will be used as a reference later...
export type AppRouter = typeof appRouter;
