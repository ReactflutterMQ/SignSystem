import type { MutationTree, ActionTree, GetterTree } from "vuex";
import type { State } from "../index";
import http from "@/utils/http";

interface Info {
    [index: string]: unknown
}

export interface SignsState {
    infos: Info
}

const state: SignsState = {
    infos: {}
}

const mutations: MutationTree<SignsState> = {
    updateInfos(state, payload) {
        state.infos = payload
    }
}
const actions: ActionTree<SignsState, State> = {
    getTime(context, payload) {
        return http.get('/signs/time', payload)
    },
    putTime(context, payload) {
        return http.put('/signs/time', payload)
    }
}
const getters: GetterTree<SignsState, State> = {}

export default {
    namespaced: true, // 开启命名空间
    state,
    mutations,
    actions,
    getters
}