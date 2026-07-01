export type ScoreLevel = "high" | "medium" | "low";

export function scoreLevel(score: number): ScoreLevel {
  if (score >= 90) return "high";
  if (score >= 70) return "medium";
  return "low";
}

export function scoreColor(score: number): string {
  if (score >= 90) return "bg-green-900/30 text-green-400";
  if (score >= 70) return "bg-yellow-900/30 text-yellow-400";
  return "bg-red-900/30 text-red-400";
}
