"use client"

import { motion } from "motion/react"
import { Speech } from "lucide-react"

export default function Navbar({ show }: { show: boolean }) {
  if (!show) return null

  return (
    <motion.nav
      initial={{ y: -40, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.4 }}
      className="fixed top-0 left-0 right-0 z-50 bg-black/60 backdrop-blur border-b border-white/10"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 flex items-center gap-3">
        <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-xl bg-white/10 flex items-center justify-center">
          <Speech className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
        </div>
        <h1 className="text-lg sm:text-xl font-bold text-white">
          Spine<span className="text-yellow-300">Chat</span>
        </h1>
      </div>
    </motion.nav>
  )
}