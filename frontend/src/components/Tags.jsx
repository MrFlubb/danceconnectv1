import React from "react"

export default function Tags({ tags }) {
  return (
    <div className="mt-2 flex flex-wrap gap-1">
      {tags.map((t, i) => (
        <span key={i} className="text-xs px-2 py-0.5 rounded-full border">{t}</span>
      ))}
    </div>
  )
}
