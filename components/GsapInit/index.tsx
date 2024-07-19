"use client"

import { GSAP_DURATION, GSAP_EASE } from "@/config/constants"
import { useViewport } from "@/hooks/useViewport"
import { useGSAP } from "@gsap/react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

gsap.registerPlugin(useGSAP)
gsap.registerPlugin(ScrollTrigger)
gsap.defaults({
  ease: GSAP_EASE,
  duration: GSAP_DURATION
})

export const GsapInit = () => {
  useViewport()

  return null
}
