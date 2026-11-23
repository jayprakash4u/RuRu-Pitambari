import type { InputHTMLAttributes, ReactNode } from "react";
import { classNames } from "@/lib/class-names";

export type RadioProps = Omit<InputHTMLAttributes<HTMLInputElement>, "type"> & {
  label?: ReactNode;
};
export function Radio({ className, label, ...props }: RadioProps) {
  const control = (
    <input className={classNames("choice__control", className)} type="radio" {...props} />
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
