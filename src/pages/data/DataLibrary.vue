<template>
  <ktj-container>
    <ktj-title name="资料库"></ktj-title>
    <select-data class="ktj-mt20" action="list"/>
  </ktj-container>
</template>
<script>
import SelectData from "./SelectData";
export default {
  name: "DataLibrary",
  components: {
    SelectData
  }
};
</script>
<style scoped>
</style>

