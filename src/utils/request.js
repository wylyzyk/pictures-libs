import { default as axios } from "axios";
import { getTestICode } from "../../icode";
import store from "@/store";

const service = axios.create({
  baseURL: "/api",
  timeout: 5000
});

// 请求拦截器
service.interceptors.request.use(
  (config) => {
    const { icode, time } = getTestICode();
    config.headers.codeType = time;
    config.headers.icode = icode;

    if (store.getters.token) {
      config.headers.Authorization = `Bearer ${store.getters.token}`;
    }

    return config;
  },
  (err) => {
    return Promise.reject(err);
  }
);

// 响应拦截器
// 返回数据之后, .then之前
service.interceptors.response.use((response) => {
  const { success, data, message } = response.data;
  if (success) {
    return data;
  }
  // 业务请求数据发生错误
  return Promise.reject(new Error(message));
});

export default service;
