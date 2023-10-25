import { isEqual } from 'lodash-es';
import { DependencyList, EffectCallback, useEffect, useRef } from 'react';

export function usePrevious<T>(value: T): T | undefined {
  const ref = useRef<T>();
  useEffect(() => {
    ref.current = value;
  });
  return ref.current;
}

export function useDeepEqualEffect(effect: EffectCallback, deps?: DependencyList) {
  const previousDeps = usePrevious(deps);

  useEffect(() => {
    if (deps === undefined || deps === null || !isEqual(deps, previousDeps)) {
      return effect();
    }
  });
}
