const config = require('../../config/routes.json');
import Axios from "axios";

const state = {
    topics: [],
};

const getters = {
    allTopics: state => state.topics,
    getTopic(state) {
        return topic => state.topics.filter(item => {
            return item._id === topic
        });
    }

};

const actions = {
    async fetchTopics({commit}) {
        const response = await Axios.get(config.topicRoutes.fetchAll);
        commit('setTopic', response.data)
    },
    async createTopic({commit}, data) {
        const response = await Axios.post(config.topicRoutes.post, {
            topic: data.topic,
            description: data.description,
            hash: data.hash,
            cert: localStorage.getItem("cert")
        });
        commit('newTopic', response.data)
    },
    async createReply({commit}, data) {
        const response = await Axios.post(config.replyRoutes.post + data.topicId, {
            text: data.text,
            hash: data.hash,
            cert: localStorage.getItem("cert")
        });
        commit('newReply', response.data)
    }
};

const mutations = {
    setTopic: (state, topic) => (state.topics = topic),
    newTopic: (state, topic) => (state.topics.push(topic)),
    newReply: (state, reply) => (console.log(reply)),
};

export default ({
    state,
    mutations,
    actions,
    getters
})
