import md5 from "md5";
import { getUserProfile, login as loginUser } from "@/api/sys";
import { message } from "@/libs/Message/";

export default {
  namespaced: true,
  state: () => ({
    token: "",
    // 用户信息
    userInfo: {}
  }),
  mutations: {
    // 保存token
    setToken(state, newToken) {
      state.token = newToken;
    },
    // 保存用户信息
    setUserInfo(state, newUserInfo) {
      state.userInfo = newUserInfo;
    }
  },
  actions: {
    /**
     * login
     */
    async login(context, payload) {
      // 加密
      const { password } = payload;
      const data = await loginUser({
        ...payload,
        password: password ? md5(password) : ""
      });

      // 保存token
      context.commit("setToken", data?.token);
      // 获取用户信息
      context.dispatch("profile");
    },
    /**
     * 获取用户信息
     */
    async profile({ commit }) {
      const data = await getUserProfile();
      commit("setUserInfo", data);
      // 提示
      const call = data.vipLevel ? `尊贵的VIP用户${data.nickname}` : data.nickname;
      message("success", `欢迎回来 ${call}`, 6000);
    }
  }
};
