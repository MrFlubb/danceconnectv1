import React from "react"

export default function Videos() {
  const vids = [
    { title: "Musicalité - marquer le break", url: "https://www.youtube.com/watch?v=dQw4w9WgXcQ" },
    { title: "Guidage clair en 3 points", url: "https://www.youtube.com/watch?v=dQw4w9WgXcQ" },
  ]
  return (
    <div className="p-3">
      <h2 className="text-xl font-bold mb-2">Vidéos</h2>
      <ul className="space-y-2">
        {vids.map((v, i) => (
          <li key={i} className="border rounded-2xl p-3">
            <div className="font-medium">{v.title}</div>
            <a className="text-salsaRed underline" href={v.url} target="_blank" rel="noreferrer">Voir</a>
          </li>
        ))}
      </ul>
    </div>
  )
}
