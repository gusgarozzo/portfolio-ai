interface StatusChipProps {
  score: number;
  label: string;
}

function scoreColor(score: number): string {
  if (score >= 90) return "bg-surface-deep text-accent border border-accent";
  if (score >= 70) return "bg-surface-deep text-text-secondary border border-border";
  return "bg-surface-deep text-text-muted border border-border";
}

export default function StatusChip({ score, label }: StatusChipProps) {
  return (
    <span
      data-testid="status-chip"
      className={`inline-flex items-center gap-1.5 px-2 py-0.5 data-mono ${scoreColor(score)}`}
    >
      <span className="pip" />
      <span>{score}</span>
      <span>{label}</span>
    </span>
  );
}
