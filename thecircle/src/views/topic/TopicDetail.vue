<template>
  <b-container>
    <h1>Detail</h1>
    <b-card
        :title="this.data.topic"
        tag="article"
        style="max-width: 200rem;"
        class="mb-2"
    >
      <b-card-sub-title class="mb-2">{{this.data.author}}</b-card-sub-title>
      <b-card-body>
        <b-card-text>
          {{this.data.description}}
        </b-card-text>
<!--        <b-card-sub-title class="mb-2">{{Date.parse(thread.thread.creationDate)}}</b-card-sub-title>-->
        <b-link class="btn btn-primary" id="replyCreate" :to="{ name: 'replyCreate', params: { id: this.data._id } }">
          Reply
        </b-link>
      </b-card-body>
    </b-card>



    <li v-for="item in this.data." :key="item.message">
      {{ item.message }}
    </li>

  </b-container>
</template>

<script>
import {mapActions, mapGetters} from 'vuex';

export default {
  data() {
    return {
      title: "TopicsDetail",
      data: undefined
    }
  },
  methods: {
    ...mapActions(['fetchTopics'])
  },
  computed: mapGetters(['getTopic']),
  async created() {
    this.data = await this.getTopic(this.$route.params.id)[0];
  },
}
</script>
<style scoped>

</style>
