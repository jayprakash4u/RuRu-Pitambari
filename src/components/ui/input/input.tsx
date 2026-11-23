import type { InputHTMLAttributes } from "react";
import { classNames } from "@/lib/class-names";

export type InputProps = InputHTMLAttributes<HTMLInputElement>;
export function Input({ className, ...props }: InputProps) {
  return <input className={classNames("input", className)} {...props} />;
}
