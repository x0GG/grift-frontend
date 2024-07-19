import { SPEObject } from "@splinetool/runtime"
import { RefObject } from "react"

const show = (obj: RefObject<SPEObject>) => {
  if (!obj.current) return
  obj.current.visible = true
}

const hide = (obj: RefObject<SPEObject>) => {
  if (!obj.current) return
  obj.current.visible = false
}

export { hide, show }
