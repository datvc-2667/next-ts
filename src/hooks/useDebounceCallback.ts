import { useRef, useEffect, useCallback } from 'react';

function useDebounceCallback<
  T extends (...args: any[]) => void | Promise<void>,
>(
  fn: T,
  ms: number | undefined = 200,
): [(...args: Parameters<T>) => ReturnType<T>, () => void] {
  const timerId = useRef<ReturnType<typeof setTimeout>>();
  const savedFn = useRef(fn);

  const cancel = useCallback(() => {
    if (timerId.current) {
      clearTimeout(timerId.current);
    }
  }, []);

  const debounced = useCallback(
    function (...args: Parameters<T>) {
      cancel();
      timerId.current = setTimeout(() => void savedFn.current(...args), ms);
    },
    [cancel, ms],
  );

  // update ref when function changes
  useEffect(() => {
    savedFn.current = fn;
  }, [fn]);

  // cancel on unmount
  useEffect(() => {
    return cancel;
  }, [cancel]);

  return [debounced as (...args: Parameters<T>) => ReturnType<T>, cancel];
}

export default useDebounceCallback;
