import { Children, cloneElement, isValidElement, type ReactElement, type ReactNode } from "react";

/** Split during React rendering, preserving inline emphasis, links and real spaces. */
export function WordText({ children }: { children: ReactNode }): ReactNode {
  return Children.map(children, (child) => {
    if (typeof child === "string" || typeof child === "number") {
      return String(child).split(/(\s+)/).map((piece, i) =>
        !piece || /^\s+$/.test(piece) ? piece : <span key={i} data-blur-word="">{piece}</span>
      );
    }
    if (isValidElement<{ children?: ReactNode; "data-blur-word"?: string }>(child) && typeof child.type === "string" && !["svg", "br", "img", "video"].includes(child.type) && child.props["data-blur-word"] === undefined) {
      return cloneElement(child as ReactElement<{ children?: ReactNode }>, {}, <WordText>{child.props.children}</WordText>);
    }
    return child;
  });
}
