import Vue from 'vue'
import Vuex from 'vuex'
import user from './user'
import topic from './topic'
import cert from './cert'
//load vuex
Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    user,
    topic,
    cert
  }
})
