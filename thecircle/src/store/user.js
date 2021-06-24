const config = require('../../config/routes.json');
import Axios from "axios";
const state = {
    users: [],
    loggedIn: false,
    currentUser: undefined,
    token: undefined
};

const getters = {
    allUsers: state => state.users,
    authStatus: state => state.loggedIn,
    currentUser: state => state.currentUser,
    token: state => state.token
};

const actions = {
    async fetchToken({commit}, data) {
        const publicKey = data.key.exportKey('public')
        const privateKey = data.key.exportKey()
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
        const publicKey = data.key.exportKey('public')
        const privateKey = data.key.exportKey()
        localStorage.setItem('publicKey', publicKey);
        localStorage.setItem('privateKey', privateKey);
        const response = await Axios.post(config.userRoutes.register, {
            fullName: data.fullName,
            email: data.email,
            password: data.password,
            publicKey: publicKey
        });
        commit('setToken', response.data);
    },
    async fetchCurrentUser({commit}) {
        Axios.defaults.headers.common["token"] = sessionStorage.getItem("token");
        const response = await Axios.get(config.userRoutes.fetch);
        // commit('newUser', response.data);
        commit('setCurrentUser', response.data);
    },

    async fetchUserLoggedIn({commit}) {
        const response = !!sessionStorage.getItem('token');
        commit('setloggedIn', response);
    },
    async updateUser({commit}, data) {
        Axios.defaults.headers.common["token"] = sessionStorage.getItem('token');
        await Axios.put(config.userRoutes.fetch, {
            fullName: data.fullName,
            email: data.email
        });
        commit('setCurrentUser', data);
    }
};

const mutations = {
    setToken: (state, token) => {
        sessionStorage.setItem('token', token.token);
        state.token = token.token;
        state.loggedIn = true;
    },
    newUser: (state, user) => (state.user.push(user)),
    setloggedIn: (state, loggedIn) => {
        state.loggedIn = loggedIn;
        if (loggedIn) state.token = sessionStorage.getItem('token')
    },
    setCurrentUser: (state, user) => (state.currentUser = user),
    logOut: (state) => {
        state.loggedIn = false;
        state.admin = false;
        sessionStorage.removeItem("token")
    }
};

export default ({
    state,
    mutations,
    actions,
    getters
})
