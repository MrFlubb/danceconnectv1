import React from "react"

export default function ParticipantsList({ participants }) {
  if (!participants.length) return <div className="text-sm text-gray-500 mt-1">Personne pour le moment</div>
  return (
    <div className="mt-2 flex -space-x-2 overflow-hidden">
      {participants.map((p, i) => (
        <div key={i} className="flex items-center gap-2 border rounded-full px-2 py-1 bg-white shadow-sm">
          <img src={p.avatarUrl} alt={p.name} className="w-6 h-6 rounded-full" />
          <span className="text-sm">{p.name}</span>
        </div>
      ))}
    </div>
  )
}
