self.addEventListener('Install', () => {
  console.log('Service worked installed.')
})

const closeNotification = (msg, evt) => {
  console.log(msg, evt.notification.data)
  evt.notification.close()
}

self.addEventListener('notificationclose', evt => {
  closeNotification('notification closed', evt)
})

self.addEventListener('notificationclick', evt => {
  if (evt.action !== 'close') {
    evt.waitUntil(
      self.clients.matchAll({ type: 'window', includeUncontrolled: 'true' }).then(allClients => {
        console.log(allClients)
        allClients.forEach(client => {
          if (client.visibilityState === 'visible') {
            client.navigate(evt.notification.loc)
          }
        })
      })
    )
  }
  closeNotification('Notification clicked', evt)
})

self.addEventListener('push', evt => {
  console.log('push message received', evt)

  let options = {
    body: 'body defined in sw.js',
    icon: 'android-chrome-192.192.png',
    data: {
      timestamp: Date.now(),
      loc: 'episodes',
      primaryKey: 1
    },
    actions: [{ action: 'go', title: 'GO NOW' }]
  }
  evt.waitUntil(self.registration.showNotification('example title', options))
})
