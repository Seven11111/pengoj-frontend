<template>
  <div id="userLoginView">
    <div class="title">用户登录</div>
    <a-form
      :model="form"
      @submit="handleSubmit"
      label-align="left"
      auto-label-width
      class="form"
    >
      <a-form-item field="userAccount" label="账号">
        <a-input v-model="form.userAccount" placeholder="请输入账号." />
      </a-form-item>
      <a-form-item field="userPassword" tooltip="密码不少于8位" label="密码">
        <a-input-password
          v-model="form.userPassword"
          placeholder="请输入密码"
        />
      </a-form-item>
      <a-form-item>
        <a-button type="primary" html-type="submit" class="button"
          >登录</a-button
        >
      </a-form-item>
    </a-form>
  </div>
</template>
<script setup lang="ts">
import { reactive } from "vue";
import { UserControllerService, UserLoginRequest } from "../../../generated";
import message from "@arco-design/web-vue/es/message";
import { useRoute, useRouter } from "vue-router";
import { useStore } from "vuex";

/**
 * 表达信息
 */
const form = reactive({
  userAccount: "",
  userPassword: "",
} as UserLoginRequest);

const router = useRouter();
const route = useRoute();
const store = useStore();
/**
 * 提交表单
 * @param data
 */
const handleSubmit = async () => {
  const res = await UserControllerService.userLoginUsingPost(form);
  // 登录成功,跳转到主页
  if (res.code === 0) {
    message.success("登录成功");
    await store.dispatch("user/getLoginUser");
    const redirectPath = route.query.redirect as string;
    router.push({
      path: redirectPath ?? "/",
      replace: true,
    });
  } else {
    message.error("登录失败" + res.message);
  }
};
</script>
<style>
#userLoginView .title {
  font-size: 20px;
  font-weight: bold;
  margin-bottom: 16px;
}

#userLoginView .form {
  max-width: 400px;
  margin: 0 auto;
}

#userLoginView .button {
  width: 100%;
}
</style>
