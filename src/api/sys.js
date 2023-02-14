import request from "@/utils/request";

/***
 * 人类行为验证
 */
export const getCaptcha = (data) => {
  return request({
    url: "/sys/captcha",
    method: "POST",
    data
  });
};

/**
 * 登录
 */
export const login = (data) => {
  return request({
    url: "/sys/login",
    method: "POST",
    data
  });
};

/**
 * 获取用户信息
 */
export const getUserProfile = () => {
  return request({
    url: "/user/profile"
  });
};

/**
 * 修改用户信息
 */
export const puProfile = (data) => {
  return request({
    url: "/user/profile",
    method: "PUT",
    data
  });
};
