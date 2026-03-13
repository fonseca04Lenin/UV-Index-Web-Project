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

"use client"

import { useEffect, useState } from "react"

function PixelCow({ initialX, direction }: { initialX: number; direction: 1 | -1 }) {
  const [x, setX] = useState(initialX)
  const [facing, setFacing] = useState<1 | -1>(direction)
  const [isWalking, setIsWalking] = useState(true)

  useEffect(() => {
    const interval = setInterval(() => {
      if (isWalking) {
        setX((prev) => {
          const next = prev + facing * 0.3
          if (next > 85) {
            setFacing(-1)
            return 85
          }
          if (next < 5) {
            setFacing(1)
            return 5
          }
          return next
        })
      }
    }, 50)

    // Random pause/walk
    const pauseInterval = setInterval(() => {
      setIsWalking((prev) => !prev)
      if (Math.random() > 0.5) {
        setFacing((prev) => (prev === 1 ? -1 : 1))
      }
    }, 2000 + Math.random() * 3000)

    return () => {
      clearInterval(interval)
      clearInterval(pauseInterval)
    }
  }, [facing, isWalking])

  return (
    <div
      className="absolute bottom-12 z-[1] transition-transform"
      style={{ left: `${x}%`, transform: `scaleX(${facing})` }}
      aria-hidden="true"
    >
      {/* Minecraft-style cow */}
      <div className="flex flex-col">
        {/* Head */}
        <div className="flex">
          <div className="w-2 h-2 bg-[#d4d4d4]" />
          <div className="w-2 h-2 bg-[#e8e8e8]" />
          <div className="w-2 h-2 bg-[#d4d4d4]" />
        </div>
        <div className="flex">
          <div className="w-2 h-2 bg-[#1a1a1a]" />
          <div className="w-2 h-2 bg-[#f5deb3]" />
          <div className="w-2 h-2 bg-[#1a1a1a]" />
        </div>
        {/* Body */}
        <div className="flex">
          <div className="w-2 h-2 bg-[#e8e8e8]" />
          <div className="w-2 h-2 bg-[#1a1a1a]" />
          <div className="w-2 h-2 bg-[#e8e8e8]" />
          <div className="w-2 h-2 bg-[#1a1a1a]" />
        </div>
        <div className="flex">
          <div className="w-2 h-2 bg-[#1a1a1a]" />
          <div className="w-2 h-2 bg-[#e8e8e8]" />
          <div className="w-2 h-2 bg-[#1a1a1a]" />
          <div className="w-2 h-2 bg-[#e8e8e8]" />
        </div>
        {/* Legs */}
        <div className="flex">
          <div className={`w-2 h-2 bg-[#d4d4d4] ${isWalking ? "animate-pulse" : ""}`} />
          <div className="w-2 h-2 bg-transparent" />
          <div className="w-2 h-2 bg-transparent" />
          <div className={`w-2 h-2 bg-[#d4d4d4] ${isWalking ? "animate-pulse" : ""}`} />
        </div>
      </div>
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
          const next = prev + facing * 0.25
          if (next > 90) {
            setFacing(-1)
            return 90
          }
          if (next < 10) {
            setFacing(1)
            return 10
          }
          return next
        })
      }
    }, 50)

    // Random pause/walk
    const pauseInterval = setInterval(() => {
      setIsWalking((prev) => !prev)
      if (Math.random() > 0.5) {
        setFacing((prev) => (prev === 1 ? -1 : 1))
      }
    }, 1500 + Math.random() * 2500)

    return () => {
      clearInterval(interval)
      clearInterval(pauseInterval)
    }
  }, [facing, isWalking])

  return (
    <div
      className="absolute bottom-11 z-[1] transition-transform"
      style={{ left: `${x}%`, transform: `scaleX(${facing})` }}
      aria-hidden="true"
    >
      {/* Minecraft-style pig */}
      <div className="flex flex-col">
        {/* Head with snout */}
        <div className="flex">
          <div className="w-2 h-2 bg-[#f0a0a0]" />
          <div className="w-2 h-2 bg-[#ffb6b6]" />
          <div className="w-2 h-2 bg-[#f0a0a0]" />
        </div>
        <div className="flex">
          <div className="w-2 h-2 bg-[#1a1a1a]" />
          <div className="w-2 h-2 bg-[#ffcece]" />
          <div className="w-2 h-2 bg-[#1a1a1a]" />
        </div>
        {/* Body */}
        <div className="flex">
          <div className="w-2 h-2 bg-[#ffb6b6]" />
          <div className="w-2 h-2 bg-[#ffcece]" />
          <div className="w-2 h-2 bg-[#ffb6b6]" />
        </div>
        <div className="flex">
          <div className="w-2 h-2 bg-[#f0a0a0]" />
          <div className="w-2 h-2 bg-[#ffb6b6]" />
          <div className="w-2 h-2 bg-[#f0a0a0]" />
        </div>
        {/* Legs */}
        <div className="flex">
          <div className={`w-2 h-2 bg-[#f0a0a0] ${isWalking ? "animate-pulse" : ""}`} />
          <div className="w-2 h-2 bg-transparent" />
          <div className={`w-2 h-2 bg-[#f0a0a0] ${isWalking ? "animate-pulse" : ""}`} />
        </div>
      </div>
    </div>
  )
}

export function PixelAnimals() {
  return (
    <div className="fixed bottom-0 left-0 right-0 pointer-events-none z-[1]" aria-hidden="true">
      <PixelCow initialX={20} direction={1} />
      <PixelCow initialX={70} direction={-1} />
      <PixelPig initialX={35} direction={1} />
      <PixelPig initialX={55} direction={-1} />
      <PixelPig initialX={80} direction={1} />
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
