import { PRESETS, type AsciiSettings, type SourceType } from '../types'

interface ControlsProps {
  settings: AsciiSettings
  onChange: (s: AsciiSettings) => void
  source: SourceType
  onSourceChange: (s: SourceType) => void
  onImageUpload: (file: File) => void
  onVideoUpload: (file: File) => void
  onWebcamToggle: () => void
  webcamActive: boolean
}

export function Controls({
  settings,
  onChange,
  source,
  onSourceChange,
  onImageUpload,
  onVideoUpload,
  onWebcamToggle,
  webcamActive,
}: ControlsProps) {
  const update = (partial: Partial<AsciiSettings>) =>
    onChange({ ...settings, ...partial })

  return (
    <div className="w-72 min-w-72 bg-[#111118] border-r border-[#2a2a3a] p-4 overflow-y-auto flex flex-col gap-4">
      <h2 className="text-sm font-bold text-indigo-400 uppercase tracking-wider">Source</h2>

      <div className="flex gap-1">
        {(['image', 'video', 'webcam'] as SourceType[]).map((s) => (
          <button
            key={s}
            onClick={() => onSourceChange(s)}
            className={`flex-1 px-2 py-1.5 rounded text-xs font-medium transition-colors ${
              source === s
                ? 'bg-indigo-600 text-white'
                : 'bg-[#1a1a2e] text-gray-400 hover:bg-[#222238]'
            }`}
          >
            {s === 'image' ? '📷 Image' : s === 'video' ? '🎥 Video' : '📹 Webcam'}
          </button>
        ))}
      </div>

      {source === 'image' && (
        <label className="block cursor-pointer bg-[#1a1a2e] border border-dashed border-[#3a3a5a] rounded-lg p-4 text-center text-sm text-gray-400 hover:border-indigo-500 transition-colors">
          Drop image or click to upload
          <input
            type="file"
            accept="image/*"
            className="hidden"
            onChange={(e) => e.target.files?.[0] && onImageUpload(e.target.files[0])}
          />
        </label>
      )}

      {source === 'video' && (
        <label className="block cursor-pointer bg-[#1a1a2e] border border-dashed border-[#3a3a5a] rounded-lg p-4 text-center text-sm text-gray-400 hover:border-indigo-500 transition-colors">
          Drop video or click to upload
          <input
            type="file"
            accept="video/*"
            className="hidden"
            onChange={(e) => e.target.files?.[0] && onVideoUpload(e.target.files[0])}
          />
        </label>
      )}

      {source === 'webcam' && (
        <button
          onClick={onWebcamToggle}
          className={`w-full py-2 rounded text-sm font-medium transition-colors ${
            webcamActive
              ? 'bg-red-600 hover:bg-red-700 text-white'
              : 'bg-indigo-600 hover:bg-indigo-700 text-white'
          }`}
        >
          {webcamActive ? '⏹ Stop Webcam' : '▶ Start Webcam'}
        </button>
      )}

      <hr className="border-[#2a2a3a]" />
      <h2 className="text-sm font-bold text-indigo-400 uppercase tracking-wider">Characters</h2>

      <div className="flex flex-col gap-1">
        {Object.entries(PRESETS).map(([name, chars]) => (
          <button
            key={name}
            onClick={() => update({ charset: chars })}
            className={`text-left px-2 py-1 rounded text-xs font-mono transition-colors ${
              settings.charset === chars
                ? 'bg-indigo-600/30 text-indigo-300 border border-indigo-500/50'
                : 'text-gray-500 hover:bg-[#1a1a2e]'
            }`}
          >
            <span className="text-gray-300 text-[10px]">{name}:</span>{' '}
            <span className="opacity-70">{chars}</span>
          </button>
        ))}
      </div>

      <input
        type="text"
        value={settings.charset}
        onChange={(e) => update({ charset: e.target.value || ' .' })}
        className="w-full bg-[#1a1a2e] border border-[#3a3a5a] rounded px-2 py-1 text-xs font-mono text-gray-300 focus:border-indigo-500 focus:outline-none"
        placeholder="Custom characters..."
      />

      <hr className="border-[#2a2a3a]" />
      <h2 className="text-sm font-bold text-indigo-400 uppercase tracking-wider">Settings</h2>

      <Slider label="Density" value={settings.density} min={40} max={250} step={1}
        onChange={(v) => update({ density: v })} />
      <Slider label="Font Size" value={settings.fontSize} min={4} max={20} step={1}
        onChange={(v) => update({ fontSize: v })} />
      <Slider label="Contrast" value={settings.contrast} min={0} max={3} step={0.05}
        onChange={(v) => update({ contrast: v })} />
      <Slider label="Brightness" value={settings.brightness} min={-5} max={5} step={0.1}
        onChange={(v) => update({ brightness: v })} />

      <div className="flex items-center justify-between">
        <span className="text-xs text-gray-400">Invert</span>
        <button
          onClick={() => update({ invert: !settings.invert })}
          className={`w-10 h-5 rounded-full transition-colors ${
            settings.invert ? 'bg-indigo-600' : 'bg-[#2a2a3a]'
          }`}
        >
          <div
            className={`w-4 h-4 rounded-full bg-white transition-transform mx-0.5 ${
              settings.invert ? 'translate-x-5' : 'translate-x-0'
            }`}
          />
        </button>
      </div>

      <div className="flex items-center justify-between">
        <span className="text-xs text-gray-400">Color Mode</span>
        <div className="flex gap-1">
          {(['mono', 'color'] as const).map((m) => (
            <button
              key={m}
              onClick={() => update({ colorMode: m })}
              className={`px-2 py-0.5 rounded text-xs ${
                settings.colorMode === m
                  ? 'bg-indigo-600 text-white'
                  : 'bg-[#1a1a2e] text-gray-500'
              }`}
            >
              {m}
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}

function Slider({
  label,
  value,
  min,
  max,
  step,
  onChange,
}: {
  label: string
  value: number
  min: number
  max: number
  step: number
  onChange: (v: number) => void
}) {
  return (
    <div>
      <div className="flex justify-between text-xs mb-1">
        <span className="text-gray-400">{label}</span>
        <span className="text-gray-500 font-mono">{Number(value.toFixed(2))}</span>
      </div>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="w-full h-1 bg-[#2a2a3a] rounded-lg appearance-none cursor-pointer accent-indigo-500"
      />
    </div>
  )
}
