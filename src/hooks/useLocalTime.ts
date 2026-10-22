import { useEffect, useState } from 'react'
import { profile } from '@/data/content'

function formatTime(date: Date): string {
  return new Intl.DateTimeFormat('en-GB', {
    timeZone: profile.timezone,
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
  }).format(date)
}

export function useLocalTime() {
  const [time, setTime] = useState(() => formatTime(new Date()))

  useEffect(() => {
    const tick = () => setTime(formatTime(new Date()))
    tick()
    const id = window.setInterval(tick, 60_000)
    return () => window.clearInterval(id)
  }, [])

  return `${profile.location} · ${time} ${profile.timezoneLabel}`
}
