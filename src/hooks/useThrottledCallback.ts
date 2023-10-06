import { useCallback, useEffect, useRef } from 'react';

const DEFAULT_THROTTLE_MS = 500;

const getRemainingTime = (lastTriggeredTime: number, throttleMs: number) => {
  const elapsedTime = Date.now() - lastTriggeredTime;
  const remainingTime = throttleMs - elapsedTime;

  return remainingTime < 0 ? 0 : remainingTime;
};

type Props = {
  callbackFn: <T>(args?: T) => any;
  callbackFromLastAction?: boolean;
  throttleMs?: number;
};

const useThrottledCallback = ({
  callbackFn,
  callbackFromLastAction = true,
  throttleMs = DEFAULT_THROTTLE_MS,
}: Props) => {
  const lastTriggered = useRef<number>(Date.now());
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const cancel = useCallback(() => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
  }, []);

  const throttledFn = useCallback(
    <T>(args?: T) => {
      let remainingTime = getRemainingTime(lastTriggered.current, throttleMs);

      if (remainingTime === 0) {
        lastTriggered.current = Date.now();
        callbackFn(args);
        cancel();
      } else if (callbackFromLastAction && !timeoutRef.current) {
        timeoutRef.current = setTimeout(() => {
          remainingTime = getRemainingTime(lastTriggered.current, throttleMs);

          if (remainingTime === 0) {
            lastTriggered.current = Date.now();
            callbackFn(args);
            cancel();
          }
        }, remainingTime);
      }
    },
    [callbackFn, callbackFromLastAction, cancel, throttleMs],
  );

  useEffect(() => cancel, [cancel]);

  return { cancel, throttledFn };
};

export default useThrottledCallback;
