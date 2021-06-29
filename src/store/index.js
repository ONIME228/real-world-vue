import { reactive } from 'vue';
import { createStore } from 'vuex';

export const GStore = reactive({ flashMessage: '', event: null });
export const store = createStore({
    state: {
        user: 'Adam Jahr'
    },
    mutations: {},
    actions: {},
    modules: {},
});