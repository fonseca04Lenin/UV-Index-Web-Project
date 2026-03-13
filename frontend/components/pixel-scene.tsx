"use client"

import { useEffect, useState } from "react"

/** Pixel art landscape scene for the background - ground, trees, grass */

const STAR_POSITIONS = [
  { top: "4%",  left: "8%"  }, { top: "2%",  left: "22%" }, { top: "7%",  left: "35%" },
  { top: "3%",  left: "50%" }, { top: "6%",  left: "63%" }, { top: "1%",  left: "77%" },
  { top: "9%",  left: "88%" }, { top: "12%", left: "15%" }, { top: "11%", left: "42%" },
  { top: "14%", left: "58%" }, { top: "10%", left: "72%" }, { top: "5%",  left: "93%" },
  { top: "16%", left: "30%" }, { top: "18%", left: "80%" }, { top: "15%", left: "5%"  },
]

export function PixelStars() {
  return (
    <div className="fixed top-0 left-0 right-0 h-[50vh] pointer-events-none z-0 hidden dark:block" aria-hidden="true">
      {STAR_POSITIONS.map((pos, i) => (
        <div
          key={i}
          className="absolute"
          style={{ top: pos.top, left: pos.left }}
        >
          {/* 2x2 pixel star */}
          <div className="flex">
            <div style={{ width: 2, height: 2, backgroundColor: i % 3 === 0 ? "#fffde0" : "#e0e8ff" }} />
            <div style={{ width: 2, height: 2, backgroundColor: "transparent" }} />
          </div>
          <div className="flex">
            <div style={{ width: 2, height: 2, backgroundColor: "transparent" }} />
            <div style={{ width: 2, height: 2, backgroundColor: i % 3 === 0 ? "#fffde0" : "#e0e8ff" }} />
          </div>
        </div>
      ))}
    </div>
  )
}

export function PixelGround() {
  return (
    <div className="pixel-ground fixed bottom-0 left-0 right-0 pointer-events-none z-0" aria-hidden="true">
      {/* Dirt layer */}
      <div className="h-6 bg-[#8b6914]" />
      {/* Grass top */}
      <div className="h-4 bg-[#4a7a2e] -mt-10" />
      {/* Grass detail pixels */}
      <div className="absolute bottom-10 left-0 right-0 flex">
        {Array.from({ length: 60 }).map((_, i) => (
          <div
            key={i}
            className="flex-1"
            style={{
              height: `${8 + (i % 3) * 4}px`,
              backgroundColor: i % 5 === 0 ? "#5b9e3e" : i % 7 === 0 ? "#3a6620" : "transparent",
            }}
          />
        ))}
      </div>
    </div>
  )
}

export function PixelClouds() {
  return (
    <div className="pixel-clouds fixed top-0 left-0 right-0 pointer-events-none z-0 overflow-hidden" aria-hidden="true">
      {/* Cloud 1 */}
      <div className="absolute top-8 left-[10%] flex flex-col items-center opacity-80">
        <div className="flex">
          <div className="w-4 h-4 bg-white" />
          <div className="w-4 h-4 bg-white" />
          <div className="w-4 h-4 bg-white" />
        </div>
        <div className="flex -mt-0">
          <div className="w-4 h-4 bg-white" />
          <div className="w-4 h-4 bg-white" />
          <div className="w-4 h-4 bg-white" />
          <div className="w-4 h-4 bg-white" />
          <div className="w-4 h-4 bg-white" />
        </div>
      </div>

      {/* Cloud 2 */}
      <div className="absolute top-16 right-[15%] flex flex-col items-center opacity-70">
        <div className="flex">
          <div className="w-3 h-3 bg-white" />
          <div className="w-3 h-3 bg-white" />
        </div>
        <div className="flex -mt-0">
          <div className="w-3 h-3 bg-white" />
          <div className="w-3 h-3 bg-white" />
          <div className="w-3 h-3 bg-white" />
          <div className="w-3 h-3 bg-white" />
        </div>
      </div>

      {/* Cloud 3 */}
      <div className="absolute top-6 left-[55%] flex flex-col items-center opacity-60">
        <div className="flex">
          <div className="w-3 h-3 bg-white" />
          <div className="w-3 h-3 bg-white" />
          <div className="w-3 h-3 bg-white" />
        </div>
        <div className="flex -mt-0">
          <div className="w-3 h-3 bg-white" />
          <div className="w-3 h-3 bg-white" />
          <div className="w-3 h-3 bg-white" />
          <div className="w-3 h-3 bg-white" />
        </div>
      </div>
    </div>
  )
}

// Minecraft cow sprite - side view pixel grid (each number = color index)
// 0=transparent, 1=white(#E8E8E8), 2=black(#262626), 3=gray(#C7C7C7), 4=pink snout(#F5948F), 5=dark gray(#8B8B8B)
const COW_SPRITE = [
  [0,0,0,0,0,0,2,2,2,0,0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,2,1,1,1,2,0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,2,1,2,1,2,0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,2,4,4,4,2,0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,2,2,2,0,2,2,2,2,2,2,2,2,0,0],
  [0,0,0,0,0,0,0,0,0,2,1,1,2,2,1,1,2,2,2,0],
  [0,0,0,0,0,0,0,0,0,2,1,1,2,2,1,1,2,2,2,0],
  [0,0,0,0,0,0,0,0,0,2,3,3,1,1,3,3,1,1,2,0],
  [0,0,0,0,0,0,0,0,0,2,3,3,1,1,3,3,1,1,2,0],
  [0,0,0,0,0,0,0,0,0,0,2,2,0,0,2,2,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0,2,2,0,0,2,2,0,0,0,0],
]

const COW_COLORS: Record<number, string> = {
  0: "transparent",
  1: "#E8E8E8",
  2: "#262626",
  3: "#C7C7C7",
  4: "#F5948F",
  5: "#8B8B8B",
}

// Minecraft pig sprite - side view pixel grid
// 0=transparent, 1=pink(#F0A0A0), 2=dark pink(#DB7B7B), 3=light pink(#EDCACA), 4=snout(#DB9090), 5=black(#262626)
const PIG_SPRITE = [
  [0,0,0,0,0,2,2,2,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,2,1,1,1,2,0,0,0,0,0,0,0,0],
  [0,0,0,0,2,1,5,1,2,0,0,0,0,0,0,0,0],
  [0,0,0,2,4,4,4,4,2,0,0,0,0,0,0,0,0],
  [0,0,0,0,2,2,2,2,0,2,2,2,2,2,2,2,0],
  [0,0,0,0,0,0,0,0,2,1,1,1,1,1,1,2,2],
  [0,0,0,0,0,0,0,0,2,1,1,1,1,1,1,2,0],
  [0,0,0,0,0,0,0,0,2,3,3,3,3,3,3,2,0],
  [0,0,0,0,0,0,0,0,0,2,2,0,0,2,2,0,0],
  [0,0,0,0,0,0,0,0,0,2,2,0,0,2,2,0,0],
]

const PIG_COLORS: Record<number, string> = {
  0: "transparent",
  1: "#F0A0A0",
  2: "#DB7B7B",
  3: "#EDCACA",
  4: "#DB9090",
  5: "#262626",
}

function PixelSprite({ 
  sprite, 
  colors, 
  pixelSize = 3 
}: { 
  sprite: number[][]
  colors: Record<number, string>
  pixelSize?: number 
}) {
  return (
    <div style={{ imageRendering: "pixelated" }}>
      {sprite.map((row, y) => (
        <div key={y} className="flex">
          {row.map((pixel, x) => (
            <div
              key={x}
              style={{
                width: pixelSize,
                height: pixelSize,
                backgroundColor: colors[pixel],
              }}
            />
          ))}
        </div>
      ))}
    </div>
  )
}

function PixelCow({ initialX, direction }: { initialX: number; direction: 1 | -1 }) {
  const [x, setX] = useState(initialX)
  const [facing, setFacing] = useState<1 | -1>(direction)
  const [isWalking, setIsWalking] = useState(true)

  useEffect(() => {
    const interval = setInterval(() => {
      if (isWalking) {
        setX((prev) => {
          const next = prev + facing * 0.08
          if (next > 80) {
            setFacing(-1)
            return 80
          }
          if (next < 5) {
            setFacing(1)
            return 5
          }
          return next
        })
      }
    }, 100)

    const pauseInterval = setInterval(() => {
      setIsWalking((prev) => !prev)
      if (Math.random() > 0.6) {
        setFacing((prev) => (prev === 1 ? -1 : 1))
      }
    }, 3000 + Math.random() * 4000)

    return () => {
      clearInterval(interval)
      clearInterval(pauseInterval)
    }
  }, [facing, isWalking])

  return (
    <div
      className="absolute bottom-[26px] z-[2] transition-all duration-100"
      style={{ left: `${x}%`, transform: `scaleX(${facing})` }}
      aria-hidden="true"
    >
      <PixelSprite sprite={COW_SPRITE} colors={COW_COLORS} pixelSize={3} />
    </div>
  )
}

function PixelPig({ initialX, direction }: { initialX: number; direction: 1 | -1 }) {
  const [x, setX] = useState(initialX)
  const [facing, setFacing] = useState<1 | -1>(direction)
  const [isWalking, setIsWalking] = useState(true)

  useEffect(() => {
    const interval = setInterval(() => {
      if (isWalking) {
        setX((prev) => {
          const next = prev + facing * 0.06
          if (next > 85) {
            setFacing(-1)
            return 85
          }
          if (next < 8) {
            setFacing(1)
            return 8
          }
          return next
        })
      }
    }, 100)

    const pauseInterval = setInterval(() => {
      setIsWalking((prev) => !prev)
      if (Math.random() > 0.6) {
        setFacing((prev) => (prev === 1 ? -1 : 1))
      }
    }, 2500 + Math.random() * 3000)

    return () => {
      clearInterval(interval)
      clearInterval(pauseInterval)
    }
  }, [facing, isWalking])

  return (
    <div
      className="absolute bottom-[26px] z-[2] transition-all duration-100"
      style={{ left: `${x}%`, transform: `scaleX(${facing})` }}
      aria-hidden="true"
    >
      <PixelSprite sprite={PIG_SPRITE} colors={PIG_COLORS} pixelSize={3} />
    </div>
  )
}

export function PixelAnimals() {
  return (
    <div className="fixed bottom-0 left-0 right-0 pointer-events-none z-[2]" aria-hidden="true">
      <PixelCow initialX={12} direction={1} />
      <PixelCow initialX={60} direction={-1} />
      <PixelPig initialX={28} direction={1} />
      <PixelPig initialX={45} direction={-1} />
      <PixelPig initialX={75} direction={1} />
    </div>
  )
}

export function PixelTree({ position }: { position: string }) {
  return (
    <div className={`pixel-tree absolute bottom-10 ${position} pointer-events-none z-0`} aria-hidden="true">
      {/* Leaves */}
      <div className="flex flex-col items-center">
        <div className="flex">
          <div className="w-3 h-3 bg-[#2a6618]" />
          <div className="w-3 h-3 bg-[#3a8828]" />
          <div className="w-3 h-3 bg-[#2a6618]" />
        </div>
        <div className="flex">
          <div className="w-3 h-3 bg-[#3a8828]" />
          <div className="w-3 h-3 bg-[#4aaa38]" />
          <div className="w-3 h-3 bg-[#3a8828]" />
          <div className="w-3 h-3 bg-[#4aaa38]" />
          <div className="w-3 h-3 bg-[#3a8828]" />
        </div>
        <div className="flex">
          <div className="w-3 h-3 bg-[#2a6618]" />
          <div className="w-3 h-3 bg-[#3a8828]" />
          <div className="w-3 h-3 bg-[#4aaa38]" />
          <div className="w-3 h-3 bg-[#3a8828]" />
          <div className="w-3 h-3 bg-[#2a6618]" />
        </div>
        {/* Trunk */}
        <div className="flex">
          <div className="w-3 h-3 bg-transparent" />
          <div className="w-3 h-3 bg-transparent" />
          <div className="w-3 h-3 bg-[#6b4a14]" />
          <div className="w-3 h-3 bg-transparent" />
          <div className="w-3 h-3 bg-transparent" />
        </div>
        <div className="flex">
          <div className="w-3 h-3 bg-transparent" />
          <div className="w-3 h-3 bg-transparent" />
          <div className="w-3 h-3 bg-[#6b4a14]" />
          <div className="w-3 h-3 bg-transparent" />
          <div className="w-3 h-3 bg-transparent" />
        </div>
      </div>
    </div>
  )
}
