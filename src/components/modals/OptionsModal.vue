<template>
  <div>
    <div class="modal-background"></div>
    <div class="modal">
      <div class="modal-pad">
        <div class="modal-content">
          <div class="upper-modal">
            <UpdatePasswordForm />
            <LogoutButton />
          </div>
          <div class="lower-modal">
            <button @click="close" class="close-button">Close</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import LogoutButton from "@/components/LogoutButton.vue";
import UpdatePasswordForm from "@/components/forms/UpdatePasswordForm.vue";
export default {
  components: {
    LogoutButton,
    UpdatePasswordForm
  },
  methods: {
    close() {
      this.$emit("close-options-modal");
    }
  }
};
</script>

<style scoped lang="scss">
.upper-modal {
  justify-self: center;
  align-self: center;
}
.lower-modal {
  justify-self: center;
  align-self: center;
}
</style>
