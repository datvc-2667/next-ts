import { useEffect, useRef, useState } from 'react';

type TUseIntersectionParams = {
  enabled: boolean;
  onIntersect: () => void;
};
type TOnIntersect = () => void;
type ObserverInstanceCallback = (entry: IntersectionObserverEntry) => void;

function createObserver() {
  const elements = new Map<Element, Array<ObserverInstanceCallback>>();
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      elements.get(entry.target)?.forEach(callback => {
        callback(entry);
      });
    });
  });

  return {
    observer,
    elements,
  };
}

function observe(element: Element, callback: ObserverInstanceCallback) {
  // An observer with the same options can be reused, so lets use this fact
  const { observer, elements } = createObserver();

  // Register the callback listener for this element
  const callbacks = elements.get(element) || [];
  if (!elements.has(element)) {
    elements.set(element, callbacks);
  }

  callbacks.push(callback);
  observer.observe(element);

  return function unobserve() {
    // Remove the callback from the callback list
    callbacks.splice(callbacks.indexOf(callback), 1);

    if (!callbacks.length) {
      // No more callback exists for element, so destroy it
      elements.delete(element);
      observer.unobserve(element);
    }

    if (!elements.size) {
      // No more elements are being observer by this instance, so destroy it
      observer.disconnect();
    }
  };
}

export default function useIntersection({
  enabled = true,
  onIntersect,
}: TUseIntersectionParams) {
  const [intersectionRef, setIntersectionRef] = useState<Element | null>(null);
  const callback = useRef<TOnIntersect | undefined>();
  const [entryState, setEntryState] = useState<
    IntersectionObserverEntry | undefined
  >();

  callback.current = onIntersect;

  useEffect(() => {
    if (!enabled || !intersectionRef) {
      return () => {};
    }

    const unobserve = observe(intersectionRef, entry => {
      setEntryState(entry);

      if (callback.current && entry.isIntersecting) {
        callback.current();
      }
    });

    return () => unobserve();
  }, [enabled, intersectionRef]);

  const entryTarget = entryState?.target;
  const previousEntryTarget = useRef<Element | undefined>();

  if (
    !intersectionRef &&
    entryTarget &&
    previousEntryTarget.current !== entryTarget
  ) {
    // If we don't have a node ref, then reset the state
    // This ensures we correctly reflect the current state - If you aren't observing anything, then nothing is inView
    previousEntryTarget.current = entryTarget;
    setEntryState(undefined);
  }

  const result = [setIntersectionRef] as [(node?: Element | null) => void] & {
    intersectionRef: (node?: Element | null) => void;
  };

  // Support object destructuring, by adding the specific values.
  result.intersectionRef = result[0];

  return result;
}
