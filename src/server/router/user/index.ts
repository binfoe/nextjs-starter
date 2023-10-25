import { login } from './login';
import { router } from '@server/service/trpc';

export const userRouter = router({
  login: login,
});
