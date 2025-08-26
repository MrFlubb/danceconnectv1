import React from "react"
import { Home, Users, PlusCircle, Video, Bell } from "lucide-react"
import { NavLink } from "react-router-dom"

export default function BottomNav() {
  const Item = ({ to, icon, label }) => (
    <NavLink to={to} className="flex flex-col items-center justify-center flex-1 py-1" aria-label={label}>
      {icon}
      <span className="text-xs">{label}</span>
    </NavLink>
  )
  return (
    <nav className="fixed bottom-0 left-0 right-0 max-w-md mx-auto bg-white border-t z-20">
      <div className="flex items-center justify-between px-2">
        <Item to="/" icon={<Home className="w-6 h-6" />} label="Home" />
        <Item to="/amis" icon={<Users className="w-6 h-6" />} label="Amis" />
        <Item to="/" icon={<PlusCircle className="w-10 h-10 -mt-6" />} label="Ajouter" />
        <Item to="/videos" icon={<Video className="w-6 h-6" />} label="Vidéos" />
        <Item to="/notifications" icon={<Bell className="w-6 h-6" />} label="Notifications" />
      </div>
    </nav>
  )
}
