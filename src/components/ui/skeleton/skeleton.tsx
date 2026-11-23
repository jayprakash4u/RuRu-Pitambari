import type { HTMLAttributes } from "react";
import { classNames } from "@/lib/class-names";

export type SkeletonProps = HTMLAttributes<HTMLDivElement>;
export function Skeleton({ className, ...props }: SkeletonProps) {
  return <div aria-hidden="true" className={classNames("skeleton", className)} {...props} />;
}
