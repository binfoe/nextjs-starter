import { isString, isUndefined } from 'lodash-es';

export function getEnv(key: string, defaultValue?: string) {
  const v = process.env[key];
  if (!isString(v) || !v) {
    if (isUndefined(defaultValue)) {
      throw new Error(`env: ${key} is missing`);
    }
    return defaultValue;
  } else {
    return v;
  }
}
