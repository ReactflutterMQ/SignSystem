import type { MutationTree, ActionTree, GetterTree } from "vuex";
import type { State } from "../index";
import http from "@/utils/http";

interface Info {
    [index: string]: unknown
}

export interface ChecksState {
    applyList: Info[],
    checkList: Info[]
}

const state: ChecksState = {
    applyList: [],
    checkList: []
}

const mutations: MutationTree<ChecksState> = {
    updateApplyList(state, payload) {
        state.applyList = payload
    },
    updateCheckList(state, payload) {
        state.checkList = payload
    }
}
const actions: ActionTree<ChecksState, State> = {
    getApply(context, payload) {
        return http.get('/checks/apply', payload)
    },
    postApply(context, payload) {
        return http.post('/checks/apply', payload)
    },
    putApply(context, payload) {
        return http.put('/checks/apply', payload)
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