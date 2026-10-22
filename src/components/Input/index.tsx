import type { InputHTMLAttributes } from "react";

interface inputProps extends InputHTMLAttributes<HTMLInputElement> {}

export function Input(props: inputProps) {
  return (
    <input
      className="border-1 h-9 rounded-md outline-none px-2 mb-3"
      {...props}
    />
  );
}
