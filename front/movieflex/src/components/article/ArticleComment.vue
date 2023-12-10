<template>
  <div class="box">
  
    <CommentList :article="article"></CommentList>
    <CommentCreate :article="article"></CommentCreate>
  </div>  
</template>

<script setup>
import CommentCreate from "@/components/article/CommentCreate.vue";
import CommentList from "@/components/article/CommentList.vue";

const props = defineProps(["article"]);
</script>

<style scoped>
.box{
  margin: 30px;
  color: white;
  font-size: large;
}

</style>

