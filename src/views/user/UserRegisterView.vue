<template>
  <div id="userRegisterView">
    <div class="title">用户注册</div>
    <a-form
      :model="form"
      @submit="handleSubmit"
      label-align="left"
      auto-label-width
      class="form"
      :rules="rules"
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
      <a-form-item field="checkPassword" label="确认密码">
        <a-input-password
          v-model="form.checkPassword"
          placeholder="请再次输入密码"
        />
      </a-form-item>
      <a-form-item>
        <a-link href="/user/login" class="link">立即登录</a-link>
      </a-form-item>
      <a-form-item>
        <a-button type="primary" html-type="submit" class="button"
          >注册
        </a-button>
      </a-form-item>
    </a-form>
  </div>
</template>
<script setup lang="ts">
import { reactive } from "vue";
import {
  UserControllerService,
  UserLoginRequest,
  type UserRegisterRequest,
} from "../../../generated";
import message from "@arco-design/web-vue/es/message";
import { useRoute, useRouter } from "vue-router";
import { useStore } from "vuex";

/**
 * 表达信息
 */
const form = reactive({
  userAccount: "",
  userPassword: "",
  checkPassword: "",
} as UserRegisterRequest);

const router = useRouter();
const route = useRoute();
const store = useStore();

const rules = {
  userAccount: [
    {
      validator: (value: string, cb: any) => {
        if (
          value === undefined ||
          !/^[\u4e00-\u9fa5a-zA-Z0-9]{1,20}$/.test(value)
        ) {
          cb("账号不能为空");
        } else {
          cb();
        }
      },
    },
  ],
  userPassword: [
    {
      validator: (value: string, cb: any) => {
        if (value === undefined || !/^[a-zA-Z0-9]{8,12}$/.test(value)) {
          cb("密码应为8-16位");
        } else {
          cb();
        }
      },
    },
  ],
  checkPassword: [
    {
      validator: (value: string, cb: any) => {
        if (value !== form.userPassword) {
          cb("两次密码输入不一致");
        } else {
          cb();
        }
      },
    },
  ],
};
/**
 * 提交表单
 * @param data
 */
const handleSubmit = async () => {
  const res = await UserControllerService.userRegisterUsingPost(form);
  // 登录成功,跳转到主页
  if (res.code === 0) {
    message.success("注册成功");
    router.push({
      path: "/user/login",
      replace: true,
    });
  } else {
    message.error("注册失败" + res.message);
  }
};
</script>
<style>
#userRegisterView .title {
  font-size: 20px;
  font-weight: bold;
  margin-top: 16px;
  margin-bottom: 32px;
}

#userRegisterView .form {
  max-width: 400px;
  margin: 0 auto;
}

#userRegisterView .button {
  width: 100%;
}

#userRegisterView .link {
  margin-left: auto;
}
</style>
