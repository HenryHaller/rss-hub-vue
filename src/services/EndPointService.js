import UserService from '@/services/UserService'

export default {
  configureEndpoint() {
    if ('Notification' in window) {
      navigator.serviceWorker.ready.then(reg => {
        Notification.requestPermission(status => {
          // console.log(status)
          if (status === 'granted') {
            console.log(reg)
            reg.pushManager.subscribe({ userVisibleOnly: true }).then(sub => {
              // const s = JSON.stringify(sub)
              // console.log(s)
              // console.log(s['keys'])
              // console.log(Object.keys(sub))
              // console.log(JSON.stringify(sub))
              // console.log(JSON.stringify(sub)['keys'])
              // console.log(sub.expirationTime)
              // console.log(sub)
              // const k = s.keys
              // const p256dh = sub.getKeys('p256dh')
              // const auth = sub.getKeys('auth')
              // console.log(p256dh)
              // console.log(auth)
              // console.log(sub.endpoint)
              // console.log(sub)
              UserService.subscribeEndpoint(JSON.stringify(sub))
                .then(response => {
                  console.log(response)
                  console.log('user subscribed')
                })
                .catch(err => {
                  if (err.response.status == 409) {
                    console.log('endpoint already exists')
                  }
                })
            })
          }
        })
      })
    }
  }
}
