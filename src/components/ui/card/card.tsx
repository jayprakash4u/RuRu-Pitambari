import type { HTMLAttributes } from "react";
import { classNames } from "@/lib/class-names";

export type CardProps = HTMLAttributes<HTMLDivElement> & { interactive?: boolean };
export function Card({ className, interactive = false, ...props }: CardProps) {
  return (
    <div className={classNames("card", interactive && "card--interactive", className)} {...props} />
  );
}
export function CardHeader({ className, ...props }: HTMLAttributes<HTMLDivElement>) {
  return <div className={classNames("card__header", className)} {...props} />;
}
export function CardTitle({ className, ...props }: HTMLAttributes<HTMLHeadingElement>) {
  return <h3 className={classNames("card__title", className)} {...props} />;
}
export function CardDescription({ className, ...props }: HTMLAttributes<HTMLParagraphElement>) {
  return <p className={classNames("card__description", className)} {...props} />;
}
export function CardContent({ className, ...props }: HTMLAttributes<HTMLDivElement>) {
  return <div className={classNames("card__content", className)} {...props} />;
}
export function CardFooter({ className, ...props }: HTMLAttributes<HTMLDivElement>) {
  return <div className={classNames("card__footer", className)} {...props} />;
}
