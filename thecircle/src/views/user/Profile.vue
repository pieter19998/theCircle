<template>
  <b-container>
    <br>
    <h1></h1>
    <label>PublicKey</label>
    <b-form-input type="password" id="text-password" aria-describedby="password-help-block" disabled>{{ cert }}
    </b-form-input>
    <label>PrivateKey</label>
    <b-form-input type="password" id="text-password" aria-describedby="password-help-block" disabled></b-form-input>
    <label>Cert</label>
    <b-form-input type="password" id="text-password" aria-describedby="password-help-block" disabled></b-form-input>
  </b-container>
</template>

<script>
export default {
  name: "Profile",
  data() {
    return {
      cert: localStorage.getItem('cert'),
      public: localStorage.getItem('publicKey'),
      private: localStorage.getItem('privateKey')
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
