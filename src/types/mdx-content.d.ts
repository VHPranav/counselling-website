// Typed `meta` export for MDX content files.
declare module "*.mdx" {
  import type { ComponentType } from "react";
  export const meta: Record<string, unknown>;
  const Component: ComponentType;
  export default Component;
}
