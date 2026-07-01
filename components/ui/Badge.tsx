import type { ReactNode } from "react";

interface BadgeProps {
  variant: "primary" | "secondary" | "tertiary";
  children: ReactNode;
}

const variantStyles: Record<BadgeProps["variant"], string> = {
  primary: "bg-surface-accent text-accent border border-border",
  secondary: "bg-surface text-text-secondary border border-border",
  tertiary: "bg-surface-deep text-text-muted border border-border",
};

export default function Badge({ variant, children }: BadgeProps) {
  return (
    <span
      data-testid="badge"
      className={`inline-block px-3 py-1 data-mono ${variantStyles[variant]}`}
    >
      {children}
    </span>
  );
}
