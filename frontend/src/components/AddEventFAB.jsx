import React, { useState } from "react"
import { Plus } from "lucide-react"
import dayjs from "dayjs"
import { useEvents } from "../context/EventsContext"

export default function AddEventFAB() {
  const [open, setOpen] = useState(false)
  const { setEvents } = useEvents()

  const onSubmit = (e) => {
    e.preventDefault()
    const fd = new FormData(e.currentTarget)
    const evt = {
      _id: Math.random().toString(36).slice(2),
      title: fd.get("title"),
      date: fd.get("date"),
      startTime: fd.get("startTime"),
      endTime: fd.get("endTime"),
      location: fd.get("location"),
      level: fd.get("level"),
      teacher: fd.get("teacher"),
      tags: fd.get("tags").split(",").map(s => s.trim()).filter(Boolean),
      videoUrl: fd.get("videoUrl"),
      participants: []
    }
    setEvents(prev => [evt, ...prev])
    setOpen(false)
  }

  return (
    <>
      <button className="fixed bottom-12 left-1/2 -translate-x-1/2 bg-salsaRed text-white rounded-full p-3 shadow-lg"
              onClick={() => setOpen(true)} aria-label="Ajouter un événement">
        <Plus className="w-8 h-8" />
      </button>
      {open && (
        <div className="fixed inset-0 bg-black/40 z-30 flex items-end">
          <form onSubmit={onSubmit} className="bg-white w-full rounded-t-2xl p-4 space-y-2">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold">Proposer un événement</h3>
              <button type="button" onClick={() => setOpen(false)} className="text-sm">Fermer</button>
            </div>
            <input name="title" placeholder="Titre" className="w-full border rounded-xl px-3 py-2" required />
            <div className="grid grid-cols-2 gap-2">
              <input name="date" type="date" className="border rounded-xl px-3 py-2" defaultValue={dayjs().format("YYYY-MM-DD")} required />
              <input name="location" placeholder="Lieu" className="border rounded-xl px-3 py-2" required />
            </div>
            <div className="grid grid-cols-2 gap-2">
              <input name="startTime" type="time" className="border rounded-xl px-3 py-2" required />
              <input name="endTime" type="time" className="border rounded-xl px-3 py-2" required />
            </div>
            <div className="grid grid-cols-2 gap-2">
              <input name="level" placeholder="Niveau" className="border rounded-xl px-3 py-2" />
              <input name="teacher" placeholder="Prof" className="border rounded-xl px-3 py-2" />
            </div>
            <input name="tags" placeholder="Tags séparés par une virgule ex: cours,cubaine" className="w-full border rounded-xl px-3 py-2" />
            <input name="videoUrl" placeholder="URL vidéo" className="w-full border rounded-xl px-3 py-2" />
            <button className="w-full bg-salsaOrange text-black font-medium py-2 rounded-xl">Publier</button>
          </form>
        </div>
      )}
    </>
  )
}
