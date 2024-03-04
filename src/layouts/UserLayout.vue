<template>
  <div id="userLayout">
    <a-layout style="min-height: 100vh">
      <a-layout-header class="header">
        <a-space>
          <img src="../assets/logo.png" alt="彭 OJ" class="logo" />
          <div class="title">彭 OJ</div>
        </a-space>
      </a-layout-header>
      <a-layout-content class="content">
        <router-view />
      </a-layout-content>
      <a-layout-footer class="footer">底部栏</a-layout-footer>
    </a-layout>
  </div>
</template>

<style scoped>
#userLayout {
  text-align: center;
  background: url("../assets/background.png") 0% 0% / 100% 100%;
}

#userLayout .logo {
  height: 64px;
  width: 64px;
}

#userLayout .title {
  color: #444;
  font-size: 20px;
  font-weight: bold;
  margin-left: 16px;
}

#userLayout .header {
  margin-top: 16px;
}

#userLayout .content {
  padding: 20px;
  margin-bottom: 16px;
}

#userLayout .footer {
  margin-bottom: 16px;
  padding: 16px;
  position: sticky;
  bottom: 0;
  left: 0;
  right: 0;
  text-align: center;
}
</style>
<script setup lang="ts"></script>
