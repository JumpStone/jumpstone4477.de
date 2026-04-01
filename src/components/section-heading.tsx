type SectionHeadingProps = {
  index: string;
  title: string;
};

export default function SectionHeading({ index, title }: SectionHeadingProps) {
  return (
    <div className="mb-5 flex items-end justify-between border-b-2 border-border pb-3">
      <h2 className="text-2xl font-heading uppercase tracking-wide md:text-3xl">
        {title}
      </h2>
      <span className="font-mono text-xs uppercase tracking-[0.24em] text-foreground/70">
        {index}
      </span>
    </div>
  );
}
