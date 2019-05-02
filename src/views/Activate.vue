<template>
  <div>
    <div>Activating Your account. Please wait.</div>
  </div>
</template>

<script>
import UserService from '@/services/UserService'

export default {
  mounted() {
    let vars = {}
    window.location.href.replace(/[?&]+([^=&]+)=([^&]*)/gi, function(m, key, value) {
      vars[key] = value
    })
    // console.log(vars);
    let activation_credentials = {}
    activation_credentials['activation_token'] = vars['activation_token']
    activation_credentials['email'] = vars['email']
    activation_credentials['email'] = decodeURIComponent(activation_credentials['email'])
    UserService.activateAccount(activation_credentials).then(response => {
      if (response.status === 200) {
        this.flash('Activated! Please log in.', 'success')
        this.$router.push({ name: 'Home' })
      }
    })
  }
}
</script>

<style scoped></style>
