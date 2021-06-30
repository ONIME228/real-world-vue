import { reactive } from 'vue';
import { createStore } from 'vuex';

export const GStore = reactive({ flashMessage: '', event: null });
export const store = createStore({
    state: {
        user: 'Adam Jahr',
        events: [],
    },
    mutations: {
        ADD_EVENT(state, event) {
            state.events.push(event);
        }
    },
    actions: {
        createEvent({ commit }, event) {
            commit("ADD_EVENT", event);
        },
    },
    modules: {},
});