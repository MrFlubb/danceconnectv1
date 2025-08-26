import React from "react"

export default function Friends() {
  const people = [
    { name: "Léa", status: "Danse ce soir à Manzanillo" },
    { name: "Samir", status: "Partant pour un stage samedi" },
    { name: "Nora", status: "Cherche un partenaire porto" }
  ]
  return (
    <div className="p-3">
      <h2 className="text-xl font-bold mb-2">Amis</h2>
      <ul className="space-y-2">
        {people.map((p, i) => (
          <li key={i} className="border rounded-2xl p-3">
            <div className="font-medium">{p.name}</div>
            <div className="text-sm text-gray-600">{p.status}</div>
          </li>
        ))}
      </ul>
    </div>
  )
}
