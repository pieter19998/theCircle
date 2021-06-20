<template>
  <b-container>
    <br>
    <b-alert v-model="showDismissibleAlert" variant="danger" dismissible>
      {{warning}}
    </b-alert>
    <b-row>
      <b-col class="align-middle">
        <b-form @submit.self.prevent="login">
          <div>
            <h2>{{title}}</h2>
            <label>Email:</label>
            <b-input v-model="email" class="text-center" type="email" required id="text-email"
                     aria-describedby="username-help-block"/>
          </div>
          <div class="form-part">
            <label>Password:</label>
            <b-input v-model="password" class="text-center" type="password" id="text-password"
                     aria-describedby="password-help-block"/>
          </div>
          <div class="form-part">
            <br>
            <input type="submit" value="login" class="btn btn-primary"/>
          </div>
        </b-form>
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
import {mapActions, mapGetters} from 'vuex';
export default {
  name: 'login',
  data() {
    return {
      showDismissibleAlert: false,
      email: "",
      password: "",
      warning: "",
      title: "Login"
    }
  },
  methods: {
    ...mapActions(['fetchToken', 'fetchCurrentUser']),
    async login(){
      const NodeRSA = require('node-rsa');
      const rsa = new NodeRSA({b: 512}, "pkcs1", {environment: 'browser', signingScheme: 'sha256'})
      try {
        await this.fetchToken({email: this.email, password: this.password, key: rsa.generateKeyPair()});
        //reroute page
        await this.$router.push('/')
      }catch (e) {
        this.warning = e;
        this.showDismissibleAlert = true;
      }
    }
  },
  computed: mapGetters(['authStatus']),
  async created() {
    if (this.authStatus) {
      await this.$router.push('/')
    }
  }
}
</script>

<style scoped>
h2 {
  padding-bottom: 15px;
  padding-top: 15px;
}
.form-part {
  padding-bottom: 10px;
  padding-top: 10px;
}
</style>
