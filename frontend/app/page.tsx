import { ForecastView } from "@/components/forecast-view"
import { PixelGround, PixelClouds, PixelTree, PixelStars, PixelAnimals } from "@/components/pixel-scene"

export default function Page() {
  return (
    <main className="relative min-h-screen bg-background overflow-hidden">
      <PixelStars />
      <PixelClouds />
      <PixelGround />
      <PixelAnimals />
      <PixelTree position="left-[5%]" />
      <PixelTree position="right-[8%]" />

      <div className="relative z-10 mx-auto max-w-4xl px-4 py-10 md:py-14 pb-20">
        <ForecastView />
      </div>

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
