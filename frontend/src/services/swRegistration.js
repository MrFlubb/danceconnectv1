export async function registerSW() {
  if ("serviceWorker" in navigator) {
    try {
      await navigator.serviceWorker.register("/sw.js")
    } catch (e) {
      console.log("SW non enregistré", e)
    }
  }
}

export async function requestNotificationPermission() {
  if (!("Notification" in window)) return { ok: false, msg: "Notifications non supportées" }
  let perm = Notification.permission
  if (perm === "default") perm = await Notification.requestPermission()
  return { ok: perm === "granted" }
}

export async function testNotification() {
  const reg = await navigator.serviceWorker.getRegistration()
  if (reg) {
    reg.showNotification("Dance Connect", { body: "Exemple de notification - salsa ce soir 20h", icon: "/icon-192.png" })
  } else {
    new Notification("Dance Connect", { body: "Exemple de notification" })
  }
}
