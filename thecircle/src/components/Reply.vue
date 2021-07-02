<template>
  <b-container>
    <b-card
        :header="this.reply.reply.author"
        footer="Date:"
    >
      <b-card-text>{{ this.reply.reply.text }}</b-card-text>
    </b-card>
    <br>
  </b-container>
</template>

<script>
export default {
  name: "Reply",
  props: ["reply"],
  data() {
    return {
      item: null
    }
  },
}
</script>

<style scoped>

</style>
