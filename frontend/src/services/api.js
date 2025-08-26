const BASE = import.meta.env.VITE_API_URL || ""

async function request(path, opts={}) {
  const res = await fetch(BASE + path, { headers: { "Content-Type": "application/json" }, ...opts })
  if (!res.ok) throw new Error("Erreur API")
  return res.json()
}

export const api = {
  listEvents: async (dateStr) => {
    if (!BASE) throw new Error("No API base")
    return request(`/events?date=${dateStr}`)
  },
  createEvent: async (data) => request(`/events`, { method: "POST", body: JSON.stringify(data)}),
  joinEvent: async (id, user) => request(`/events/${id}/participants`, { method: "POST", body: JSON.stringify(user)}),
  listParticipants: async (id) => request(`/events/${id}/participants`)
}
