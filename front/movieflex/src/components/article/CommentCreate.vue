<template>
  <div class="comment-input-section d-flex">
    <input
      v-model="newCommentContent"
      placeholder="댓글을 입력하세요."
      class="comment-input form-control me-2"
    />
    <button @click="createComment" class="comment-submit-button btn btn-info">
      <i class="bi bi-send"></i>
    </button>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import { useUserStore } from "@/stores/userStore";
import { useCommentStore } from "@/stores/commentStore";
import Swal from "sweetalert2";

const router = useRouter();
const props = defineProps(["article"]);
const userStore = useUserStore();
const commentStore = useCommentStore();

const newCommentContent = ref("");

const createComment = () => {
  if (!userStore.isLogin) {
    Swal.fire({
      title: "로그인이 필요한 서비스 입니다. \n 로그인 하시겠습니까?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "네",
      cancelButtonText: "아니요",
    }).then((result) => {
      if (result.isConfirmed) {
        router.push({ name: "login" });
      }
    });
  } else {
    commentStore
      .createNewComment(props.article.id, {
        content: newCommentContent.value,
      })
      .then(() => {
        newCommentContent.value = "";
      })
      .catch((error) => {
        console.error(error);
      });
  }
};
</script>

<style scoped>


</style>