self.addEventListener('Install', () => {
  console.log('Service worked installed.')
})

const closeNotification = (msg, evt) => {
  // console.log(msg, evt.notification.data)
  evt.notification.close()
}

self.addEventListener('notificationclose', evt => {
  closeNotification('notification closed', evt)
})

const isClientFocused = () => {
  return self.clients.matchAll({ type: 'window', includeUncontrolled: true }).then(windowClients => {
    let clientIsFocused = false
    for (let i = 0; i < windowClients.length; i++) {
      const windowClient = windowClients[i]
      if (windowClient.focused) {
        clientIsFocused = true
        break
      }
    }
    return clientIsFocused
  })
}

self.addEventListener('notificationclick', evt => {
  if (evt.action !== 'close') {
    console.log(evt)
    const urlToOpen = new URL(evt.notification.data.loc, self.location.origin).href

    const promiseChain = self.clients.matchAll({ type: 'window', includeUncontrolled: 'true' }).then(allClients => {
      let matchingClient = null
      for (let i = 0; i < allClients.length; i++) {
        const windowClient = allClients[i]
        if (windowClient.url === urlToOpen) {
          matchingClient = windowClient
          break
        }
      }

      if (matchingClient) {
        return matchingClient.focus()
      } else {
        return self.clients.openWindow(urlToOpen)
      }
    })
    evt.waitUntil(promiseChain)
  }
  closeNotification('Notification clicked', evt)
})

self.addEventListener('push', evt => {
  const promiseChain = isClientFocused().then(clientIsFocused => {
    if (clientIsFocused) {
      console.log("client is focused and we don't need to do a notification")
    }
    const json = evt.data.json()
    let options = {
      body: json.body,
      icon: './img/icons/android-chrome-192x192.png',
      data: {
        timestamp: Date.now(),
        loc: json.loc,
        primaryKey: 1
      },
      actions: [{ action: 'go', title: 'See new Episodes!' }]
    }
    return self.registration.showNotification(json.title, options)
  })
  evt.waitUntil(promiseChain)
})
