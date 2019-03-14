<template>
  <div>
    <div class="modal-background"></div>
    <div class="modal">
      <div class="modal-pad">
        <div class="modal-content">
          <div class="upper-modal">
            <div class="upper-content">
              <UpdatePasswordForm />
              <LogoutButton />
            </div>
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
import UpdatePasswordForm from "@/components/forms/account/UpdatePasswordForm.vue";
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
  display: flex;
  flex-direction: column;
  justify-content: center;
  height: 100%;
  .upper-content {
    display: flex;
    flex-direction: column;
    height: 50%;
    align-items: center;
    justify-content: space-around;
  }
}
.lower-modal {
  justify-self: center;
  align-self: center;
}
</style>
