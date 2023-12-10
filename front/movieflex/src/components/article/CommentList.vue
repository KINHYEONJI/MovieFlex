<template>
  <ul>
    <li v-for="comment in commentStore.commentList" :key="comment.id">
      <Comment :article="article" :comment="comment"></Comment>
    </li>
  </ul>
</template>
  
 <script setup>
import { onMounted } from "vue";
import { useRoute } from "vue-router";
import { useCommentStore } from "@/stores/commentStore";
import Comment from "@/components/article/Comment.vue";

const route = useRoute();
const commentStore = useCommentStore();

const props = defineProps(["article"]);
onMounted(() => {
  commentStore.initializeCommentList(route.params.articlePk);
});
</script>
  
  <style scoped>
</style>