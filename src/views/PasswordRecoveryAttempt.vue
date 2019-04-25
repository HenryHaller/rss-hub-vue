<template>
  <div
    class="d-flex justify-content-center align-items-center"
    style="min-height: calc(100vh - 120px)"
  >
    <PasswordRecoveryAttemptForm />
  </div>
</template>

<script>
import PasswordRecoveryAttemptForm from "@/components/forms/account/PasswordRecoveryAttemptForm";
export default {
  components: {
    PasswordRecoveryAttemptForm
  }
};
</script>

<style scoped></style>
