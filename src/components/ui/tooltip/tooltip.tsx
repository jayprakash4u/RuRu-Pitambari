import type { HTMLAttributes, ReactNode } from "react";
import { classNames } from "@/lib/class-names";

export type TooltipProps = HTMLAttributes<HTMLSpanElement> & { content: ReactNode };
export function Tooltip({ children, className, content, id, ...props }: TooltipProps) {
  const contentId = id ? `${id}-content` : undefined;
  return (
    <span className={classNames("tooltip", className)} id={id} {...props}>
      <span aria-describedby={contentId} className="tooltip__trigger">
        {children}
      </span>
      <span className="tooltip__content" id={contentId} role="tooltip">
        {content}
      </span>
    </span>
  );
}
