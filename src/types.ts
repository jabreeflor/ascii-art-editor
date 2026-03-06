export type SourceType = 'image' | 'video' | 'webcam'
export type ColorMode = 'mono' | 'color'

export interface AsciiSettings {
  charset: string
  fontSize: number
  lineHeight: number
  contrast: number
  brightness: number
  invert: boolean
  colorMode: ColorMode
  density: number // columns
}

export interface AsciiChar {
  char: string
  r: number
  g: number
  b: number
}

export const PRESETS: Record<string, string> = {
  'Standard': ' .:-=+*#%@',
  'Dense': ' .,;:!vlLFE$',
  'Blocks': ' ░▒▓█',
  'Minimal': ' .oO@',
  'Extended': ' .\'`^",:;Il!i><~+_-?][}{1)(|\\/tfjrxnuvczXYUJCLQ0OZmwqpdbkhao*#MW&8%B@$',
}

export const DEFAULT_SETTINGS: AsciiSettings = {
  charset: PRESETS['Standard'],
  fontSize: 10,
  lineHeight: 1,
  contrast: 1.2,
  brightness: 0,
  invert: false,
  colorMode: 'mono',
  density: 120,
}
