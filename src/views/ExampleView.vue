<template>
  <div class="exampleView">
    <MdEdit :value="mdValue" :handle-change="onMdChange" />
    <CodeEdit :value="codeValue" :handle-change="onCodeChange" />
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import MdEdit from "@/components/MdEdit.vue";
import CodeEdit from "@/components/CodeEdit.vue"; // @ is an alias to /src

const mdValue = ref();
const codeValue = ref();
const onMdChange = (v: string) => {
  mdValue.value = v;
  console.log("mdValue", mdValue.value);
};
const onCodeChange = (v: string) => {
  codeValue.value = v;
  console.log("codeValue", codeValue.value);
};
</script>
