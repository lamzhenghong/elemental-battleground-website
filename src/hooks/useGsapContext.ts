import type { DependencyList, RefObject } from 'react';
import { useLayoutEffect } from 'react';

type GsapApi = typeof import('gsap')['default'];
type ScrollTriggerApi = typeof import('gsap/ScrollTrigger')['ScrollTrigger'];

interface MotionApi {
  gsap: GsapApi;
  ScrollTrigger: ScrollTriggerApi;
}

export function useGsapContext(
  scope: RefObject<HTMLElement | null>,
  setup: (api: MotionApi) => void,
  dependencies: DependencyList,
  disabled = false
) {
  useLayoutEffect(() => {
    if (disabled || import.meta.env.MODE === 'test' || !scope.current) return;
    let cancelled = false;
    let context: ReturnType<GsapApi['context']> | null = null;

    void Promise.all([import('gsap'), import('gsap/ScrollTrigger')]).then(([gsapModule, triggerModule]) => {
      if (cancelled || !scope.current) return;
      const gsap = gsapModule.default;
      const ScrollTrigger = triggerModule.ScrollTrigger;
      gsap.registerPlugin(ScrollTrigger);
      context = gsap.context(() => setup({ gsap, ScrollTrigger }), scope);
    });

    return () => {
      cancelled = true;
      context?.revert();
    };
    // The caller owns and explicitly supplies timeline dependencies.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [disabled, scope, ...dependencies]);
}
