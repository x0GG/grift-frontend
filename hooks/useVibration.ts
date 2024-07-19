"use client"

export const useVibration = (duration: number) => {
  if (navigator.vibrate) {
    navigator.vibrate(duration)
  }
}
