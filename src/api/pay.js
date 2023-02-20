import request from "@/utils/request";

/**
 * 获取vip支付数据
 */
export const getVipPayList = () => {
  return request({
    url: "/user/vip/pay/list"
  });
};
