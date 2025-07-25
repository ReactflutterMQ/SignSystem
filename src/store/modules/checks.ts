import type { MutationTree, ActionTree, GetterTree } from "vuex";
import type { State } from "../index";
import http from "@/utils/http";

interface Info {
    [index: string]: unknown
}

export interface ChecksState {
    applyList: Info[]
}

const state: ChecksState = {
    applyList: []
}

const mutations: MutationTree<ChecksState> = {
    updateApplyList(state, payload) {
        state.applyList = payload
    }
}
const actions: ActionTree<ChecksState, State> = {
    getApply(context, payload) {
        return http.get('/checks/apply', payload)
    },
    postApply(context, payload) {
        return http.post('/checks/apply', payload)
    }
}
const getters: GetterTree<ChecksState, State> = {}

export default {
    namespaced: true, // 开启命名空间
    state,
    mutations,
    actions,
    getters
}