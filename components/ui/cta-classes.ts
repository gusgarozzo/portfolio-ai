export const cta = {
  primary:
    "inline-flex items-center justify-center gap-2 rounded-md px-6 min-h-11 text-[15px] font-medium leading-none bg-signal text-white hover:bg-signal-strong transition-colors",
  secondary:
    "inline-flex items-center justify-center gap-2 rounded-md px-6 min-h-11 text-[15px] font-medium leading-none bg-paper-2/70 text-ink border border-line hover:border-signal hover:text-signal transition-colors",
  ghost:
    "inline-flex items-center justify-center gap-2 rounded-md px-4 min-h-11 text-[15px] font-medium leading-none text-ink-soft hover:text-signal transition-colors",
  text: "inline-flex items-center gap-1.5 text-sm font-medium text-ink-soft hover:text-signal py-2 min-h-11 transition-colors",
} as const;