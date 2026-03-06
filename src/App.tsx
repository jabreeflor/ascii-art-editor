import { useState, useRef, useCallback, useEffect } from 'react'
import { Controls } from './components/Controls'
import { AsciiPreview } from './components/AsciiPreview'
import { Toolbar } from './components/Toolbar'
import { imageToAscii } from './asciiEngine'
import { DEFAULT_SETTINGS, type AsciiChar, type AsciiSettings, type SourceType } from './types'

export default function App() {
  const [settings, setSettings] = useState<AsciiSettings>(DEFAULT_SETTINGS)
  const [source, setSource] = useState<SourceType>('image')
  const [grid, setGrid] = useState<AsciiChar[][]>([])
  const [webcamActive, setWebcamActive] = useState(false)

  const imageRef = useRef<HTMLImageElement | null>(null)
  const videoRef = useRef<HTMLVideoElement | null>(null)
  const webcamRef = useRef<HTMLVideoElement | null>(null)
  const streamRef = useRef<MediaStream | null>(null)
  const animFrameRef = useRef<number>(0)

  // Process image
  const processImage = useCallback((img: HTMLImageElement, s: AsciiSettings) => {
    const result = imageToAscii(img, s)
    setGrid(result)
  }, [])

  // Handle image upload
  const handleImageUpload = useCallback((file: File) => {
    const img = new Image()
    img.onload = () => {
      imageRef.current = img
      processImage(img, settings)
    }
    img.src = URL.createObjectURL(file)
  }, [settings, processImage])

  // Handle video upload
  const handleVideoUpload = useCallback((file: File) => {
    if (videoRef.current) {
      videoRef.current.pause()
    }
    const video = document.createElement('video')
    video.muted = true
    video.loop = true
    video.playsInline = true
    video.onloadeddata = () => {
      videoRef.current = video
      video.play()
    }
    video.src = URL.createObjectURL(file)
  }, [])

  // Webcam toggle
  const toggleWebcam = useCallback(async () => {
    if (webcamActive) {
      streamRef.current?.getTracks().forEach((t) => t.stop())
      streamRef.current = null
      webcamRef.current = null
      setWebcamActive(false)
      cancelAnimationFrame(animFrameRef.current)
      return
    }

    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { width: 640, height: 480 },
      })
      const video = document.createElement('video')
      video.srcObject = stream
      video.muted = true
      video.playsInline = true
      await video.play()
      streamRef.current = stream
      webcamRef.current = video
      setWebcamActive(true)
    } catch (err) {
      console.error('Webcam error:', err)
    }
  }, [webcamActive])

  // Animation loop for video/webcam
  useEffect(() => {
    if (source === 'video' && videoRef.current) {
      const loop = () => {
        if (videoRef.current && !videoRef.current.paused) {
          setGrid(imageToAscii(videoRef.current, settings))
        }
        animFrameRef.current = requestAnimationFrame(loop)
      }
      loop()
      return () => cancelAnimationFrame(animFrameRef.current)
    }

    if (source === 'webcam' && webcamActive && webcamRef.current) {
      const loop = () => {
        if (webcamRef.current) {
          setGrid(imageToAscii(webcamRef.current, settings))
        }
        animFrameRef.current = requestAnimationFrame(loop)
      }
      loop()
      return () => cancelAnimationFrame(animFrameRef.current)
    }
  }, [source, webcamActive, settings])

  // Re-process image when settings change
  useEffect(() => {
    if (source === 'image' && imageRef.current) {
      processImage(imageRef.current, settings)
    }
  }, [settings, source, processImage])

  // Source change handler
  const handleSourceChange = useCallback(
    (newSource: SourceType) => {
      if (source === 'webcam' && newSource !== 'webcam') {
        streamRef.current?.getTracks().forEach((t) => t.stop())
        streamRef.current = null
        webcamRef.current = null
        setWebcamActive(false)
      }
      if (source === 'video' && videoRef.current) {
        videoRef.current.pause()
      }
      setSource(newSource)
      if (newSource === 'image' && imageRef.current) {
        processImage(imageRef.current, settings)
      }
    },
    [source, settings, processImage]
  )

  return (
    <div className="h-full flex flex-col">
      <Toolbar grid={grid} settings={settings} />
      <div className="flex-1 flex overflow-hidden">
        <Controls
          settings={settings}
          onChange={setSettings}
          source={source}
          onSourceChange={handleSourceChange}
          onImageUpload={handleImageUpload}
          onVideoUpload={handleVideoUpload}
          onWebcamToggle={toggleWebcam}
          webcamActive={webcamActive}
        />
        <AsciiPreview grid={grid} settings={settings} />
      </div>
    </div>
  )
}
