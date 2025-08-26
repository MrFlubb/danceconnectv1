import React from "react"

export default function Notices() {
  const list = [
    { title: "Soirée ajoutée", text: "T'es inscrit à la soirée de 21h" },
    { title: "Stage disponible", text: "Nouveau stage samedi 15h" }
  ]
  return (
    <div className="p-3">
      <h2 className="text-xl font-bold mb-2">Notifications</h2>
      <ul className="space-y-2">
        {list.map((n, i) => (
          <li key={i} className="border rounded-2xl p-3">
            <div className="font-medium">{n.title}</div>
            <div className="text-sm text-gray-600">{n.text}</div>
          </li>
        ))}
      </ul>
    </div>
  )
}
