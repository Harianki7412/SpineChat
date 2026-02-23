"use client"
import React from 'react'

function Footer() {
  return (
    <div className=' relative z-10 text-center py-6 text-xs text-zinc-500 bg-black border-b border-white/10'>
      &copy; {new Date().getFullYear()} SpineChat | Rendom call & chat
    </div>
  )
}

export default Footer