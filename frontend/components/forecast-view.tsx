"use client"

import { useEffect, useState } from "react"
import { ForecastHeader } from "@/components/forecast-header"
import { UVDayCard } from "@/components/uv-day-card"
import { UVLegend } from "@/components/uv-legend"

const FLASK_API = process.env.NEXT_PUBLIC_FLASK_API_URL ?? "http://localhost:5000"

interface ForecastDay {
  dayName: string
  date: string
  uvIndex: number
  level: string
  advice: string
  isToday: boolean
}

interface ForecastData {
  forecast: ForecastDay[]
  location: string
}

export function ForecastView() {
  const [data, setData] = useState<ForecastData | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    function fetchForecast(lat?: number, lng?: number) {
      const url =
        lat != null && lng != null
          ? `${FLASK_API}/api/forecast?lat=${lat}&lng=${lng}`
          : `${FLASK_API}/api/forecast`

      fetch(url)
        .then((res) => (res.ok ? res.json() : Promise.reject()))
        .then((json) => setData(json))
        .catch(() => setData({ forecast: [], location: "" }))
        .finally(() => setLoading(false))
    }

    if (!navigator.geolocation) {
      fetchForecast()
      return
    }

    navigator.geolocation.getCurrentPosition(
      (pos) => fetchForecast(pos.coords.latitude, pos.coords.longitude),
      () => fetchForecast() // denied or unavailable — fall back to IP detection
    )
  }, [])

  if (loading) {
    return (
      <div className="border-4 border-border bg-card p-8 text-center shadow-[4px_4px_0px_0px] shadow-border/80">
        <p className="text-sm text-card-foreground uppercase animate-pulse">Locating...</p>
      </div>
    )
  }

  return (
    <>
      <ForecastHeader location={data?.location} />
      {data && data.forecast.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {data.forecast.map((day) => (
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
          <p className="text-xs text-muted-foreground mt-2">Make sure the Flask backend is running</p>
        </div>
      )}
      <UVLegend />
    </>
  )
}
