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
          </div>
          <div class="form-part">
            <label>Text:</label>
            <b-form-textarea
                id="textarea"
                v-model="text"
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
  name: "Reply",
  data() {
    return {
      showDismissibleAlert: false,
      text: "",
      warning: "",
      title: "Reply"
    }
  },
  methods: {
    ...mapActions(['createReply']),
    async create() {
      try {
        const data = {
          text: this.text,
        }
        data.hash = await this.sign(data)
        data.topicId = this.$route.params.id
        await this.createReply(data);
        await this.$router.push('/topic/detail/' + this.$route.params.id);
      } catch (e) {
        this.warning = e;
        this.showDismissibleAlert = true;
      }
    },
    sign(data) {
      const forge = require('node-forge')
      const md = forge.md.sha256.create();
      md.update(data, 'utf8');
      const key = forge.pki.privateKeyFromPem(localStorage.getItem("privateKey"))
      return key.sign(md);
    }
  },
  async created() {
    if (localStorage.getItem('cert') === null) {
      await this.$router.push('/')
    }
  }
}
</script>

<style scoped>

</style>
