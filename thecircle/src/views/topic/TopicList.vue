<template>
  <b-container>
    <br>
    <h1>{{title}}</h1>
    <b-table striped :fields="fields" responsive="sm" :sticky-header="true" :no-border-collapse="true"
             :items="allTopics">
      <template v-slot:cell(actions)="item">
        <b-link class="action" :to="{ name: 'topicDetail', params: { id: item.item._id } }">
          <b-icon-eye></b-icon-eye>
        </b-link>
      </template>
    </b-table>
  </b-container>
</template>

<script>
import {mapActions, mapGetters} from 'vuex';
export default {
  data() {
    return {
      title: "Topics",
      showDismissibleAlert: false,
      warning: '',
      variant: '',
      fields: ['author', 'description',
        {label: 'Actions', key: 'actions'}],
    }
  },
  methods: {
    ...mapActions(['fetchTopics'])
  },
  computed: mapGetters(['allTopics']),
  async created() {
      await this.fetchTopics();
  }
}
</script>

<style scoped>
.span {
  color: rgba(255, 255, 255, 0.75);
}
.action {
  color: black;
  margin-left: 5px;
  background: none;
  text-decoration: none;
}
</style>
