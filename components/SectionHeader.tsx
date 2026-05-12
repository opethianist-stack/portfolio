interface SectionHeaderProps {
  num: string;
  title: string;
  desc?: string;
}

export default function SectionHeader({ num, title, desc }: SectionHeaderProps) {
  return (
    <div className="mb-16 grid grid-cols-1 gap-6 md:mb-20 md:grid-cols-[200px_1fr] md:gap-10">
      <div
        className="self-start pt-2 text-xs font-semibold uppercase tracking-[0.18em] text-accent"
        style={{ borderTop: '1px solid #1a1f30' }}
      >
        {num}
      </div>
      <div>
        <h2 className="text-2xl font-bold tracking-tight-3 text-navy-deep md:text-3xl lg:text-4xl">
          {title}
        </h2>
        {desc && (
          <p className="mt-3.5 max-w-2xl text-base leading-[1.7] text-gray-1">{desc}</p>
        )}
      </div>
    </div>
  );
}
