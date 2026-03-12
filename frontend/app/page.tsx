import { ForecastHeader } from "@/components/forecast-header"
import { UVDayCard } from "@/components/uv-day-card"
import { UVLegend } from "@/components/uv-legend"
import { PixelGround, PixelClouds, PixelTree, PixelStars } from "@/components/pixel-scene"

const FLASK_API = process.env.FLASK_API_URL ?? "http://localhost:5000"

interface ForecastDay {
  dayName: string
  date: string
  uvIndex: number
  level: string
  advice: string
  isToday: boolean
}

async function getForecastData(): Promise<{ forecast: ForecastDay[]; location: string }> {
  try {
    const res = await fetch(`${FLASK_API}/api/forecast`, { cache: "no-store" })
    if (!res.ok) throw new Error(`HTTP ${res.status}`)
    return await res.json()
  } catch {
    return { forecast: [], location: "" }
  }
}

export default async function Page() {
  const { forecast, location } = await getForecastData()

  return (
    <main className="relative min-h-screen bg-background overflow-hidden">
      {/* Pixel art background scene */}
      <PixelStars />
      <PixelClouds />
      <PixelGround />
      <PixelTree position="left-[5%]" />
      <PixelTree position="right-[8%]" />

      {/* Main content */}
      <div className="relative z-10 mx-auto max-w-4xl px-4 py-10 md:py-14 pb-20">
        <ForecastHeader location={location} />

        {forecast.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {forecast.map((day) => (
              <UVDayCard
                key={day.date}
                dayName={day.dayName}
                date={day.date}
                uvIndex={day.uvIndex}
                level={day.level}
                advice={day.advice}
                isToday={day.isToday}
              />
            ))}
          </div>
        ) : (
          <div className="border-4 border-border bg-card p-8 text-center shadow-[4px_4px_0px_0px] shadow-border/80">
            <p className="text-sm text-card-foreground uppercase">Unable to load UV data</p>
            <p className="text-xs text-muted-foreground mt-2">Make sure the Flask backend is running on port 5000</p>
          </div>
        )}

        <UVLegend />
      </div>

      {/* Pixel footer */}
      <footer className="relative z-10 border-t-4 border-border bg-card mt-8">
        <div className="mx-auto max-w-4xl px-4 py-4 flex flex-col sm:flex-row items-center justify-between gap-2">
          <p className="text-xs text-card-foreground uppercase">
            {"Pixel UV Almanac v1.0"}
          </p>
          <p className="text-xs text-muted-foreground">
            {"Made with blocks & love"}
          </p>
        </div>
      </footer>
    </main>
  )
}
