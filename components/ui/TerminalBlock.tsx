interface TerminalLine {
  text: string;
  color?: string;
}

interface TerminalBlockProps {
  lines: TerminalLine[];
}

const keywordColor = "#c5a059";
const commentColor = "#52525b";

export default function TerminalBlock({ lines }: TerminalBlockProps) {
  return (
    <div data-testid="terminal-block" className="bg-surface-deep px-6 py-4 data-mono">
      {lines.map((line, i) => (
        <p
          key={i}
          className="leading-relaxed"
          style={line.color ? { color: line.color } : undefined}
        >
          {line.text}
        </p>
      ))}
    </div>
  );
}

export { keywordColor, commentColor };
