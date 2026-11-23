import type { HTMLAttributes } from "react";
import { classNames } from "@/lib/class-names";

type BadgeTone = "brand" | "neutral" | "success" | "warning" | "error";
export type BadgeProps = HTMLAttributes<HTMLSpanElement> & { tone?: BadgeTone };
export function Badge({ className, tone = "brand", ...props }: BadgeProps) {
  return (
    <span
      className={classNames("badge", tone !== "brand" && `badge--${tone}`, className)}
      {...props}
    />
  );
}
