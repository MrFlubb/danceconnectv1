import React from "react"

export default function Timeline({ events, date }) {
  const HOURS = [17, 18, 19, 20, 21, 22, 23]
  const HOUR_HEIGHT = 80 // pixels par heure

  const yFromTime = (time) => {
    const [h, m] = time.split(":").map(Number)
    const minutes = (h - 17) * 60 + m
    return (minutes / 60) * HOUR_HEIGHT
  }

  const boxHeight = (start, end) => {
    const [sh, sm] = start.split(":").map(Number)
    const [eh, em] = end.split(":").map(Number)
    const mins = eh * 60 + em - (sh * 60 + sm)
    return Math.max(28, (mins / 60) * HOUR_HEIGHT)
  }

  return (
    <div className="relative border rounded-2xl p-2 h-[600px] overflow-hidden">
      {/* Gouttière des heures */}
      <div className="absolute left-0 top-0 bottom-0 w-12 bg-gray-50 border-r">
        {HOURS.map((h, i) => (
          <div
            key={h}
            className="absolute left-0 right-0 text-xs text-gray-500 flex items-start justify-center pt-1"
            style={{ top: i * HOUR_HEIGHT }}
          >
            {h}h
          </div>
        ))}
      </div>

      {/* Grille + événements */}
      <div className="ml-12 h-full relative">
        {/* Lignes de la grille */}
        {HOURS.map((h, i) => (
          <div
            key={h}
            className="absolute left-0 right-0 border-t border-gray-200"
            style={{ top: i * HOUR_HEIGHT }}
          />
        ))}

        {/* Blocs événements */}
        {events.map((evt) => (
          <div
            key={evt._id}
            className="absolute left-2 right-2 bg-salsaOrange/20 border border-salsaOrange rounded-xl p-2"
            style={{ top: yFromTime(evt.startTime), height: boxHeight(evt.startTime, evt.endTime) }}
          >
            <div className="text-sm font-semibold">{evt.title}</div>
            <div className="text-xs">{evt.startTime} - {evt.endTime} - {evt.location}</div>
          </div>
        ))}
      </div>
    </div>
  )
}
