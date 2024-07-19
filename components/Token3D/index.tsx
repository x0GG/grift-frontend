"use client"

import { SplineProps } from "@splinetool/react-spline"
import clsx from "clsx"
import React, { Suspense } from "react"
import styles from "./Token3D.module.scss"

const Spline = React.lazy(() => import("@splinetool/react-spline"))

const Loading = () => {
  return (
    <div className={styles.loading}>
      <img src="/img/loading.svg" width={85} height={85} alt="Loading" />
    </div>
  )
}

interface Token3DProps extends Omit<SplineProps, "scene"> {
  id: string
  loading?: React.ReactNode
}

export const Token3D = ({ id, loading, ...props }: Token3DProps) => {
  return (
    <Suspense fallback={loading ? loading : <Loading />}>
      <Spline
        {...props}
        className={clsx(styles.canvas, props.className)}
        scene={`/3d/${id}.splinecode`}
      />
    </Suspense>
  )
}
