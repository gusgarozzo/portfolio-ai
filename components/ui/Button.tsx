import type { ButtonHTMLAttributes, ReactNode } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant: "primary" | "secondary" | "ghost";
  children: ReactNode;
}

const baseStyles =
  "px-6 py-3 text-sm font-medium transition-all duration-150 disabled:opacity-50 disabled:cursor-not-allowed";

const variantStyles: Record<ButtonProps["variant"], string> = {
  primary:
    "bg-accent text-black hover:brightness-110",
  secondary:
    "bg-transparent text-text-primary border border-border hover:border-accent",
  ghost:
    "bg-transparent text-text-secondary label-mono hover:text-accent transition-colors underline-offset-4",
};

export default function Button({
  variant,
  children,
  className = "",
  ...props
}: ButtonProps) {
  return (
    <button
      data-testid="button"
      className={`${baseStyles} ${variantStyles[variant]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}
