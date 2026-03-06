import { useMemo } from 'react'
import type { AsciiChar, AsciiSettings } from '../types'

interface AsciiPreviewProps {
  grid: AsciiChar[][]
  settings: AsciiSettings
}

export function AsciiPreview({ grid, settings }: AsciiPreviewProps) {
  const rendered = useMemo(() => {
    if (!grid.length) return null
    const isColor = settings.colorMode === 'color'

    return grid.map((row, y) => (
      <div key={y} style={{ height: `${settings.fontSize * settings.lineHeight}px` }}>
        {isColor
          ? row.map((c, x) => (
              <span key={x} style={{ color: `rgb(${c.r},${c.g},${c.b})` }}>
                {c.char}
              </span>
            ))
          : row.map((c) => c.char).join('')}
      </div>
    ))
  }, [grid, settings.colorMode, settings.fontSize, settings.lineHeight])

  if (!grid.length) {
    return (
      <div className="flex-1 flex items-center justify-center text-gray-600">
        <div className="text-center">
          <div className="text-6xl mb-4 opacity-30">⌨</div>
          <p className="text-lg">Upload an image, video, or start your webcam</p>
          <p className="text-sm mt-2 opacity-60">ASCII art will appear here</p>
        </div>
      </div>
    )
  }

  return (
    <div className="flex-1 overflow-auto bg-[#0a0a0a] p-4 flex items-start justify-center">
      <pre
        className="ascii-output select-all"
        style={{
          fontSize: `${settings.fontSize}px`,
          lineHeight: settings.lineHeight,
          color: settings.colorMode === 'mono' ? '#e0e0e0' : undefined,
        }}
      >
        {rendered}
      </pre>
    </div>
  )
}
