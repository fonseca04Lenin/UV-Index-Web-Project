/** Pixel art weather icons rendered as CSS grids */

const PIXEL_SIZE = 4

type PixelGrid = (string | null)[][]

const Y = "#f0c040" // yellow sun
const O = "#f0a020" // orange sun detail
const W = "#ffffff" // white cloud
const G = "#c0c0c0" // gray cloud
const B = "#60a0d0" // blue raindrop

const sunGrid: PixelGrid = [
  [null, null, null, Y, null, null, null, Y, null, null, null],
  [null, null, null, null, Y, null, Y, null, null, null, null],
  [null, null, null, null, null, null, null, null, null, null, null],
  [Y, null, null, Y, Y, Y, Y, Y, null, null, Y],
  [null, Y, null, Y, O, Y, O, Y, null, Y, null],
  [null, null, null, Y, Y, O, Y, Y, null, null, null],
  [Y, Y, null, Y, O, Y, O, Y, null, Y, Y],
  [null, null, null, Y, Y, Y, Y, Y, null, null, null],
  [null, Y, null, null, null, null, null, null, null, Y, null],
  [Y, null, null, null, null, null, null, null, null, null, Y],
  [null, null, null, null, Y, null, Y, null, null, null, null],
]

const cloudSunGrid: PixelGrid = [
  [null, null, null, null, Y, null, Y, null, null, null, null],
  [null, null, null, null, null, null, null, null, null, null, null],
  [null, null, null, Y, Y, Y, Y, Y, null, null, null],
  [null, null, null, Y, O, Y, O, Y, null, null, null],
  [null, null, W, W, W, W, Y, Y, null, null, null],
  [null, W, W, W, W, W, W, W, null, null, null],
  [W, W, W, W, W, W, W, W, W, null, null],
  [W, W, W, W, W, W, W, W, W, W, null],
  [null, W, W, W, W, W, W, W, W, null, null],
  [null, null, null, null, null, null, null, null, null, null, null],
  [null, null, null, null, null, null, null, null, null, null, null],
]

const moonGrid: PixelGrid = [
  [null, null, null, null, W, W, W, null, null, null, null],
  [null, null, null, W, W, W, null, null, null, null, null],
  [null, null, W, W, W, null, null, null, null, null, null],
  [null, null, W, W, null, null, null, null, null, null, null],
  [null, W, W, W, null, null, null, null, null, null, null],
  [null, W, W, null, null, null, null, null, null, null, null],
  [null, W, W, W, null, null, null, null, null, null, null],
  [null, null, W, W, null, null, null, null, null, null, null],
  [null, null, W, W, W, null, null, null, null, null, null],
  [null, null, null, W, W, W, null, null, null, null, null],
  [null, null, null, null, W, W, W, null, null, null, null],
]

function getWeatherGrid(uvIndex: number): PixelGrid {
  if (uvIndex < 1) return moonGrid
  if (uvIndex < 3) return cloudSunGrid
  return sunGrid
}

function PixelCanvas({ grid, scale = 1 }: { grid: PixelGrid; scale?: number }) {
  const size = PIXEL_SIZE * scale

  return (
    <div
      className="flex-shrink-0"
      style={{
        display: "grid",
        gridTemplateColumns: `repeat(${grid[0].length}, ${size}px)`,
        gridTemplateRows: `repeat(${grid.length}, ${size}px)`,
      }}
      aria-hidden="true"
    >
      {grid.flatMap((row, y) =>
        row.map((color, x) => (
          <div
            key={`${y}-${x}`}
            style={{
              width: size,
              height: size,
              backgroundColor: color ?? "transparent",
            }}
          />
        ))
      )}
    </div>
  )
}

export function PixelWeatherIcon({ uvIndex, scale = 1, animate = false }: { uvIndex: number; scale?: number; animate?: boolean }) {
  const grid = getWeatherGrid(uvIndex)
  const shouldSpin = animate && uvIndex >= 3 // only spin for sun, not moon/clouds
  return (
    <div className={shouldSpin ? "pixel-spin" : ""}>
      <PixelCanvas grid={grid} scale={scale} />
    </div>
  )
}
