const config = require('../../config/routes.json');
import Axios from "axios";
const forge = require('node-forge');
const state = {
    loggedIn: false,
    currentUser: undefined,
    cert: undefined
};

const getters = {
    authStatus: state => state.loggedIn,
    currentUser: state => state.currentUser,
};

const actions = {
    async fetchToken({commit}, data) {
        const publicKey = forge.pki.publicKeyToPem(data.publicKey)
        const privateKey = forge.pki.privateKeyToPem(data.privateKey)
        sessionStorage.setItem('publicKey', publicKey);
        sessionStorage.setItem('privateKey', privateKey);
        const response = await Axios.post(config.userRoutes.login, {
            email: data.email,
            password: data.password,
            publicKey: publicKey
        });
        commit('setToken', response.data)
    },

    async logOut({commit}) {
        commit('logOut')
    },
    async registerUser({commit}, data) {
        await console.log(data)
        const publicKey = await forge.pki.publicKeyToPem(data.key.publicKey).toString();
        const privateKey = await forge.pki.privateKeyToPem(data.key.privateKey).toString();
        await localStorage.setItem('publicKey', publicKey);
        await localStorage.setItem('privateKey', privateKey);
        const response = await Axios.post(config.userRoutes.register, {
            fullName: data.fullName,
            email: data.email,
            publicKey:  publicKey
        });
        commit('setCert', response.data);
    },

    async fetchUserLoggedIn({commit}) {
        const response = localStorage.getItem('cert') !== null;
        commit('setloggedIn', response);
    },
};

const mutations = {
    setCert: (state, cert) => {
        console.log(cert)
        localStorage.setItem('cert', cert.cert);
        state.cert = cert.cert;
        state.loggedIn = true;
    },
    newUser: (state, user) => (state.user.push(user)),
    setloggedIn: (state, loggedIn) => {
        state.loggedIn = loggedIn;
    },
    setCurrentUser: (state, user) => (state.currentUser = user),
    logOut: (state) => {
        state.loggedIn = false;
        localStorage.removeItem("cert")
        localStorage.removeItem("publicKey")
        localStorage.removeItem("privateKey")
    }
};

export default ({
    state,
    mutations,
    actions,
    getters
})
