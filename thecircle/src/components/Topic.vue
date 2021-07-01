<template>
  <b-container>
    <b-card
        :title="thread.thread.title"
        :img-src="thread.thread.image"
        img-alt=""
        img-top
        tag="article"
        style="max-width: 20rem;"
        class="mb-2"
    >
      <b-card-sub-title class="mb-2">{{thread.thread.username}}</b-card-sub-title>
      <b-card-body>
        <b-card-text>
          {{thread.thread.text}}
        </b-card-text>
        <b-card-sub-title class="mb-2">{{Date.parse(thread.thread.creationDate)}}</b-card-sub-title>
        <!--                <b-button v-on:click="threadDetail" variant="primary">Open Thread</b-button>-->
        <b-link class="btn btn-primary" id="commentView" :to="{ name: 'commentView', params: { thread: thread.thread.text,id: thread.thread.id } }">
          Open Thread
        </b-link>
      </b-card-body>
      <b-list-group v-if="owner" class="ml-auto">
        <b-list-group-item>
          <b-link class="action" id="threadDetail" :to="{ name: 'threadView', params: { id: thread.thread.id } }">
            <b-icon-eye></b-icon-eye>
          </b-link>
          <b-link class="action" id="threadEdit" :to="{ name: 'threadUpdate', params: { id: thread.thread.id } }">
            <b-icon-pencil></b-icon-pencil>
          </b-link>
          <b-link class="action" id="threadDelete" variant="link" @click="info($event.target)">
            <b-icon-trash></b-icon-trash>
          </b-link>
        </b-list-group-item>
      </b-list-group>
    </b-card>
  </b-container>
</template>

<script>
import {mapActions} from "vuex";
export default {
  name: "topic",
  props: ["topic"],
  data() {
    return {
      title: "topicList",
      showDismissibleAlert: false,
      warning: '',
      variant: '',
      owner: false,
    }
  },
  methods: {
    ...mapActions(['fetchThread','fetchThreads']),
    async topicDetail() {
      await this.$router.push('/topic/' + this.topic.id)
    }
  },
}
</script>

<style scoped>
.action {
  color: black;
  margin-left: 5px;
  background: none;
  text-decoration: none;
}
</style>
