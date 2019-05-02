import apiClient from './apiClient'

export default {
  getShowEpisodes(id, page) {
    const params = {
      page
    }
    return apiClient.get(`/shows/${id}`, {
      params
    })
  },
  getEpisodes(page) {
    const params = {
      page
    }
    return apiClient.get('/episodes', {
      params
    })
  },
  getShows() {
    return apiClient.get('/shows')
  },
  subscribe(input) {
    return apiClient.post('/shows', input)
  },
  unSubscribe(show_id) {
    return apiClient.delete(`/shows/${show_id}`)
  },
  setNotifications(update) {
    return apiClient.patch('/notification_subscriptions/', update)
  }
  // getEvent(id) {
  //   return apiClient.get("/shows" + id);
  // }
}
