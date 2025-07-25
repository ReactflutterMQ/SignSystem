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
    namespaced: true, // 开启命名空间
    state,
    mutations,
    actions,
    getters
}