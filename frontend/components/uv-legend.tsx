export function UVLegend() {
  const levels = [
    { label: "0-2 Low", color: "bg-[#40b040]" },
    { label: "3-5 Mod", color: "bg-[#f0c040]" },
    { label: "6+ High", color: "bg-[#d04030]" },
  ]

  return (
    <div className="mt-8 border-4 border-border bg-card p-4 shadow-[4px_4px_0px_0px] shadow-border/80">
      <p className="text-xs text-card-foreground font-bold uppercase mb-3">UV Index Scale</p>
      <div className="flex flex-wrap items-center gap-4">
        {levels.map((l) => (
          <div key={l.label} className="flex items-center gap-2">
            <span className={`w-3 h-3 ${l.color} border-2 border-current/20`} />
            <span className="text-xs text-muted-foreground">{l.label}</span>
          </div>
        ))}
      </div>
      <p className="text-xs text-muted-foreground/60 mt-3">
        {'* Data is illustrative. Check local forecasts.'}
      </p>
    </div>
  )
}
