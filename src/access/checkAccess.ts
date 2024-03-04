import ACCESS_ENUM from "@/access/accessEnum";

/**
 * 检查权限
 * @param loginUser  当前登录用户
 * @param needAccess  需要有的权限
 * @return boolean 有无权限
 */
const checkAccess = (
  loginUser: any,
  needAccess = ACCESS_ENUM.NOT_LOGIN
): boolean => {
  // 获取当前登录用户的权限，如果没有表示未登录
  const loginUserAccess = loginUser?.userRole ?? ACCESS_ENUM.NOT_LOGIN;
  if (needAccess === ACCESS_ENUM.NOT_LOGIN) {
    return true;
  }
  // 用户登录·才能访问
  if (needAccess === ACCESS_ENUM.USER) {
    // 未登录不能访问
    if (loginUserAccess === ACCESS_ENUM.NOT_LOGIN) {
      return false;
    }
  }

  // 管理员登录才能访问
  if (needAccess === ACCESS_ENUM.ADMIN) {
    if (loginUserAccess !== ACCESS_ENUM.ADMIN) {
      return false;
    }
  }

  return true;
};

export default checkAccess;
