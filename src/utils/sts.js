import OSS from "ali-oss";
import { getSts } from "@/api/sys";
import { BUCKET, REGION } from "@/constants";

export const getOSSClient = async () => {
  const res = await getSts();

  return new OSS({
    // bucket 所在区域
    region: REGION,
    // id
    accessKeyId: res.Credentials.AccessKeyId,
    // secret
    accessKeySecret: res.Credentials.AccessKeySecret,
    // token
    stsToken: res.Credentials.SecurityToken,
    // bucket
    bucket: BUCKET,
    // 刷新token
    refreshSTSToken: async () => {
      const res = await getSts();
      return {
        // id
        accessKeyId: res.Credentials.AccessKeyId,
        // secret
        accessKeySecret: res.Credentials.AccessKeySecret,
        // token
        stsToken: res.Credentials.SecurityToken
      };
    },
    // 刷新临时凭证的时间间隔
    refreshSTSTokenInterval: 5 * 1000
  });
};
