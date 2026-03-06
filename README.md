# ASC11 — ASCII Art Editor

A real-time ASCII art editor that converts images, video, and live webcam feeds into ASCII art. Inspired by [asc11.com](https://asc11.com).

## Features

- 📷 **Image to ASCII** — Upload any image and convert it to ASCII art
- 🎥 **Video to ASCII** — Upload a video file and watch it play as animated ASCII
- 📹 **Webcam to ASCII** — Real-time ASCII rendering from your webcam
- 🎨 **Character sets** — 5 presets (Standard, Dense, Blocks, Minimal, Extended) or custom
- ⚙️ **Controls** — Density, font size, contrast, brightness, invert, color/mono mode
- 📋 **Copy ASCII** — One-click copy to clipboard
- 🌐 **Export HTML** — Download as a self-contained HTML file
- ⚡ **Export JS** — Download as an embeddable JS snippet

## Tech Stack

- React 19 + TypeScript
- Vite
- Tailwind CSS v4
- Canvas API for pixel processing

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:5173](http://localhost:5173)

## Build

```bash
npm run build
```

## Deploy

```bash
npx vercel --prod
```

## License

MIT
