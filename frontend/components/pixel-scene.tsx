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

// Minecraft Pig SVG Component - Side view with authentic blocky Minecraft style
function MinecraftPigSVG() {
  return (
    <svg width="48" height="32" viewBox="0 0 48 32" style={{ imageRendering: "pixelated" }}>
      {/* BODY - rectangular box shape */}
      <rect x="16" y="8" width="24" height="14" fill="#F0A0A0" />
      {/* Body top highlight */}
      <rect x="16" y="8" width="24" height="3" fill="#FFCECE" />
      {/* Body bottom darker */}
      <rect x="16" y="19" width="24" height="3" fill="#DB7B7B" />
      
      {/* HEAD - square blocky head */}
      <rect x="0" y="4" width="16" height="16" fill="#F0A0A0" />
      {/* Head top highlight */}
      <rect x="0" y="4" width="16" height="3" fill="#FFCECE" />
      {/* Head front face */}
      <rect x="0" y="7" width="4" height="10" fill="#FFCECE" />
      
      {/* EYE - small black square */}
      <rect x="6" y="8" width="3" height="3" fill="#FFFFFF" />
      <rect x="7" y="9" width="2" height="2" fill="#000000" />
      
      {/* SNOUT - protruding rectangle */}
      <rect x="-4" y="10" width="6" height="8" fill="#EDAAAA" />
      {/* Nostrils */}
      <rect x="-3" y="13" width="2" height="2" fill="#8B5555" />
      <rect x="0" y="13" width="2" height="2" fill="#8B5555" />
      
      {/* EAR - single visible ear from side */}
      <rect x="4" y="0" width="6" height="5" fill="#F0A0A0" />
      <rect x="4" y="0" width="6" height="2" fill="#DB7B7B" />
      
      {/* LEGS - 4 short stubby legs */}
      <rect x="18" y="22" width="5" height="8" fill="#F0A0A0" />
      <rect x="20" y="22" width="3" height="8" fill="#DB7B7B" />
      <rect x="33" y="22" width="5" height="8" fill="#F0A0A0" />
      <rect x="35" y="22" width="3" height="8" fill="#DB7B7B" />
      
      {/* TAIL - curly pig tail */}
      <rect x="40" y="10" width="3" height="3" fill="#F0A0A0" />
      <rect x="43" y="8" width="3" height="3" fill="#F0A0A0" />
      <rect x="45" y="6" width="2" height="3" fill="#DB7B7B" />
    </svg>
  )
}

// Minecraft Cow SVG Component - Side view with authentic blocky Minecraft style  
function MinecraftCowSVG() {
  return (
    <svg width="56" height="38" viewBox="0 0 56 38" style={{ imageRendering: "pixelated" }}>
      {/* BODY - rectangular with spots */}
      <rect x="18" y="10" width="28" height="16" fill="#D8D8D8" />
      {/* Body top edge darker */}
      <rect x="18" y="10" width="28" height="3" fill="#A8A8A8" />
      {/* Black spots on body */}
      <rect x="20" y="13" width="8" height="8" fill="#262626" />
      <rect x="34" y="14" width="6" height="6" fill="#262626" />
      <rect x="38" y="20" width="6" height="4" fill="#262626" />
      
      {/* HEAD - square blocky */}
      <rect x="0" y="4" width="18" height="18" fill="#D8D8D8" />
      {/* Head top edge */}
      <rect x="0" y="4" width="18" height="3" fill="#A8A8A8" />
      {/* Head front */}
      <rect x="0" y="7" width="4" height="12" fill="#B8B8B8" />
      
      {/* EYE */}
      <rect x="6" y="8" width="3" height="3" fill="#FFFFFF" />
      <rect x="7" y="9" width="2" height="2" fill="#000000" />
      
      {/* MUZZLE - gray/tan snout */}
      <rect x="-4" y="12" width="6" height="8" fill="#A08878" />
      {/* Nostrils */}
      <rect x="-3" y="15" width="2" height="2" fill="#484848" />
      <rect x="0" y="15" width="2" height="2" fill="#484848" />
      
      {/* HORNS - pointing up from head */}
      <rect x="4" y="0" width="3" height="6" fill="#F0F0F0" />
      <rect x="12" y="0" width="3" height="6" fill="#F0F0F0" />
      
      {/* EAR */}
      <rect x="2" y="2" width="4" height="4" fill="#D8D8D8" />
      
      {/* LEGS - white legs with black hooves */}
      <rect x="20" y="26" width="5" height="10" fill="#D8D8D8" />
      <rect x="20" y="33" width="5" height="3" fill="#262626" />
      <rect x="39" y="26" width="5" height="10" fill="#D8D8D8" />
      <rect x="39" y="33" width="5" height="3" fill="#262626" />
      
      {/* UDDER */}
      <rect x="28" y="24" width="8" height="4" fill="#FFB8B8" />
      
      {/* TAIL - black hanging tail */}
      <rect x="46" y="12" width="3" height="10" fill="#262626" />
      <rect x="48" y="20" width="3" height="4" fill="#262626" />
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
      className="absolute bottom-[12px] z-[2] transition-all duration-150"
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
      className="absolute bottom-[8px] z-[2] transition-all duration-150"
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
