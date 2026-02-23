"use client"

import { useEffect, useRef, useState } from "react"

export default function VideoRoom({ roomId }: { roomId: string }) {
  const containerRef = useRef<HTMLDivElement | null>(null)
  const zpRef = useRef<any>(null)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (!roomId) return
    if (!containerRef.current) return

    let mounted = true

    const start = async () => {
      try {
        const { ZegoUIKitPrebuilt } = await import("@zegocloud/zego-uikit-prebuilt")

        const appId = Number(process.env.NEXT_PUBLIC_ZEGO_APP_ID)
        const serverSecret = process.env.NEXT_PUBLIC_ZEGO_SERVER_SECRET

        if (!appId || !serverSecret) {
          setError("Zego ENV missing")
          return
        }

        const userId = crypto.randomUUID()

        const kitToken = ZegoUIKitPrebuilt.generateKitTokenForTest(
          appId,
          serverSecret,
          roomId,
          userId,
          "Stranger"
        )

        const zp = ZegoUIKitPrebuilt.create(kitToken)
        zpRef.current = zp

        if (!mounted || !containerRef.current) return

        zp.joinRoom({
          container: containerRef.current,
          scenario: { mode: ZegoUIKitPrebuilt.VideoConference },
          showPreJoinView: false,
          showTextChat: false,
          maxUsers: 2,
        })

      } catch (err) {
        console.error("Zego Init Error:", err)
        setError("Connection failed. Check AppID or region.")
      }
    }

    start()

    return () => {
      mounted = false
      if (zpRef.current) {
        try {
          zpRef.current.leaveRoom()
        } catch {}

        setTimeout(() => {
          try {
            zpRef.current?.destroy()
          } catch {}
          zpRef.current = null
        }, 700)
      }
    }
  }, [roomId])

  return (
    <div className="relative w-full h-[100dvh] sm:h-full bg-black">
      {error && (
        <div className="absolute inset-0 flex items-center justify-center text-red-500 text-sm">
          {error}
        </div>
      )}
      <div
        ref={containerRef}
        className="absolute inset-0 w-full h-full"
      />
    </div>
  )
}