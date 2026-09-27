import "@testing-library/jest-dom/vitest";

/**
 * jsdom doesn't implement matchMedia — Framer Motion's useReducedMotion and
 * our own usePrefersReducedMotion / Hero viewport check all query it
 * directly. Defaulting `matches` to false is the safe choice for tests:
 * components render as they would with no reduced-motion preference and no
 * narrow viewport, which is the common case.
 */
if (!window.matchMedia) {
  window.matchMedia = (query: string) =>
    ({
      matches: false,
      media: query,
      onchange: null,
      addListener: () => {},
      removeListener: () => {},
      addEventListener: () => {},
      removeEventListener: () => {},
      dispatchEvent: () => false,
    }) as unknown as MediaQueryList;
}

/**
 * jsdom has no IntersectionObserver — used by useActiveSection, CountUpStat,
 * and Framer Motion's `whileInView`. A no-op stub is enough for these
 * components to mount without throwing; tests that need reveal/observer
 * behaviour itself should mock this per-test instead.
 */
class MockIntersectionObserver implements IntersectionObserver {
  readonly root: Element | Document | null = null;
  readonly rootMargin: string = "";
  readonly thresholds: ReadonlyArray<number> = [];
  observe = () => {};
  unobserve = () => {};
  disconnect = () => {};
  takeRecords = () => [];
}

// @ts-expect-error — test-environment stub, not a spec-complete implementation
window.IntersectionObserver = MockIntersectionObserver;

// jsdom logs a "not implemented" warning for scrollIntoView; several
// components (Navbar, Hero, Experience) call it on click.
window.HTMLElement.prototype.scrollIntoView = () => {};
