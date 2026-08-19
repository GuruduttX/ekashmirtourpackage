"use client";

import { useCallback, useSyncExternalStore } from "react";

/**
 * Reads a CSS media query as React state.
 *
 * useSyncExternalStore rather than useState + useEffect on purpose: it takes a
 * separate server snapshot, so the server and the first client render agree by
 * construction and React never warns about a hydration mismatch. The value then
 * corrects itself in the same commit as hydration.
 *
 * The server snapshot is always `false` — there is no viewport on the server, so
 * the only honest answer is "this query does not match". Phrase queries so that
 * `false` is the layout you want server-rendered: prefer `min-width` (desktop
 * opts in) over `max-width` (mobile opts in), and mobile gets one frame of the
 * desktop answer before hydration corrects it.
 *
 * Only reach for this when a breakpoint has to change *behaviour* — how many
 * items a page holds, whether a carousel autoplays. Anything that is purely
 * visual belongs in a CSS breakpoint, which costs no JS and is right before
 * hydration.
 */
export default function useMediaQuery(query: string): boolean {
  const subscribe = useCallback(
    (onChange: () => void) => {
      const list = window.matchMedia(query);
      list.addEventListener("change", onChange);
      return () => list.removeEventListener("change", onChange);
    },
    [query],
  );

  return useSyncExternalStore(
    subscribe,
    () => window.matchMedia(query).matches,
    () => false,
  );
}
