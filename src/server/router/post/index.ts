import { list } from './list';
import { router } from '@server/service/trpc';

export const postRouter = router({
  list: list,
});
