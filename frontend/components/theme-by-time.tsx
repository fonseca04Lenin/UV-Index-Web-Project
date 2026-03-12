"use client"

import { useEffect } from "react"

/** Applies the .dark class to <html> automatically between 7pm and 7am */
export function ThemeByTime() {
  useEffect(() => {
    const hour = new Date().getHours()
    const isNight = hour >= 19 || hour < 7
    const html = document.documentElement
    if (isNight) {
      html.classList.add("dark")
    } else {
      html.classList.remove("dark")
    }
  }, [])
  return null
}
