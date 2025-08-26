import React, { useState } from "react"
import { MapPin, Clock, UserSquare2, Youtube } from "lucide-react"
import { googleCalendarUrl, downloadICS } from "../services/calendar"
import { useEvents } from "../context/EventsContext"
import ParticipantsList from "./ParticipantsList"
import Tags from "./Tags"

export default function EventCard({ evt }) {
  const { addToAgenda } = useEvents()
  const [showParticipants, setShowParticipants] = useState(false)

  return (
    <div className="border rounded-2xl p-3 mb-3 shadow-sm">
      <div className="flex items-start justify-between">
        <h3 className="font-semibold text-base">{evt.title}</h3>
        <span className="text-xs bg-salsaPurple/10 text-salsaPurple px-2 py-0.5 rounded-full">{evt.level}</span>
      </div>
      <div className="mt-1 text-sm text-gray-600 flex items-center gap-2">
        <Clock className="w-4 h-4" /><span>{evt.startTime} - {evt.endTime}</span>
      </div>
      <div className="mt-1 text-sm text-gray-600 flex items-center gap-2">
        <MapPin className="w-4 h-4" /><span>{evt.location}</span>
      </div>
      {evt.teacher && <div className="mt-1 text-sm text-gray-600 flex items-center gap-2">
        <UserSquare2 className="w-4 h-4" /><span>{evt.teacher}</span>
      </div>}

      <Tags tags={evt.tags || []} />

      <div className="mt-2 flex gap-2">
        <a href={googleCalendarUrl(evt)} target="_blank" rel="noreferrer" className="flex-1 text-center bg-salsaRed text-white py-2 rounded-xl font-medium">Ajouter à l'agenda</a>
        <button onClick={() => downloadICS(evt)} className="px-3 py-2 rounded-xl border">.ics</button>
        {evt.videoUrl && <a href={evt.videoUrl} target="_blank" rel="noreferrer" className="px-3 py-2 rounded-xl border" aria-label="Vidéo"><Youtube className="w-5 h-5" /></a>}
      </div>

      <div className="mt-2 flex gap-2">
        <button onClick={() => addToAgenda(evt)} className="flex-1 py-2 rounded-xl border">Ajouter à la frise</button>
        <button onClick={() => setShowParticipants(s => !s)} className="px-3 py-2 rounded-xl border">{showParticipants ? "Cacher" : "Participants"}</button>
      </div>

      {showParticipants && <ParticipantsList participants={evt.participants || []} />}
    </div>
  )
}
