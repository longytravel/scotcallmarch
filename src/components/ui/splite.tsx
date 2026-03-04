'use client'

import { Suspense, lazy } from 'react'
const Spline = lazy(() => import('@splinetool/react-spline'))

interface SplineSceneProps {
  scene: string
  className?: string
}

export function SplineScene({ scene, className }: SplineSceneProps) {
  return (
    <Suspense
      fallback={
        <div className={`w-full h-full flex flex-col items-center justify-center gap-3 bg-[#05070d] text-white/70 ${className ?? ''}`}>
          <span className="h-8 w-8 animate-spin rounded-full border-2 border-white/25 border-t-sky-300" />
          <span className="text-xs uppercase tracking-[0.18em]">Loading 3D Scene</span>
        </div>
      }
    >
      <Spline
        scene={scene}
        className={className}
      />
    </Suspense>
  )
}
