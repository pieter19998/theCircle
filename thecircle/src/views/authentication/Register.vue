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
          <b-form-group label="password">
            <b-input :state="passwordLengthValidation" class="text-center" id="password" type="password"
                     v-model="password"></b-input>
            <b-form-invalid-feedback :state="passwordLengthValidation">
              Your password must be 5-25 characters long.
            </b-form-invalid-feedback>
            <b-form-valid-feedback :state="passwordLengthValidation">
              Looks Good.
            </b-form-valid-feedback>
          </b-form-group>
          <b-form-group label="Password repeat">
            <b-input :state="passwordRepeatValidation" class="text-center" id="passwordRepeat" type="password"
                     v-model="passwordRepeat"></b-input>
            <b-form-invalid-feedback :state="passwordRepeatValidation">
              Password doesn't match.
            </b-form-invalid-feedback>
            <b-form-valid-feedback :state="passwordRepeatValidation">
              Looks Good.
            </b-form-valid-feedback>
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
      password: "",
      passwordRepeat: "",
      warning: "",
      title: "Register",
      button: true
    }
  },
  methods: {
    ...mapActions(['registerUser', 'fetchCurrentUser']),
    async register() {
      const forge = require('node-forge');
      forge.options.usePureJavaScript = true;
      try {
        if (this.password === this.passwordRepeat) {
          await this.registerUser({
            email: this.email,
            password: this.password,
            fullName: this.fullName,
            key: await forge.pki.rsa.generateKeyPair(1024)
          });
          // await this.fetchCurrentUser();
          //reroute page
          await this.$router.push('/')
        }
        this.warning = "password doesn't match";
        this.showDismissibleAlert = true;
      } catch (e) {
        this.warning = e;
        this.showDismissibleAlert = true;
      }
    }
  },
  computed: {
    fullNameLengthValidation() {
      return this.fullName.length >= 5 && this.fullName.length < 50
    },
    passwordLengthValidation() {
      return this.password.length >= 5 && this.password.length < 20
    },
    passwordRepeatValidation() {
      return this.passwordRepeat === this.password
    }
  },
  async beforeCreate() {
    if (sessionStorage.getItem('token') !== null) {
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
