import type { MutationTree, ActionTree, GetterTree } from "vuex";
import type { State } from "../index";

export interface NewsState {
}

const state: NewsState = {
}

const mutations: MutationTree<NewsState> = {}
const actions: ActionTree<NewsState, State> = {}
const getters: GetterTree<NewsState, State> = {}

export default {
    namespace: true,
    state,
    mutations,
    actions,
    getters
}