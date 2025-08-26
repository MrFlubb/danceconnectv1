import React, { createContext, useContext, useEffect, useMemo, useState } from "react"
import dayjs from "dayjs"
import { api } from "../services/api"
import mock from "../mock/events.json"

const EventsCtx = createContext(null)

export function EventsProvider({ children }) {
  const [events, setEvents] = useState([])
  const [agenda, setAgenda] = useState(() => {
    const raw = localStorage.getItem("dc_agenda")
    return raw ? JSON.parse(raw) : {}
  })

  useEffect(() => {
    const load = async () => {
      try {
        const res = await api.listEvents(dayjs().format("YYYY-MM-DD"))
        setEvents(res)
      } catch (e) {
        setEvents(mock)
      }
    }
    load()
  }, [])

  useEffect(() => {
    localStorage.setItem("dc_agenda", JSON.stringify(agenda))
  }, [agenda])

  const addToAgenda = (evt) => {
    const key = dayjs(evt.date).format("YYYY-MM-DD")
    setAgenda(prev => {
      const list = prev[key] || []
      if (list.find(x => x._id === evt._id)) return prev
      return { ...prev, [key]: [...list, evt] }
    })
  }

  const removeFromAgenda = (evt) => {
    const key = dayjs(evt.date).format("YYYY-MM-DD")
    setAgenda(prev => {
      const list = prev[key] || []
      return { ...prev, [key]: list.filter(x => x._id !== evt._id) }
    })
  }

  return (
    <EventsCtx.Provider value={{ events, setEvents, agenda, addToAgenda, removeFromAgenda }}>
      {children}
    </EventsCtx.Provider>
  )
}

export const useEvents = () => useContext(EventsCtx)
