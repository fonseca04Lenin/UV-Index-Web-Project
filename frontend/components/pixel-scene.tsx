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

function PixelCow({ initialX, direction }: { initialX: number; direction: 1 | -1 }) {
  const [x, setX] = useState(initialX)
  const [facing, setFacing] = useState<1 | -1>(direction)
  const [isWalking, setIsWalking] = useState(true)
  const [legOffset, setLegOffset] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      if (isWalking) {
        setX((prev) => {
          const next = prev + facing * 0.15
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
        setLegOffset((prev) => (prev + 1) % 4)
      }
    }, 100)

    const pauseInterval = setInterval(() => {
      setIsWalking((prev) => !prev)
      if (Math.random() > 0.5) {
        setFacing((prev) => (prev === 1 ? -1 : 1))
      }
    }, 3000 + Math.random() * 4000)

    return () => {
      clearInterval(interval)
      clearInterval(pauseInterval)
    }
  }, [facing, isWalking])

  const frontLegUp = isWalking && legOffset < 2
  const backLegUp = isWalking && legOffset >= 2

  return (
    <div
      className="absolute bottom-[38px] z-[2]"
      style={{ left: `${x}%`, transform: `scaleX(${facing})` }}
      aria-hidden="true"
    >
      {/* Minecraft-style cow - SIDE VIEW with 3D depth */}
      <div className="relative" style={{ imageRendering: "pixelated" }}>
        {/* Head (box shape from side) */}
        <div className="absolute -left-3 top-0 flex flex-col">
          {/* Top of head - darker for 3D */}
          <div className="flex">
            <div className="w-[5px] h-[3px] bg-[#8a8a8a]" />
            <div className="w-[5px] h-[3px] bg-[#a0a0a0]" />
          </div>
          {/* Head side */}
          <div className="flex">
            <div className="w-[5px] h-[5px] bg-[#d4d4d4]" />
            <div className="w-[5px] h-[5px] bg-[#e8e8e8]" />
          </div>
          {/* Eye */}
          <div className="absolute top-[4px] left-[2px] w-[2px] h-[2px] bg-[#1a1a1a]" />
          {/* Snout/nose area */}
          <div className="flex">
            <div className="w-[5px] h-[4px] bg-[#c4b59a]" />
            <div className="w-[5px] h-[4px] bg-[#d4c4aa]" />
          </div>
          {/* Nostril */}
          <div className="absolute top-[10px] left-[2px] w-[1px] h-[1px] bg-[#4a4a4a]" />
        </div>
        
        {/* Body (long box from side) */}
        <div className="flex flex-col">
          {/* Top edge - darker for 3D */}
          <div className="flex">
            <div className="w-[6px] h-[2px] bg-[#1a1a1a]" />
            <div className="w-[6px] h-[2px] bg-[#8a8a8a]" />
            <div className="w-[6px] h-[2px] bg-[#1a1a1a]" />
            <div className="w-[6px] h-[2px] bg-[#8a8a8a]" />
          </div>
          {/* Body - spotted pattern */}
          <div className="flex">
            <div className="w-[6px] h-[6px] bg-[#1a1a1a]" />
            <div className="w-[6px] h-[6px] bg-[#e8e8e8]" />
            <div className="w-[6px] h-[6px] bg-[#e8e8e8]" />
            <div className="w-[6px] h-[6px] bg-[#1a1a1a]" />
          </div>
          <div className="flex">
            <div className="w-[6px] h-[6px] bg-[#e8e8e8]" />
            <div className="w-[6px] h-[6px] bg-[#1a1a1a]" />
            <div className="w-[6px] h-[6px] bg-[#1a1a1a]" />
            <div className="w-[6px] h-[6px] bg-[#e8e8e8]" />
          </div>
          {/* Belly - lighter */}
          <div className="flex">
            <div className="w-[6px] h-[3px] bg-[#c8c8c8]" />
            <div className="w-[6px] h-[3px] bg-[#d8d8d8]" />
            <div className="w-[6px] h-[3px] bg-[#d8d8d8]" />
            <div className="w-[6px] h-[3px] bg-[#c8c8c8]" />
          </div>
        </div>
        
        {/* Legs - 4 legs visible from side (front pair, back pair) */}
        <div className="flex justify-between" style={{ width: "24px" }}>
          {/* Front legs */}
          <div className="flex flex-col">
            <div 
              className="w-[4px] h-[8px] bg-[#c8c8c8]"
              style={{ transform: frontLegUp ? "translateY(-2px)" : "translateY(0)" }}
            />
          </div>
          {/* Back legs */}
          <div className="flex flex-col">
            <div 
              className="w-[4px] h-[8px] bg-[#c8c8c8]"
              style={{ transform: backLegUp ? "translateY(-2px)" : "translateY(0)" }}
            />
          </div>
        </div>
      </div>
    </div>
  )
}

function PixelPig({ initialX, direction }: { initialX: number; direction: 1 | -1 }) {
  const [x, setX] = useState(initialX)
  const [facing, setFacing] = useState<1 | -1>(direction)
  const [isWalking, setIsWalking] = useState(true)
  const [legOffset, setLegOffset] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      if (isWalking) {
        setX((prev) => {
          const next = prev + facing * 0.12
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
        setLegOffset((prev) => (prev + 1) % 4)
      }
    }, 100)

    const pauseInterval = setInterval(() => {
      setIsWalking((prev) => !prev)
      if (Math.random() > 0.5) {
        setFacing((prev) => (prev === 1 ? -1 : 1))
      }
    }, 2500 + Math.random() * 3000)

    return () => {
      clearInterval(interval)
      clearInterval(pauseInterval)
    }
  }, [facing, isWalking])

  const frontLegUp = isWalking && legOffset < 2
  const backLegUp = isWalking && legOffset >= 2

  return (
    <div
      className="absolute bottom-[38px] z-[2]"
      style={{ left: `${x}%`, transform: `scaleX(${facing})` }}
      aria-hidden="true"
    >
      {/* Minecraft-style pig - SIDE VIEW with 3D depth */}
      <div className="relative" style={{ imageRendering: "pixelated" }}>
        {/* Head (cube from side) */}
        <div className="absolute -left-2 top-1 flex flex-col">
          {/* Top of head */}
          <div className="flex">
            <div className="w-[4px] h-[2px] bg-[#d68a8a]" />
            <div className="w-[4px] h-[2px] bg-[#e8a0a0]" />
          </div>
          {/* Head side */}
          <div className="flex">
            <div className="w-[4px] h-[5px] bg-[#f0a8a8]" />
            <div className="w-[4px] h-[5px] bg-[#ffb8b8]" />
          </div>
          {/* Eye */}
          <div className="absolute top-[3px] left-[1px] w-[2px] h-[2px] bg-[#1a1a1a]" />
          {/* Snout */}
          <div className="absolute top-[5px] -left-[3px] flex flex-col">
            <div className="w-[4px] h-[3px] bg-[#f5c0c0]" />
            <div className="absolute top-[1px] left-[1px] w-[1px] h-[1px] bg-[#8a5050]" />
          </div>
        </div>
        
        {/* Body (rectangular from side) */}
        <div className="flex flex-col">
          {/* Top edge */}
          <div className="flex">
            <div className="w-[5px] h-[2px] bg-[#d68a8a]" />
            <div className="w-[5px] h-[2px] bg-[#e09898]" />
            <div className="w-[5px] h-[2px] bg-[#d68a8a]" />
          </div>
          {/* Body main */}
          <div className="flex">
            <div className="w-[5px] h-[5px] bg-[#f0a8a8]" />
            <div className="w-[5px] h-[5px] bg-[#ffb8b8]" />
            <div className="w-[5px] h-[5px] bg-[#f0a8a8]" />
          </div>
          <div className="flex">
            <div className="w-[5px] h-[5px] bg-[#ffb8b8]" />
            <div className="w-[5px] h-[5px] bg-[#ffc8c8]" />
            <div className="w-[5px] h-[5px] bg-[#ffb8b8]" />
          </div>
          {/* Belly */}
          <div className="flex">
            <div className="w-[5px] h-[2px] bg-[#ffc8c8]" />
            <div className="w-[5px] h-[2px] bg-[#ffd8d8]" />
            <div className="w-[5px] h-[2px] bg-[#ffc8c8]" />
          </div>
        </div>
        
        {/* Legs */}
        <div className="flex justify-between" style={{ width: "15px" }}>
          <div 
            className="w-[3px] h-[6px] bg-[#f0a8a8]"
            style={{ transform: frontLegUp ? "translateY(-2px)" : "translateY(0)" }}
          />
          <div 
            className="w-[3px] h-[6px] bg-[#f0a8a8]"
            style={{ transform: backLegUp ? "translateY(-2px)" : "translateY(0)" }}
          />
        </div>
        
        {/* Curly tail */}
        <div className="absolute -right-1 top-3 w-[3px] h-[3px] rounded-full bg-[#f0a8a8]" />
      </div>
    </div>
  )
}

export function PixelAnimals() {
  return (
    <div className="fixed bottom-0 left-0 right-0 pointer-events-none z-[2]" aria-hidden="true">
      <PixelCow initialX={15} direction={1} />
      <PixelCow initialX={65} direction={-1} />
      <PixelPig initialX={30} direction={1} />
      <PixelPig initialX={50} direction={-1} />
      <PixelPig initialX={78} direction={1} />
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
