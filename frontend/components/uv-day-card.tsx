"use client"

import { cn } from "@/lib/utils"
import { PixelWeatherIcon } from "./pixel-weather-icon"

interface UVDayCardProps {
  dayName: string
  date: string
  uvIndex: number
  level: string
  advice: string
  isToday?: boolean
}

function getUVColor(level: string) {
  switch (level.toLowerCase()) {
    case "low":
      return "text-[#40b040]"
    case "moderate":
      return "text-[#f0c040]"
    case "high":
      return "text-[#d04030]"
    default:
      return "text-[#40b040]"
  }
}

function getLevelBg(level: string) {
  switch (level.toLowerCase()) {
    case "low":
      return "bg-[#40b040] text-[#1a1a1a]"
    case "moderate":
      return "bg-[#f0c040] text-[#1a1a1a]"
    case "high":
      return "bg-[#d04030] text-[#f5f0dc]"
    default:
      return "bg-[#40b040] text-[#1a1a1a]"
  }
}

export function UVDayCard({ dayName, date, uvIndex, level, advice, isToday }: UVDayCardProps) {
  return (
    <div
      className={cn(
        "relative bg-card border-4 border-border p-4 transition-all",
        "shadow-[4px_4px_0px_0px] shadow-border/80",
        isToday && "border-accent shadow-accent/60 bg-primary"
      )}
    >
      {/* Pixel corner decorations */}
      <div className="absolute top-0 left-0 w-2 h-2 bg-border/40" />
      <div className="absolute top-0 right-0 w-2 h-2 bg-border/40" />
      <div className="absolute bottom-0 left-0 w-2 h-2 bg-border/40" />
      <div className="absolute bottom-0 right-0 w-2 h-2 bg-border/40" />

      {isToday && (
        <div className="absolute -top-4 left-3 bg-accent text-accent-foreground text-xs font-bold px-2 py-0.5 uppercase border-2 border-[#c0a030] shadow-[2px_2px_0px_0px] shadow-[#c0a030]">
          Today
        </div>
      )}

      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm font-bold text-card-foreground uppercase">{dayName}</p>
          <p className="text-xs text-muted-foreground mt-0.5">{date}</p>
        </div>
        <PixelWeatherIcon uvIndex={uvIndex} scale={1} />
      </div>

      <div className="mt-3 flex items-end justify-between">
        <p className={cn("text-3xl font-bold tabular-nums", getUVColor(level))}>
          {uvIndex.toFixed(1)}
        </p>
        <span className={cn(
          "text-xs font-bold px-2 py-1 uppercase border-2 border-current/20 shadow-[2px_2px_0px_0px] shadow-current/10",
          getLevelBg(level)
        )}>
          {level}
        </span>
      </div>

      {/* Pixel divider line */}
      <div className="mt-3 mb-2 h-1 flex">
        {Array.from({ length: 20 }).map((_, i) => (
          <div
            key={i}
            className={cn(
              "flex-1 h-full",
              i % 2 === 0 ? "bg-border/60" : "bg-transparent"
            )}
          />
        ))}
      </div>

      <p className="text-xs text-muted-foreground leading-relaxed">{advice}</p>
    </div>
  )
}
