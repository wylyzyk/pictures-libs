import request from "@/utils/request";

export const getPexlesList = (data) => {
  return request({
    url: "/pexels/list",
    params: data
  });
};

/**
 * 获取搜索提示
 */
export const getHint = (q) => {
  return request({
    url: "/pexels/hint",
    params: {
      q
    }
  });
};

/**
 * 获取推荐主题
 */
export const getThemes = () => {
  return request({
    url: "/pexels/themes"
  });
};
