<template>
  <b-container>
    <h1>{{this.topic}}</h1>
    {{this.authStatus}}
    <b-card
        :header="this.topic"
        tag="article"
        :footer="new Date(this.creationDate).toUTCString()"
    >
      <b-card-sub-title class="mb-2">{{ this.author }}</b-card-sub-title>
      <b-card-body>
        <b-card-text>
          {{ this.description }}
        </b-card-text>
        <b-link v-if="this.authStatus" class="btn btn-primary" id="replyCreate" :to="{ name: 'replyCreate', params: { id: this.id } }">
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
      creationDate: "",
      reply: []
    }
  },
  methods: {
    ...mapActions(['fetchTopic', 'fetchUserLoggedIn'])
  },
  computed: mapGetters(['getTopic','authStatus']),
  async created() {
    await this.fetchTopic(this.$route.params.id);
    const data = await this.getTopic
    this.id = data._id
    this.topic = data.topic
    this.author = data.author
    this.description = data.description
    this.reply = data.reply
    this.creationDate = data.creationDate
  },
  async beforeMount() {
    await this.fetchUserLoggedIn()
    await console.log(this.authStatus)
  }
}
</script>
<style scoped>
  h1{
    margin-top: 25px;
    margin-bottom: 25px;
  }
</style>
