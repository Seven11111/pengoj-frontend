import { StoreOptions } from "vuex";

export default {
  namespaced: true,
  // initial state
  state: () => ({
    loginUser: {
      userName: "未登录",
      role: "notLogin",
    },
  }),

  // getters
  getters: {},

  // mutations
  mutations: {
    updateUser(state, payload) {
      state.loginUser = payload;
    },
  },

  // actions
  actions: {
    // todo 改为从远程获取登录信息
    getLoginUser({ commit, state }, payload) {
      commit("updateUser", payload);
    },
  },
} as StoreOptions<any>;
