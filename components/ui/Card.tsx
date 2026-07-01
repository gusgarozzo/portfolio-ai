import type { ReactNode } from "react";

interface CardProps {
  children: ReactNode;
  header?: ReactNode;
  footer?: ReactNode;
  className?: string;
}

export default function Card({
  children,
  header,
  footer,
  className = "",
}: CardProps) {
  return (
    <div
      data-testid="card"
      className={`bg-surface border border-border ${className}`}
    >
      {header && (
        <div className="px-8 pt-8 pb-0">
          <span className="caption-mono text-text-muted">{header}</span>
        </div>
      )}
      <div className="p-8">{children}</div>
      {footer && (
        <div className="px-8 pb-8 pt-0">
          <span className="label-mono text-text-muted">
            {footer}
          </span>
        </div>
      )}
    </div>
  );
}
