<template>
  <div>
    <div class="modal-background"></div>
    <div class="modal">
      <div class="modal-pad">
        <div class="modal-content">
          <div class="upper-modal" v-if="inputToggle">
            <ListenNotesForm />
            <button @click="inputToggle = !inputToggle">
              Add by Direct Link
            </button>
          </div>
          <div class="upper-modal" v-else>
            <SubscribeForm />
            <button @click="inputToggle = !inputToggle">
              Search for Shows
            </button>
          </div>
          <div class="lower-modal buttons">
            <button @click.prevent="close">Close</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import ListenNotesForm from "@/components/forms/content/ListenNotesForm.vue";
import SubscribeForm from "@/components/forms/content/SubscribeForm.vue";

export default {
  components: { ListenNotesForm, SubscribeForm },
  methods: {
    close() {
      this.$emit("close-subscribe-modal");
    }
  },
  data() {
    return {
      inputToggle: true
    };
  }
};
</script>

<style scoped lang="scss">
form {
  height: 50%;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;
  input[type="text"] {
    width: 80%;
  }
}

.lower-modal {
  justify-self: center;
  align-self: center;
}
</style>
