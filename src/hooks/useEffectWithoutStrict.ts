import { DependencyList, EffectCallback, useEffect, useRef } from 'react';

const useEffectWithoutStrict = (fn: EffectCallback, deps: DependencyList) => {
  const isMainMount = useRef(process.env.NODE_ENV !== 'development');

  useEffect(() => {
    if (isMainMount.current) return fn();
    else isMainMount.current = true;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);
};

export default useEffectWithoutStrict;
