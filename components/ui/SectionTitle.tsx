interface SectionTitleProps {
  eyebrow: string;
  title: string;
}

export default function SectionTitle({ eyebrow, title }: SectionTitleProps) {
  return (
    <div data-testid="section-title" className="mb-12">
      <p className="label-mono text-accent mb-3">{eyebrow}</p>
      <h2 className="headline-md text-text-primary">{title}</h2>
    </div>
  );
}
