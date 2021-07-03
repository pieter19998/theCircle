<template>
<b-container>
<h1>Certificate</h1>
  <p>Issuer: {{this.issuer}}</p>
  <p>Pem certificate: {{this.certificate}}</p>
</b-container>
</template>

<script>
import {mapActions, mapGetters} from 'vuex';

export default {
  name: "About",
  data() {
    return {
      issuer: "not found",
      certificate: "not found"
    }
  },
  methods: {
    ...mapActions(['fetchCertCircle'])
  },
  computed: mapGetters(['getCertCircle']),
  beforeMount() {
    this.fetchCertCircle()
    const forge = require('node-forge');
    const pem = forge.pki.certificateFromPem(this.getCertCircle.cert);
    this.issuer = pem.issuer.attributes[0].value
    this.certificate = this.getCertCircle.cert
  }
}
</script>

<style scoped>

</style>
