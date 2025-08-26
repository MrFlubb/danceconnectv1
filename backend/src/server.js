import express from "express"
import morgan from "morgan"
import cors from "cors"
import dotenv from "dotenv"
import mongoose from "mongoose"
import dayjs from "dayjs"

dotenv.config()

const app = express()
app.use(express.json())
app.use(morgan("dev"))
app.use(cors({ origin: process.env.CORS_ORIGIN?.split(",") || "*"}))

const port = process.env.PORT || 4000
const mongo = process.env.MONGODB_URI

// Mongo
mongoose.connect(mongo, { dbName: "danceconnect" }).then(() => {
  console.log("Mongo connecté")
}).catch(e => {
  console.log("Mongo erreur", e.message)
})

// Models
const eventSchema = new mongoose.Schema({
  title: String,
  date: String, // YYYY-MM-DD
  startTime: String, // HH:mm
  endTime: String,
  location: String,
  level: String,
  teacher: String,
  tags: [String],
  videoUrl: String,
  participants: [{
    uid: String,
    name: String,
    avatarUrl: String
  }]
}, { timestamps: true })

const Event = mongoose.model("Event", eventSchema)

// Firebase admin optional
import admin from "firebase-admin"
let adminInit = false
try {
  if (process.env.FIREBASE_PROJECT_ID && process.env.FIREBASE_CLIENT_EMAIL && process.env.FIREBASE_PRIVATE_KEY) {
    admin.initializeApp({
      credential: admin.credential.cert({
        projectId: process.env.FIREBASE_PROJECT_ID,
        clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
        privateKey: process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, "\n")
      })
    })
    adminInit = true
    console.log("Firebase Admin ok")
  }
} catch (e) {
  console.log("Firebase Admin non configuré")
}

async function authMiddleware(req, res, next) {
  const header = req.headers.authorization || ""
  const token = header.startsWith("Bearer ") ? header.slice(7) : null
  if (adminInit && token) {
    try {
      const decoded = await admin.auth().verifyIdToken(token)
      req.user = decoded
    } catch {}
  }
  next()
}
app.use(authMiddleware)

// Routes
app.get("/", (req, res) => res.json({ ok: true }))

app.get("/events", async (req, res) => {
  const date = req.query.date
  const q = date ? { date } : {}
  const list = await Event.find(q).sort({ startTime: 1 }).lean()
  res.json(list)
})

app.post("/events", async (req, res) => {
  const body = req.body
  const evt = await Event.create(body)
  res.json(evt)
})

app.post("/events/:id/participants", async (req, res) => {
  const { id } = req.params
  const { uid, name, avatarUrl } = req.body
  const evt = await Event.findById(id)
  if (!evt) return res.status(404).json({ error: "Not found" })
  if (!evt.participants.find(p => p.uid === uid)) {
    evt.participants.push({ uid, name, avatarUrl })
    await evt.save()
  }
  res.json(evt.participants)
})

app.get("/events/:id/participants", async (req, res) => {
  const { id } = req.params
  const evt = await Event.findById(id).lean()
  if (!evt) return res.status(404).json({ error: "Not found" })
  res.json(evt.participants || [])
})

// Seed
app.post("/seed", async (req, res) => {
  await Event.deleteMany({})
  await Event.insertMany([
    {
      title: "Cours salsa cubaine débutant",
      date: dayjs().format("YYYY-MM-DD"),
      startTime: "18:00",
      endTime: "19:30",
      location: "Studio Latino - Centre",
      level: "Débutant",
      teacher: "Aurélien",
      tags: ["cours", "cubaine"],
      videoUrl: "",
      participants: []
    },
    {
      title: "Soirée salsa - Manzanillo Libre",
      date: dayjs().format("YYYY-MM-DD"),
      startTime: "21:00",
      endTime: "23:30",
      location: "Manzanillo Libre",
      level: "Tous niveaux",
      teacher: "",
      tags: ["soirée", "cubaine"],
      videoUrl: "",
      participants: []
    }
  ])
  res.json({ ok: true })
})

app.listen(port, () => console.log("API sur port", port))
