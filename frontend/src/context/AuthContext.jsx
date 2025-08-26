import React, { createContext, useContext, useEffect, useState } from "react"
import { initializeApp } from "firebase/app"
import { getAuth, signInWithPopup, GoogleAuthProvider, onAuthStateChanged, signOut, signInAnonymously } from "firebase/auth"

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY || "demo",
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN || "demo.firebaseapp.com",
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID || "demo",
  appId: import.meta.env.VITE_FIREBASE_APP_ID || "1:demo:web:demo"
}

const app = initializeApp(firebaseConfig)
const auth = getAuth(app)

const AuthCtx = createContext(null)

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, u => {
      setUser(u)
      setLoading(false)
    })
    signInAnonymously(auth).catch(() => {})
    return () => unsub()
  }, [])

  const loginGoogle = async () => {
    const provider = new GoogleAuthProvider()
    await signInWithPopup(auth, provider)
  }
  const logout = () => signOut(auth)

  return (
    <AuthCtx.Provider value={{ user, loading, loginGoogle, logout }}>
      {children}
    </AuthCtx.Provider>
  )
}

export const useAuth = () => useContext(AuthCtx)
