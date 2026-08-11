const legendItems = [
  { status: "Living", color: "bg-emerald-500" },
  { status: "Extinct", color: "bg-rose-500" },
  { status: "Mixed", color: "bg-amber-500" },
  { status: "Origin", color: "bg-sky-500" },
  { status: "Unknown", color: "bg-slate-500" },
];

export default function NodeLegend() {
  return (
    <div className="flex flex-wrap items-center gap-x-3 gap-y-2 rounded-xl border border-border/70 bg-background/80 px-3 py-2 shadow-sm backdrop-blur-md">
      {legendItems.map((item) => (
        <div key={item.status} className="flex items-center gap-1.5">
          <span className={`h-2.5 w-2.5 rounded-full ${item.color}`} />
          <span className="text-[11px] font-medium text-muted-foreground">
            {item.status}
          </span>
        </div>
      ))}
    </div>
  );
}
