'use client'

import { useState, useEffect, useRef } from 'react'
import { Card, CardContent } from "@/components/ui/card"

export function FloatingCountdownTimer({ initialTime, onEnd }) {
  const [timeLeft, setTimeLeft] = useState(initialTime)
  const intervalRef = useRef(null)
  const endTimeRef = useRef(Date.now() + initialTime * 1000)

  useEffect(() => {
    intervalRef.current = setInterval(() => {
      const now = Date.now()
      const remaining = Math.ceil((endTimeRef.current - now) / 1000)
      
      if (remaining <= 0) {
        clearInterval(intervalRef.current)
        setTimeLeft(0)
        onEnd?.()
        return
      }
      
      setTimeLeft(remaining)
    }, 100)

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current)
      }
    }
  }, [onEnd])

  const formatTime = (time) => {
    const minutes = Math.floor(time / 60)
    const seconds = time % 60
    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`
  }

  return (
    <Card className={`fixed bottom-4 right-4 w-32 h-32 rounded-full shadow-lg 
      ${timeLeft <= 10 ? 'bg-red-100' : 'bg-white'}`}>
      <CardContent className="flex items-center justify-center h-full">
        <div className={`text-3xl font-bold ${timeLeft <= 10 ? 'text-red-600' : ''}`}>
          {formatTime(timeLeft)}
        </div>
      </CardContent>
    </Card>
  )
}

