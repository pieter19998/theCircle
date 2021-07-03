const config = require('../../config/routes.json');
import Axios from "axios";

const state = {
    cert: undefined
};

const getters = {
    getCertCircle: state => state.cert
};

const actions = {
    async fetchCertCircle({commit}) {
        const response = await Axios.get(config.certRoutes.fetch);
        commit('setCertTheCircle', response.data)
    }
};

const mutations = {
    setCertTheCircle: (state, cert) => (state.cert = cert),
};

export default ({
    state,
    mutations,
    actions,
    getters
})
