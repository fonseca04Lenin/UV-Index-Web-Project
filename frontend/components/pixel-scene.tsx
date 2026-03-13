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

// Minecraft Pig SVG Component - Side view with 3D blocky style
function MinecraftPigSVG() {
  return (
    <svg width="60" height="40" viewBox="0 0 60 40" style={{ imageRendering: "pixelated" }}>
      {/* Body - main pink */}
      <rect x="20" y="12" width="30" height="18" fill="#fab8c4" />
      {/* Body - top highlight */}
      <rect x="20" y="12" width="30" height="4" fill="#fcd7de" />
      {/* Body - bottom shadow */}
      <rect x="20" y="26" width="30" height="4" fill="#f6889d" />
      
      {/* Head - main */}
      <rect x="4" y="8" width="18" height="18" fill="#fab8c4" />
      {/* Head - top highlight */}
      <rect x="4" y="8" width="18" height="4" fill="#fcd7de" />
      {/* Head - front (snout area) */}
      <rect x="0" y="14" width="6" height="10" fill="#fcd7de" />
      
      {/* Eye */}
      <rect x="8" y="12" width="4" height="4" fill="white" />
      <rect x="10" y="12" width="2" height="4" fill="black" />
      
      {/* Snout */}
      <rect x="0" y="16" width="6" height="6" fill="#f6889d" />
      {/* Nostrils */}
      <rect x="1" y="18" width="2" height="2" fill="#BB444E" />
      <rect x="3" y="18" width="2" height="2" fill="#BB444E" />
      
      {/* Ears */}
      <rect x="6" y="4" width="4" height="6" fill="#fab8c4" />
      <rect x="14" y="4" width="4" height="6" fill="#fab8c4" />
      
      {/* Legs */}
      <rect x="22" y="30" width="6" height="10" fill="#fab8c4" />
      <rect x="24" y="30" width="4" height="10" fill="#f6889d" />
      <rect x="42" y="30" width="6" height="10" fill="#fab8c4" />
      <rect x="44" y="30" width="4" height="10" fill="#f6889d" />
      
      {/* Tail (curly) */}
      <rect x="50" y="14" width="4" height="4" fill="#f6889d" />
      <rect x="54" y="12" width="3" height="3" fill="#f6889d" />
      <rect x="56" y="10" width="3" height="3" fill="#f6889d" />
    </svg>
  )
}

// Minecraft Cow SVG Component - Side view with 3D blocky style  
function MinecraftCowSVG() {
  return (
    <svg width="70" height="50" viewBox="0 0 70 50" style={{ imageRendering: "pixelated" }}>
      {/* Body - white base */}
      <rect x="22" y="14" width="38" height="22" fill="#E8E8E8" />
      {/* Body - top darker edge */}
      <rect x="22" y="14" width="38" height="4" fill="#C7C7C7" />
      {/* Body - black spots */}
      <rect x="26" y="18" width="10" height="10" fill="#262626" />
      <rect x="42" y="20" width="8" height="8" fill="#262626" />
      <rect x="50" y="26" width="8" height="6" fill="#262626" />
      
      {/* Head - white */}
      <rect x="4" y="8" width="20" height="20" fill="#E8E8E8" />
      {/* Head - top edge */}
      <rect x="4" y="8" width="20" height="4" fill="#C7C7C7" />
      {/* Head - front face area */}
      <rect x="0" y="14" width="6" height="12" fill="#C7C7C7" />
      
      {/* Eyes */}
      <rect x="8" y="12" width="4" height="4" fill="white" />
      <rect x="10" y="12" width="2" height="4" fill="black" />
      
      {/* Snout/Muzzle - tan/pink */}
      <rect x="0" y="18" width="8" height="8" fill="#A08070" />
      {/* Nostrils */}
      <rect x="1" y="20" width="2" height="3" fill="#4a4a4a" />
      <rect x="4" y="20" width="2" height="3" fill="#4a4a4a" />
      
      {/* Horns */}
      <rect x="6" y="2" width="4" height="8" fill="#E8E8E8" />
      <rect x="8" y="0" width="2" height="4" fill="#C7C7C7" />
      <rect x="16" y="2" width="4" height="8" fill="#E8E8E8" />
      <rect x="16" y="0" width="2" height="4" fill="#C7C7C7" />
      
      {/* Ears */}
      <rect x="2" y="6" width="6" height="4" fill="#E8E8E8" />
      <rect x="20" y="6" width="6" height="4" fill="#E8E8E8" />
      
      {/* Legs - white with black hooves */}
      <rect x="26" y="36" width="8" height="14" fill="#E8E8E8" />
      <rect x="26" y="46" width="8" height="4" fill="#262626" />
      <rect x="48" y="36" width="8" height="14" fill="#E8E8E8" />
      <rect x="48" y="46" width="8" height="4" fill="#262626" />
      
      {/* Udder */}
      <rect x="36" y="34" width="10" height="6" fill="#FFB6C1" />
      
      {/* Tail */}
      <rect x="60" y="16" width="4" height="12" fill="#262626" />
      <rect x="62" y="26" width="4" height="6" fill="#262626" />
    </svg>
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
          const next = prev + facing * 0.05
          if (next > 75) {
            setFacing(-1)
            return 75
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
    }, 3000 + Math.random() * 5000)

    return () => {
      clearInterval(interval)
      clearInterval(pauseInterval)
    }
  }, [facing, isWalking])

  return (
    <div
      className="absolute bottom-[18px] z-[2] transition-all duration-150"
      style={{ left: `${x}%`, transform: `scaleX(${facing})` }}
      aria-hidden="true"
    >
      <MinecraftCowSVG />
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
          const next = prev + facing * 0.04
          if (next > 80) {
            setFacing(-1)
            return 80
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
    }, 2500 + Math.random() * 4000)

    return () => {
      clearInterval(interval)
      clearInterval(pauseInterval)
    }
  }, [facing, isWalking])

  return (
    <div
      className="absolute bottom-[22px] z-[2] transition-all duration-150"
      style={{ left: `${x}%`, transform: `scaleX(${facing})` }}
      aria-hidden="true"
    >
      <MinecraftPigSVG />
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
