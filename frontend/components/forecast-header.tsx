import { PixelWeatherIcon } from "./pixel-weather-icon"

export function ForecastHeader({ location }: { location?: string }) {
  const now = new Date()
  const formattedDate = now.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  })

  return (
    <header className="text-center mb-8">
      <div className="flex items-center justify-center gap-4 mb-4">
        <PixelWeatherIcon uvIndex={5} scale={1.5} animate={true} />
        <div>
          <h1 className="text-2xl md:text-3xl text-foreground font-bold uppercase tracking-wide">
            7-Day UV Forecast
          </h1>
          <p className="text-xs text-foreground/70 mt-1 uppercase tracking-wider">
            Maximum UV index for each day
          </p>
        </div>
        <PixelWeatherIcon uvIndex={5} scale={1.5} animate={true} />
      </div>

      <p className="text-xs text-foreground/50 uppercase">{formattedDate}</p>
      {location && (
        <p className="text-xs text-foreground/60 uppercase mt-1">{location}</p>
      )}
    </header>
  )
}
