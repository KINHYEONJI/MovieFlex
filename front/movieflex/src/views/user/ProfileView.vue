<template>
  <div>
    <button @click="redirectToLogout">로그아웃</button>
    <h1>내가 만든 영화 모음집</h1>
    <h1>내가 작성한 영화 리뷰 게시글</h1>
    <UserArticle></UserArticle>
    <h1>내가 좋아요를 누른영화 모음집</h1>
    <h1>좋아요 누른 영화 리뷰 게시글</h1>

  </div>
</template>
    
<script setup>
import { useRoute, useRouter } from "vue-router";
import { useUserStore } from "@/stores/userStore";
import UserArticle from "@/components/user/UserArticle";

const router = useRouter();

const userStore = useUserStore();

const redirectToLogout = () => {
  router.push({ name: "logout" });
};
</script>

<style scoped></style>;
