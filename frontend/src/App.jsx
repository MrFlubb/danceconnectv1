import React from "react"
import { Routes, Route, useLocation, Link, NavLink } from "react-router-dom"
import Home from "./pages/Home.jsx"
import Friends from "./pages/Friends.jsx"
import Videos from "./pages/Videos.jsx"
import Notices from "./pages/Notices.jsx"
import TopBar from "./components/TopBar.jsx"
import BottomNav from "./components/BottomNav.jsx"
import AddEventFAB from "./components/AddEventFAB.jsx"
import { AuthProvider } from "./context/AuthContext.jsx"
import { EventsProvider } from "./context/EventsContext.jsx"

export default function App() {
  const location = useLocation()
  return (
    <AuthProvider>
      <EventsProvider>
        <div className="min-h-screen max-w-md mx-auto relative bg-white shadow-lg">
          <TopBar />
          <main className="pt-16 pb-20">
            <Routes location={location}>
              <Route path="/" element={<Home />} />
              <Route path="/amis" element={<Friends />} />
              <Route path="/videos" element={<Videos />} />
              <Route path="/notifications" element={<Notices />} />
            </Routes>
          </main>
          <AddEventFAB />
          <BottomNav />
        </div>
      </EventsProvider>
    </AuthProvider>
  )
}
