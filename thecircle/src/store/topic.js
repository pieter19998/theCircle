const config = require('../../config/routes.json');
import Axios from "axios";

const state = {
    topics: [],
};

const getters = {
    allTopics: state => state.topics,
};

const actions = {
    async fetchTopics({commit}) {
        Axios.defaults.headers.common["token"] = sessionStorage.getItem('token');
        const response = await Axios.get(config.topicRoutes.fetchAll);
        commit('setTopic', response.data)
    },
    async createTopic({commit}, data) {
        Axios.defaults.headers.common["token"] = sessionStorage.getItem('token');
        const response = await Axios.post(config.topicRoutes.post, {
            topic: data.topic,
            description: data.description,
            hash: data.hash
        });
        commit('newTopic', response.data)
    }
};

const mutations = {
    setTopic: (state, topic) => (state.topics = topic),
    newTopic: (state, topic) => (state.topics.push(topic)),
};

export default ({
    state,
    mutations,
    actions,
    getters
})
