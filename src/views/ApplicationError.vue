<template>
  <div
    class="text-light"
    style="min-height: calc(100vh - 120px);
      display: grid;
      grid-template-rows: 0.5fr 1fr;
      grid-template-columns: 1fr;
  "
  >
    <div class="text-center d-flex flex-column justify-content-center">
      <p>Error connecting to the API!</p>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
export default {
  name: 'ApplicationError'
}
</script>

<style scoped lang="scss"></style>
