<template>
  <ktj-container>
    <ktj-title name="考试系统" border="none"></ktj-title>
    <question-list/>
  </ktj-container>
</template>
<script>
import QuestionList from "./QuestionList";
export default {
  name: "QuestionTkList",
  data() {
    return {};
  },
  components: {
    QuestionList
  }
};
</script>


