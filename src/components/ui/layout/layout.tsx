import type { CSSProperties, HTMLAttributes } from "react";
import { classNames } from "@/lib/class-names";

type ContainerWidth = "text" | "default" | "wide";
export type ContainerProps = HTMLAttributes<HTMLDivElement> & { width?: ContainerWidth };
export function Container({ className, width = "default", ...props }: ContainerProps) {
  return (
    <div
      className={classNames(
        "container",
        width === "text" && "container--text",
        width === "wide" && "container--wide",
        className,
      )}
      {...props}
    />
  );
}
type SpacingStyle = CSSProperties & { "--stack-space"?: string; "--cluster-space"?: string };
export type StackProps = HTMLAttributes<HTMLDivElement> & { space?: string };
export function Stack({ className, space, style, ...props }: StackProps) {
  return (
    <div
      className={classNames("stack", className)}
      style={{ ...style, "--stack-space": space } as SpacingStyle}
      {...props}
    />
  );
}
export type ClusterProps = HTMLAttributes<HTMLDivElement> & { space?: string };
export function Cluster({ className, space, style, ...props }: ClusterProps) {
  return (
    <div
      className={classNames("cluster", className)}
      style={{ ...style, "--cluster-space": space } as SpacingStyle}
      {...props}
    />
  );
}
