export const validateUsername = (val) => {
  if (!val) {
    return "用户名不能为空";
  }
  if (val.length < 3 || val.length > 12) {
    return "用户名在3到12位之间";
  }
  return true;
};

export const validatePassword = (val) => {
  if (!val) {
    return "密码不能为空";
  }
  if (val.length < 6 || val.length > 12) {
    return "密码在6到12位之间";
  }
  return true;
};
