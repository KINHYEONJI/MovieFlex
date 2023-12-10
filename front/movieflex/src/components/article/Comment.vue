<template>
  <div class="comment-container">
    <div class="comment-id" style="padding: 10px;">{{ comment.user.nickname }} </div>
    <div style="padding: 10px;"> - </div>
    <div class="comment-content-container" >
      <div v-if="!editMode" class="comment-content">
        {{ comment.content }} 
      </div>
      <div v-if="isOwner" class="button-container">
        <div style="padding: 0 10px;">
          <button v-if="!editMode" @click="startEdit" class="netflix-button">수정</button>
          <button v-if="!editMode" @click="commentDelete(article.id, comment.pk)" class="netflix-button delete-button">삭제</button>
        </div>
      </div>
    </div>
    <div>
      <div v-if="editMode" class="edit-container">
        <input v-model="editedComment" class="edit-comment" />
        <button @click="commentUpdate(article.id, comment.pk)" class="netflix-button save-button">저장</button>
        <button @click="cancelEdit" class="netflix-button cancel-button">취소</button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from "vue";
import { useCommentStore } from "@/stores/commentStore";
import { useUserStore } from "@/stores/userStore";

const commentStore = useCommentStore();
const userStore = useUserStore();

const props = defineProps({ article: Object, comment: Object });

const editMode = ref(false);
const editedComment = ref(props.comment.content);

const startEdit = () => {
  editMode.value = true;
  editedComment.value = props.comment.content;
};

const cancelEdit = () => {
  editMode.value = false;
  editedComment.value = "";
};

const commentDelete = (articlePk, commentPk) => {
  commentStore.deleteComment(articlePk, commentPk);
};

const commentUpdate = (articlePk, commentPk) => {
  const newComment = {
    content: editedComment.value,
  };
  console.log(newComment);
  commentStore
    .updateComment(articlePk, commentPk, newComment)
    .then(() => {
      commentStore.initializeCommentList(articlePk);
      cancelEdit();
    })
    .catch((error) => {
      console.error(error);
    });
};

const isOwner = computed(() => {
  return (
    props.comment.user.pk &&
    userStore.userData &&
    props.comment.user.pk === userStore.userData.pk
  );
});

const likeComment = () => {};
</script>

<style scoped>
.comment-container {
  display: flex;

}

.comment-content-container{
  display: flex;
}

.comment-content-container {
  display: flex;
  flex-grow: 1;
  align-items: center;
}

.button-container {
  display: flex;
  align-items: center;
}
.netflix-button {
  background-color:#0075f2;
  color: #fff;
  border: none;
  padding: 8px 16px;
  margin-right: 8px;
  cursor: pointer;
  border-radius: 4px;
  font-weight: bold;
  transition: background-color 0.3s ease;
}

.netflix-button:hover {
  background-color: #b2070d;
}

.delete-button {
  background-color: #f00;
}

.save-button {
  background-color: #0075f2;
}

.cancel-button {
  background-color: #333;
}

.edit-container {
  display: flex;
  align-items: center;
}
</style>
