<template>
  <b-container>
    <br>
    <h1></h1>
    <label>PublicKey</label>
    <b-form-input type="text" :value="this.public" disabled></b-form-input>
    <label>PrivateKey</label>
    <b-form-input type="text" :value="this.private" disabled></b-form-input>
    <label>Cert</label>
    <b-form-input type="text" :value="this.cert" disabled></b-form-input>
  </b-container>
</template>

<script>
export default {
  name: "Profile",
  data() {
    return {
      cert: localStorage.getItem('cert'),
      public: localStorage.getItem('publicKey'),
      private: localStorage.getItem('privateKey'),
      labelType: "password"
    }
  },
  async created() {
    if (localStorage.getItem('cert') === null) {
      await this.$router.push('/')
    }
  }
}
</script>
