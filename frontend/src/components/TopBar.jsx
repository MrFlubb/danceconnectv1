import React from "react"
import dayjs from "dayjs"
import { Bell, Calendar, BookOpen, PartyPopper } from "lucide-react"
import { Link, NavLink } from "react-router-dom"

export default function TopBar() {
  return (
    <header className="fixed top-0 left-0 right-0 max-w-md mx-auto z-20">
      <div className="bg-white border-b px-4 py-2 flex items-center justify-between">
        <div className="text-lg font-bold">Dance Connect</div>
        <div className="text-sm text-gray-500">{dayjs().format("dddd D MMM")}</div>
        <Link to="/notifications" aria-label="Notifications">
          <Bell className="w-6 h-6" />
        </Link>
      </div>
      <div className="bg-white px-3 pb-2 flex gap-2 border-b">
        <Category to="/" label="Cours" icon={<BookOpen className="w-4 h-4" />} />
        <Category to="/" label="Soirée" icon={<PartyPopper className="w-4 h-4" />} />
        <Category to="/" label="Stage" icon={<Calendar className="w-4 h-4" />} />
      </div>
    </header>
  )
}

function Category({ to, label, icon }) {
  return (
    <NavLink to={to} className={({isActive}) => "flex items-center gap-1 text-sm px-3 py-1 rounded-full border " + (isActive ? "bg-salsaOrange/10 border-salsaOrange" : "border-gray-300")}>
      {icon}{label}
    </NavLink>
  )
}
