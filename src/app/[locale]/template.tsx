import { ViewTransition, type ReactNode } from "react";

/**
 * Templates remount on every navigation, so this ViewTransition "enters" and
 * "exits" once per route change. default="none" keeps it from animating
 * anything else (Suspense reveals, state updates), which avoids aborted
 * transitions during page load. Styles live in globals.css (.page-in/.page-out).
 */
export default function Template({ children }: { children: ReactNode }) {
  return (
    <ViewTransition enter="page-in" exit="page-out" default="none">
      <div>{children}</div>
    </ViewTransition>
  );
}
