<template>
  <div id="app">
    <pageHeader></pageHeader>
    <router-view />
  </div>
</template>

<script>
import pageHeader from "@/components/pageHeader/pageHeader.vue";
export default {
  name: "app",
  components: {
    pageHeader
  }
};
</script>
<style lang="scss">
* {
  margin: 0;
  padding: 0;
}
</style>
