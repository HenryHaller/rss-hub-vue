<template>
  <div class="full-page-grid">
    <Header title="RSSHub" />
    <div class="forms">
      <PasswordRecoveryAttemptForm />
    </div>
    <Footer text="Copyright 2019 Henry Haller" />
  </div>
</template>

<script>
import PasswordRecoveryAttemptForm from "@/components/forms/account/PasswordRecoveryAttemptForm";
import Header from "@/components/Header.vue";
import Footer from "@/components/Footer.vue";

export default {
  components: {
    Header,
    Footer,
    PasswordRecoveryAttemptForm
  }
};
</script>

<style scoped></style>
