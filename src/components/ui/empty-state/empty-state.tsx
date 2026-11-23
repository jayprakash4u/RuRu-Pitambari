import type { HTMLAttributes, ReactNode } from "react";
import { classNames } from "@/lib/class-names";

export type EmptyStateProps = HTMLAttributes<HTMLDivElement> & {
  action?: ReactNode;
  description?: ReactNode;
  icon?: ReactNode;
  title: ReactNode;
};
export function EmptyState({
  action,
  className,
  description,
  icon,
  title,
  ...props
}: EmptyStateProps) {
  return (
    <div className={classNames("empty-state", className)} {...props}>
      {icon ? (
        <div aria-hidden="true" className="empty-state__icon">
          {icon}
        </div>
      ) : null}
      <h3 className="empty-state__title">{title}</h3>
      {description ? <p className="empty-state__description">{description}</p> : null}
      {action ? <div className="empty-state__action">{action}</div> : null}
    </div>
  );
}
