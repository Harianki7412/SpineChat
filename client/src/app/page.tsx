"use client"

import Navbar from "./components/Navbar"
import { AnimatePresence, motion } from "motion/react"
import { Loader2, Shuffle, Speech, Video } from "lucide-react"
import Footer from "./components/Footer"
import { io, Socket } from "socket.io-client"
import { useEffect, useRef, useState } from "react"
import VideoRoom from "./components/VideoRoom"

export default function Home() {
  const [status, setStatus] = useState<"idle" | "waiting" | "chatting">("idle")
  const [roomId, setRoomId] = useState("")
  const socketRef = useRef<Socket | null>(null)

  useEffect(() => {
    const socket = io(process.env.NEXT_PUBLIC_SOCKET_URL!, {
      transports: ["websocket"],
    })

    socketRef.current = socket

    socket.on("matched", ({ roomId }) => {
      setRoomId(roomId)
      setStatus("chatting")
    })

    socket.on("waiting", () => setStatus("waiting"))

    socket.on("partner_left", () => {
      setRoomId("")
      setStatus("idle")
    })

    return () => socket.disconnect()
  }, [])

  const startChat = () => {
    socketRef.current?.emit("start")
    setStatus("waiting")
  }

  const next = () => {
    socketRef.current?.emit("next")
    setRoomId("")
    setStatus("idle")

    // Delay prevents SDP race crash
    setTimeout(() => {
      socketRef.current?.emit("start")
      setStatus("waiting")
    }, 1000)
  }

  return (
    <>
      <Navbar show={status !== "chatting"} />

      <main className="relative flex flex-col min-h-[100dvh] bg-gradient-to-br from-black via-zinc-900 to-black text-white">

        <div className="flex-1 flex flex-col pt-16 sm:pt-20">

          <AnimatePresence mode="wait">

            {status === "idle" && (
              <motion.div
                key="idle"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="flex flex-col items-center justify-center flex-1 px-6 text-center"
              >
                <div className="mb-6 w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-white/10 flex items-center justify-center">
                  <Speech />
                </div>

                <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4">
                  Spine<span className="text-yellow-300">Chat</span>
                </h1>

                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={startChat}
                  className="flex items-center gap-3 px-6 sm:px-8 py-3 sm:py-4 rounded-2xl bg-white text-black font-semibold"
                >
                  <Video size={20} />
                  Start Random Chat
                </motion.button>
              </motion.div>
            )}

            {status === "waiting" && (
              <motion.div
                key="waiting"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="flex flex-col items-center justify-center flex-1 gap-6"
              >
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ repeat: Infinity, duration: 1 }}
                >
                  <Loader2 size={60} />
                </motion.div>

                <p className="text-zinc-400 text-lg">
                  Matching... Please wait
                </p>
              </motion.div>
            )}

            {status === "chatting" && roomId && (
              <motion.div
                key="chat"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 flex flex-col bg-black z-40"
              >
                <div className="flex items-center justify-between px-4 sm:px-6 py-3 bg-black/70 border-b border-white/10">
                  <span className="text-xs sm:text-sm text-zinc-400">
                    Connected
                  </span>

                  <motion.button
                    whileTap={{ scale: 0.95 }}
                    onClick={next}
                    className="flex items-center gap-2 px-3 sm:px-4 py-2 bg-red-500 rounded-full text-xs sm:text-sm"
                  >
                    <Shuffle size={16} />
                    Next
                  </motion.button>
                </div>

                <div className="flex-1">
                  <VideoRoom roomId={roomId} />
                </div>
              </motion.div>
            )}

          </AnimatePresence>
        </div>

        {status !== "chatting" && <Footer />}
      </main>
    </>
  )
}