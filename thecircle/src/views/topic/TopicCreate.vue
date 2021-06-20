<template>
  <b-container>
    <br>
    <b-alert v-model="showDismissibleAlert" variant="danger" dismissible>
      {{ warning }}
    </b-alert>
    <b-row>
      <b-col class="align-middle">
        <b-form @submit.self.prevent="create">
          <div>
            <h2>{{ title }}</h2>
            <label>Topic:</label>
            <b-input v-model="topic" class="text-center" type="text" required id="text-topic"
                     aria-describedby="username-help-block">
            </b-input>
          </div>
          <div class="form-part">
            <label>Description:</label>
            <b-form-textarea
                id="textarea"
                v-model="description"
                placeholder="Enter description..."
                rows="3"
                max-rows="6"
            ></b-form-textarea>
          </div>
          <div class="form-part">
            <br>
            <input type="submit" value="create" class="btn btn-primary"/>
          </div>
        </b-form>
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
import {mapActions} from "vuex";

export default {
  name: "Topic",
  data() {
    return {
      showDismissibleAlert: false,
      topic: "",
      description: "",
      warning: "",
      title: "Topic"
    }
  },
  methods: {
    ...mapActions(['createTopic']),
    async create() {
      try {
        const data = {
          topic: this.topic,
          description: this.description,
        }
        data.hash = await this.sign(data)
        await this.createTopic(data);
        await this.$router.push('/');
      } catch (e) {
        this.warning = e;
        this.showDismissibleAlert = true;
      }
    },
    sign(data) {
      const NodeRSA = require('node-rsa');
      const key = new NodeRSA(sessionStorage.getItem('privateKey'));
      return key.sign(data, 'base64', 'sha256')
    }
  },
  async created() {
    if (sessionStorage.getItem('token') === null) {
      await this.$router.push('/')
    }
  }
}
</script>

<style scoped>

</style>
