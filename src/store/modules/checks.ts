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
    namespace: true,
    state,
    mutations,
    actions,
    getters
}