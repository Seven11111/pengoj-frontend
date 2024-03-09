<template>
  <div id="addQuestionView">
    <div v-if="updatePage">
      <h2>更新题目</h2>
    </div>
    <div v-else>
      <h2>创建题目</h2>
    </div>
    <a-form :model="form" @submit="handleSubmit">
      <a-form-item field="title" label="标题">
        <a-input v-model="form.title" placeholder="请输入题目标题" />
      </a-form-item>
      <a-form-item field="tags" label="标签">
        <a-input-tag
          v-model="form.tags"
          placeholder="请选择标签标签"
          allow-clear
        />
      </a-form-item>
      <a-form-item field="content" label="内容">
        <MdEdit
          :value="form.content"
          :handle-change="onContentChange"
          style="min-width: 400px"
        />
      </a-form-item>
      <a-form-item field="answer" label="答案">
        <MdEdit :value="form.answer" :handle-change="onAnswerChange" />
      </a-form-item>

      <a-form-item label="题目配置" :content-flex="false" :merge-props="false">
        <a-space direction="vertical">
          <a-form-item field="judgeConfig.memoryLimit" label="内存限制（KB）">
            <a-input-number
              v-model="form.judgeConfig.memoryLimit"
              placeholder="请输入题目最大内存限制..."
              :style="{ width: '550px' }"
              :min="0"
            />
          </a-form-item>
          <a-form-item field="judgeConfig.stackLimit" label="堆栈限制（KB）">
            <a-input-number
              v-model="form.judgeConfig.stackLimit"
              placeholder="请输入题目最大堆栈限制..."
              :style="{ width: '550px' }"
              :min="0"
            />
          </a-form-item>
          <a-form-item field="judgeConfig.timeLimit" label="时间限制（ms）">
            <a-input-number
              v-model="form.judgeConfig.timeLimit"
              placeholder="请输入题目最大时间限制..."
              :style="{ width: '550px' }"
              :min="0"
            />
          </a-form-item>
        </a-space>
      </a-form-item>
      <a-form-item label="测试用例" :content-flex="false" :merge-props="false">
        <a-space direction="vertical">
          <a-form-item
            v-for="(judgeCaseItem, index) of form.judgeCase"
            :label="`测试用例-${index}`"
            :key="index"
            no-style
          >
            <a-form-item
              :field="`form.judgeCase[${index}].input`"
              :label="`输入用例-${index}`"
              :key="index"
            >
              <a-input
                v-model="judgeCaseItem.input"
                placeholder="请输入测试输入用例..."
              />
            </a-form-item>
            <a-form-item
              :field="`form.judgeCase[${index}].output`"
              :label="`输出用例-${index}`"
              :style="{ width: '550px' }"
              :key="index"
            >
              <a-input
                v-model="judgeCaseItem.output"
                placeholder="请输入测试输出用例..."
                :style="{ width: '550px' }"
              />
            </a-form-item>

            <a-button
              @click="handleDelete(index)"
              status="danger"
              style="float: right"
              >删除
            </a-button>
          </a-form-item>
        </a-space>
        <div style="margin-top: 32px">
          <a-button @click="handleAdd" type="outline">新增测试用例</a-button>
        </div>
      </a-form-item>
      <div style="margin-top: 16px"></div>
      <a-form-item>
        <a-button html-type="submit" type="primary" style="min-width: 200px"
          >提交
        </a-button>
      </a-form-item>
    </a-form>
  </div>
</template>
<script setup lang="ts">
import { onMounted, reactive, ref } from "vue";
import MdEdit from "@/components/MdEdit.vue";
import {
  QuestionAddRequest,
  QuestionControllerService,
} from "../../../generated";
import message from "@arco-design/web-vue/es/message";
import { useRoute } from "vue-router";

const route = useRoute();
const updatePage = route.path.includes("update");

const form = ref({
  title: "",
  tags: [],
  answer: "",
  content: "",
  judgeCase: [
    {
      input: "",
      output: "",
    },
  ],
  judgeConfig: {
    memoryLimit: 1000,
    stackLimit: 1000,
    timeLimit: 1000,
  },
});

const loadData = async () => {
  const id = route.query.id;
  if (!id) {
    return;
  }
  const res = await QuestionControllerService.getQuestionByIdUsingGet(
    id as any
  );
  if (res.code === 0) {
    form.value = res.data as any;
    // json 转 js 对象
    if (!form.value.judgeCase) {
      form.value.judgeCase = [
        {
          input: "",
          output: "",
        },
      ];
    } else {
      form.value.judgeCase = JSON.parse(form.value.judgeCase as any);
    }
    if (!form.value.judgeConfig) {
      form.value.judgeConfig = {
        memoryLimit: 1000,
        stackLimit: 1000,
        timeLimit: 1000,
      };
    } else {
      form.value.judgeConfig = JSON.parse(form.value.judgeConfig as any);
    }
    if (!form.value.tags) {
      form.value.tags = [];
    } else {
      form.value.tags = JSON.parse(form.value.tags as any);
    }
    console.log("form", form);
  } else {
    message.error("加载失败，" + res.message);
  }
};
onMounted(() => {
  loadData();
});

const handleSubmit = async (data: any) => {
  console.log(form.value);
  if (updatePage) {
    const res = await QuestionControllerService.updateQuestionUsingPost(
      form.value
    );
    if (res.code === 0) {
      message.success("更新成功");
    } else {
      message.error("更新失败，" + res.message);
    }
  } else {
    const res = await QuestionControllerService.addQuestionUsingPost(
      form.value
    );
    if (res.code === 0) {
      message.success("创建成功");
    } else {
      message.error("创建失败", res.message);
    }
  }
};

/**
 * 新增测试用例
 */
const handleAdd = () => {
  form.value.judgeCase.push({
    input: "",
    output: "",
  });
};
/**
 * 生删除测试用例
 * @param index
 */
const handleDelete = (index: number) => {
  form.value.judgeCase.splice(index, 1);
};

const onContentChange = (v: string) => {
  form.value.content = v;
};

const onAnswerChange = (v: string) => {
  form.value.answer = v;
};
</script>
<style scoped>
#addQuestionView {
}
</style>
