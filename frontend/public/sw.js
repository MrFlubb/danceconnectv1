self.addEventListener("install", () => {
  self.skipWaiting()
})
self.addEventListener("activate", (event) => {
  event.waitUntil(self.clients.claim())
})
self.addEventListener("push", (event) => {
  const data = event.data ? event.data.json() : { title: "Dance Connect", body: "Nouveau message" }
  event.waitUntil(self.registration.showNotification(data.title, { body: data.body, icon: "/icon-192.png" }))
})
self.addEventListener("notificationclick", (event) => {
  event.notification.close()
  event.waitUntil(clients.openWindow("/"))
})
