"use client"

// https://css-tricks.com/the-trick-to-viewport-units-on-mobile/

import { useCallback, useEffect } from "react"
import { useEventListener } from "usehooks-ts"

export const useViewport = () => {
  const onWindowResize = useCallback(() => {
    const el = document.documentElement

    el.style.setProperty("--vw", el.clientWidth * 0.01 + "px")
    el.style.setProperty("--dvh", window.innerHeight * 0.01 + "px")
    el.style.setProperty("--svh", el.clientHeight * 0.01 + "px")
    el.style.setProperty("--lvh", "1vh")
  }, [])

  useEffect(() => onWindowResize(), [onWindowResize])
  useEventListener("resize", onWindowResize)
}
