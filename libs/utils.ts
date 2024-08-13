import BigNumber from "bignumber.js"
import { DECIMALS_MULTIPLIER } from "@/config/constants"

export const capitalize = (str: string) =>
  `${str.charAt(0).toUpperCase()}${str.slice(1)}`

export const qs = (selector: string, scope = document) =>
  scope.querySelector(selector)

export const qsa = (selector: string, scope = document) =>
  scope.querySelectorAll(selector)

export const ref = (id: string) => qs(`[data-ref=${id}]`)

export const shuffleArray = <T>(array: T[]): T[] => {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
      ;[array[i], array[j]] = [array[j], array[i]]
  }
  return array
}

export const formatBigNumber = (number: bigint, showFractional = false): string => {
  const bn = new BigNumber(number.toString()).dividedBy(DECIMALS_MULTIPLIER)

  if (showFractional) {
    const decimals = bn.lt(0.1) ? 2 : 1
    return bn.toFormat(decimals, BigNumber.ROUND_FLOOR, {
      decimalSeparator: '.',
      groupSeparator: ',',
      groupSize: 3,
      secondaryGroupSize: 0,
      fractionGroupSeparator: ' ',
      fractionGroupSize: 0
    })
  }

  if (bn.lt(10_000)) {
    return bn.integerValue(BigNumber.ROUND_FLOOR).toString()
  } else if (bn.lt(1_000_000)) {
    return `${(bn.dividedBy(1_0)).integerValue().dividedBy(100).toString()}k`
  } else if (bn.lt(1_000_000_000)) {
    return `${(bn.dividedBy(1_000_0)).integerValue().dividedBy(100).toString()}M`
  } else {
    return `${(bn.dividedBy(1_000_000_0)).integerValue().dividedBy(100).toString()}B`
  }
}

export const scrollRestoration = () => {
  const mainContainer = ref("main")
  mainContainer?.scrollTo({ top: 0, behavior: "smooth" })
}

export const constructName = (firstName: string | undefined, lastName: string | undefined, username: string | undefined) => {
  if (firstName && lastName) {
    return `${firstName} ${lastName}`
  }

  if (firstName) {
    return firstName
  }

  if (username) {
    return username
  }

  return 'Anonymous';
}

export const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms))

export const calcEarnPerSecond = (earnPerHour: bigint): bigint => {
  return BigInt(new BigNumber(earnPerHour.toString()).dividedBy(3600).integerValue().toString())
}

export const msToSeconds = (ms: number) => Math.floor(ms / 1000)