type SectionHeadingProps = {
  title: string;
  description?: string;
  align?: "left" | "center";
};

export function SectionHeading({ title, description, align = "left" }: SectionHeadingProps) {
  const isCenter = align === "center";

  return (
    <div className={isCenter ? "text-center" : "text-left"}>
      <div className={`mb-4 flex items-center gap-3 ${isCenter ? "justify-center" : "justify-start"}`}>
        <span className="h-[3px] w-8 rounded-full bg-brass-400" aria-hidden="true" />
      </div>
      <h2 className="text-balance font-display text-display-lg font-semibold text-ink dark:text-slate-50">
        {title}
      </h2>
      {description && (
        <p
          className={`mt-4 max-w-2xl text-base leading-relaxed text-slate-600 dark:text-slate-400 ${
            isCenter ? "mx-auto" : ""
          }`}
        >
          {description}
        </p>
      )}
    </div>
  );
}
