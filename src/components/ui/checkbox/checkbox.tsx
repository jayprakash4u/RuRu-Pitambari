import type { InputHTMLAttributes, ReactNode } from "react";
import { classNames } from "@/lib/class-names";

export type CheckboxProps = Omit<InputHTMLAttributes<HTMLInputElement>, "type"> & {
  label?: ReactNode;
};
export function Checkbox({ className, label, ...props }: CheckboxProps) {
  const control = (
    <input className={classNames("choice__control", className)} type="checkbox" {...props} />
  );
  return label ? (
    <label className="choice">
      {control}
      <span>{label}</span>
    </label>
  ) : (
    control
  );
}
