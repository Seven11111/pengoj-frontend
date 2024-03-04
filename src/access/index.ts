import store from "@/store";

import router from "@/router";
import ACCESS_ENUM from "@/access/accessEnum";
import checkAccess from "@/access/checkAccess";

router.beforeEach(async (to, from, next) => {
  // 仅管理员可见，判断当前用户是否有权限
  const loginUser = store.state.user.loginUser;

  // 如果之前没有登录，则自动登录
  if (!loginUser || !loginUser.userRole) {
    // 加 await 是为了登录执行之后再执行后面的代码
    await store.dispatch("user/getLoginUser");
  }

  const needAccess = (to?.meta?.access as string) ?? ACCESS_ENUM.NOT_LOGIN;

  // 要跳转的页面必须要登录
  if (needAccess !== ACCESS_ENUM.NOT_LOGIN) {
    // 如果没登录，跳转到登录页面
    if (!loginUser || !loginUser.userRole) {
      next(`/user/login?redirect=${to.fullPath}`);
      return;
    }
    // 如果已经登录，但是权限不足
    if (!checkAccess(loginUser, needAccess)) {
      next("/noAuth");
      return;
    }
  }
  next();
});
