import type { AsciiChar, AsciiSettings } from '../types'
import { asciiToText, asciiToHtml, asciiToJs } from '../asciiEngine'

interface ToolbarProps {
  grid: AsciiChar[][]
  settings: AsciiSettings
}

export function Toolbar({ grid, settings }: ToolbarProps) {
  const hasContent = grid.length > 0

  const copyText = () => {
    navigator.clipboard.writeText(asciiToText(grid))
    flash('Copied ASCII text!')
  }

  const exportHtml = () => {
    const html = asciiToHtml(grid, settings)
    download('ascii-art.html', html, 'text/html')
    flash('Exported HTML!')
  }

  const exportJs = () => {
    const js = asciiToJs(grid, settings)
    download('ascii-art.js', js, 'text/javascript')
    flash('Exported JS!')
  }

  return (
    <div className="h-12 bg-[#111118] border-b border-[#2a2a3a] flex items-center px-4 gap-4">
      <div className="flex items-center gap-2">
        <span className="text-lg">⌨</span>
        <h1 className="text-sm font-bold text-white tracking-wider">
          ASC<span className="text-indigo-400">11</span>
          <span className="text-xs text-gray-600 ml-2 font-normal">ASCII Art Editor</span>
        </h1>
      </div>

      <div className="flex-1" />

      <button
        onClick={copyText}
        disabled={!hasContent}
        className="px-3 py-1 rounded text-xs font-medium bg-[#1a1a2e] text-gray-300 hover:bg-[#222238] disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
      >
        📋 Copy ASCII
      </button>
      <button
        onClick={exportHtml}
        disabled={!hasContent}
        className="px-3 py-1 rounded text-xs font-medium bg-[#1a1a2e] text-gray-300 hover:bg-[#222238] disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
      >
        🌐 Export HTML
      </button>
      <button
        onClick={exportJs}
        disabled={!hasContent}
        className="px-3 py-1 rounded text-xs font-medium bg-[#1a1a2e] text-gray-300 hover:bg-[#222238] disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
      >
        ⚡ Export JS
      </button>
    </div>
  )
}

function download(filename: string, content: string, type: string) {
  const blob = new Blob([content], { type })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = filename
  a.click()
  URL.revokeObjectURL(url)
}

function flash(msg: string) {
  const el = document.createElement('div')
  el.textContent = msg
  el.style.cssText =
    'position:fixed;top:20px;right:20px;background:#4f46e5;color:white;padding:8px 16px;border-radius:8px;font-size:13px;z-index:9999;animation:fadeIn 0.2s'
  document.body.appendChild(el)
  setTimeout(() => el.remove(), 1500)
}
