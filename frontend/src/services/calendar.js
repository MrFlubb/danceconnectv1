export function googleCalendarUrl(evt) {
  const base = "https://calendar.google.com/calendar/render?action=TEMPLATE"
  const text = encodeURIComponent(evt.title)
  const details = encodeURIComponent(`${evt.location} - ${evt.level || ""} - ${evt.teacher || ""}`)
  const location = encodeURIComponent(evt.location || "")
  const start = evt.date.replace(/-/g, "") + "T" + evt.startTime.replace(":", "") + "00"
  const end = evt.date.replace(/-/g, "") + "T" + evt.endTime.replace(":", "") + "00"
  return `${base}&text=${text}&details=${details}&location=${location}&dates=${start}/${end}`
}

export function downloadICS(evt) {
  const dtStart = evt.date.replace(/-/g, "") + "T" + evt.startTime.replace(":", "") + "00"
  const dtEnd = evt.date.replace(/-/g, "") + "T" + evt.endTime.replace(":", "") + "00"
  const ics = `BEGIN:VCALENDAR
VERSION:2.0
PRODID:-//Dance Connect//FR
BEGIN:VEVENT
UID:${evt._id || Math.random().toString(36).slice(2)}@danceconnect
DTSTAMP:${dtStart}Z
DTSTART:${dtStart}Z
DTEND:${dtEnd}Z
SUMMARY:${evt.title}
LOCATION:${evt.location || ""}
DESCRIPTION:${evt.level || ""} - ${evt.teacher || ""}
END:VEVENT
END:VCALENDAR`
  const blob = new Blob([ics], { type: "text/calendar;charset=utf-8" })
  const a = document.createElement("a")
  a.href = URL.createObjectURL(blob)
  a.download = `dance-connect-${evt.title}.ics`
  a.click()
  URL.revokeObjectURL(a.href)
}
