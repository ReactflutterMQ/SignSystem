import type { MutationTree, ActionTree, GetterTree } from "vuex";
import type { State } from "../index";

export interface ChecksState {
}

const state: ChecksState = {
}

const mutations: MutationTree<ChecksState> = {}
const actions: ActionTree<ChecksState, State> = {}
const getters: GetterTree<ChecksState, State> = {}

export default {
    namespaced: true, // 开启命名空间
    state,
    mutations,
    actions,
    getters
}