import { isUndefined } from 'lodash-es';
import { z } from 'zod';

export type SafeActionResult<T> =
  | [
      {
        code: string | number;
        message?: string;
      },
    ]
  | [undefined, T];

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function safeAction<F extends () => Promise<any>>(
  action: F,
): () => Promise<SafeActionResult<Awaited<ReturnType<F>>>>;
export function safeAction<
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  I extends z.ZodType<any, any, any>,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  F extends (input: z.infer<I>) => Promise<any>,
>(
  inputSchema: I,
  action: F,
): (input: z.infer<I>) => Promise<SafeActionResult<Awaited<ReturnType<F>>>>;
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function safeAction(inputSchemaOrAction: any, action?: any) {
  if (action) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    return async (input: any) => {
      try {
        const inputResult = await inputSchemaOrAction.safeParse(input);
        if (!inputResult.success) {
          return [{ code: 401, message: 'Bad Input' }];
        }
        const res = await action(inputResult.data);

        return [undefined, res];
      } catch (ex) {
        if (!isUndefined((ex as { code: string | number }).code)) {
          return [ex];
        }
        console.error(ex);
        return [
          {
            code: 500,
            message: 'Internal Error',
          },
        ];
      }
    };
  } else {
    return async () => {
      try {
        const res = await inputSchemaOrAction();
        return [undefined, res];
      } catch (ex) {
        if (!isUndefined((ex as { code: string | number }).code)) {
          return [ex];
        }
        console.error(ex);
        return [
          {
            code: 500,
            message: 'Internal Error',
          },
        ];
      }
    };
  }
}
