<template>
  <b-container>
    <h1>{{this.topic}}</h1>
    <b-card
        :header="this.topic"
        tag="article"
        footer="Date:"
    >
      <b-card-sub-title class="mb-2">{{ this.author }}</b-card-sub-title>
      <b-card-body>
        <b-card-text>
          {{ this.description }}
        </b-card-text>
        <!--        <b-card-sub-title class="mb-2">{{Date.parse(thread.thread.creationDate)}}</b-card-sub-title>-->
        <b-link class="btn btn-primary" id="replyCreate" :to="{ name: 'replyCreate', params: { id: this.id } }">
          Reply
        </b-link>
      </b-card-body>
    </b-card>
    <br>
    <div v-for="reply in this.reply" :key="reply._id">
      <Reply v-bind:reply="{reply}"></Reply>
    </div>

  </b-container>
</template>

<script>
import {mapActions, mapGetters} from 'vuex';
import Reply from "../../components/Reply";

export default {
  components: {Reply},
  data() {
    return {
      title: "TopicsDetail",
      id: "",
      topic: "",
      description: "",
      author: "",
      reply: []
    }
  },
  methods: {
    ...mapActions(['fetchTopic'])
  },
  computed: mapGetters(['getTopic']),
  async created() {
    await this.fetchTopic(this.$route.params.id);
    const data = await this.getTopic
    this.id = data._id
    this.topic = data.topic
    this.author = data.author
    this.description = data.description
    this.reply = data.reply
  },
}
</script>
<style scoped>
  h1{
    margin-top: 25px;
    margin-bottom: 25px;
  }
</style>
