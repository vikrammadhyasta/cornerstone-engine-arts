import { cn } from "@/lib/utils";
import { CREDENTIAL_CATEGORIES, type CredentialCategory } from "@/lib/credentials";

export type FilterValue = "all" | CredentialCategory;

export function CredentialFilters({
  value,
  onChange,
  counts,
}: {
  value: FilterValue;
  onChange: (next: FilterValue) => void;
  counts: Record<string, number>;
}) {
  return (
    <div
      role="tablist"
      aria-label="Filter credentials by category"
      className="-mx-1 flex snap-x gap-2 overflow-x-auto px-1 pb-1"
    >
      {CREDENTIAL_CATEGORIES.map((category) => {
        const active = value === category.id;
        const count = counts[category.id] ?? 0;
        return (
          <button
            key={category.id}
            role="tab"
            type="button"
            aria-selected={active}
            disabled={count === 0}
            onClick={() => onChange(category.id)}
            className={cn(
              "shrink-0 snap-start rounded-full border px-3.5 py-1.5 font-mono text-[0.6875rem] tracking-[0.16em] uppercase transition-colors duration-200",
              "focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none",
              active
                ? "border-primary/60 bg-primary/10 text-primary"
                : "border-border bg-surface/50 text-muted-foreground hover:border-primary/40 hover:text-foreground",
              count === 0 && "cursor-not-allowed opacity-40 hover:border-border",
            )}
          >
            {category.label}
            <span className="ml-2 opacity-60">{count}</span>
          </button>
        );
      })}
    </div>
  );
}
