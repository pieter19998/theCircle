<script src="../../store/topic.js"></script>
<template>
  <b-container>
    <br>
    <b-alert dismissible v-model="showDismissibleAlert" variant="danger">
      {{ warning }}
    </b-alert>
    <b-row>
      <b-col class="align-middle">
        <b-form @submit.self.prevent="register">
          <h2>{{ title }}</h2>
          <b-form-group label="fullName">
            <b-input :state="fullNameLengthValidation" class="text-center" id="fullName"
                     v-model="fullName"></b-input>
            <b-form-invalid-feedback :state="fullNameLengthValidation">
              Your full name must be 5-50 characters long.
            </b-form-invalid-feedback>
            <b-form-valid-feedback :state="fullNameLengthValidation">
              Looks Good.
            </b-form-valid-feedback>
          </b-form-group>
          <b-form-group label="Email">
            <b-input aria-describedby="email-help-block" class="text-center" id="email" required
                     type="email"
                     v-model="email"/>
          </b-form-group>
          <b-form-group class="form-part">
            <br>
            <input class="btn btn-primary" type="submit" value="register"/>
          </b-form-group>
        </b-form>
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
import {mapActions} from "vuex";

export default {
  name: "register",
  data() {
    return {
      showDismissibleAlert: false,
      fullName: '',
      email: '',
      warning: "",
      title: "Register",
      button: true
    }
  },
  methods: {
    ...mapActions(['registerUser']),
    async register() {
      const forge = require('node-forge');
      forge.options.usePureJavaScript = true;
      try {
          await this.registerUser({
            email: this.email,
            fullName: this.fullName,
            key: await forge.pki.rsa.generateKeyPair(1024)
          });
          //reroute page
          await this.$router.push('/')
      } catch (e) {
        this.warning = e;
        this.showDismissibleAlert = true;
      }
    }
  },
  computed: {
    fullNameLengthValidation() {
      return this.fullName.length >= 5 && this.fullName.length < 50
    }
  },
  async beforeCreate() {
    if (localStorage.getItem('cert') !== null) {
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
