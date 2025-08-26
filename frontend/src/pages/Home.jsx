import React from "react"
import dayjs from "dayjs"
import { useEvents } from "../context/EventsContext"
import EventCard from "../components/EventCard"
import Timeline from "../components/Timeline"
import { registerSW, requestNotificationPermission, testNotification } from "../services/swRegistration"

export default function Home() {
  const { events, agenda } = useEvents()
  const key = dayjs().format("YYYY-MM-DD")
  const todaysAgenda = agenda[key] || []

  React.useEffect(() => { registerSW() }, [])

  return (
    <div className="p-3 space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold">Événements du jour</h2>
        <div className="flex gap-2">
          <button onClick={async () => { const r = await requestNotificationPermission(); if (!r.ok) alert("Permission refusée") }} className="text-sm border px-2 py-1 rounded-lg">Activer notif</button>
          <button onClick={testNotification} className="text-sm border px-2 py-1 rounded-lg">Tester</button>
        </div>
      </div>

      {events.map(evt => <EventCard key={evt._id} evt={evt} />)}

      <div className="mt-4">
        <h2 className="text-xl font-bold mb-2">Mon agenda - {dayjs().format("dddd D MMM")}</h2>
        <Timeline events={todaysAgenda} date={key} />
      </div>
    </div>
  )
}
