import type { HTMLAttributes, ReactNode } from "react";
import { classNames } from "@/lib/class-names";

export type FieldProps = HTMLAttributes<HTMLDivElement> & {
  error?: string;
  hint?: string;
  label: ReactNode;
  labelFor: string;
};
export function Field({ children, className, error, hint, label, labelFor, ...props }: FieldProps) {
  return (
    <div className={classNames("field", className)} {...props}>
      <label className="field__label" htmlFor={labelFor}>
        {label}
      </label>
      {children}
      {error ? (
        <p className="field__error" id={`${labelFor}-error`} role="alert">
          {error}
        </p>
      ) : null}
      {!error && hint ? (
        <p className="field__hint" id={`${labelFor}-hint`}>
          {hint}
        </p>
      ) : null}
    </div>
  );
}
