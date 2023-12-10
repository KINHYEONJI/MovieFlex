import { ref } from "vue";
import { defineStore } from "pinia";
import {
  getCommentList,
  createNewCommentApi,
  deleteCommentApi,
  updateCommentApi,
  likeCommemntApi,
} from "@/apis/commentApi";

export const useCommentStore = defineStore("comment", () => {
  const commentList = ref([]);

  const initializeCommentList = (articlePk) => {
    getCommentList(articlePk)
      .then((response) => {
        if (response) {
          commentList.value = response.data;
        }
      })
      .catch((error) => {
        console.error("Error initializing articles:", error);
      });
  };

  const createNewComment = (articlePk, payload) => {
    return createNewCommentApi(articlePk, payload)
      .then((response) => {
        if (response.status === 201) {
          commentList.value = response.data;
        }
      })
      .catch((error) => {
        console.error("Error creating a new comment:", error);
      });
  };

  const deleteComment = (articlePk, commentPk) => {
    return deleteCommentApi(articlePk, commentPk)
      .then((response) => {
        if (response.status === 200) {
          commentList.value = response.data;
        }
      })
      .catch((error) => {
        console.error("Error deleting an old comment:", error);
      });
  };

  const updateComment = (articlePk, commentPk, newComment) => {
    console.log(newComment);
    return updateCommentApi(articlePk, commentPk, newComment)
      .then((response) => {
        if (response.status === 200) {
          commentList.value = response.data;
        }
      })
      .catch((error) => {
        console.error("Error deleting an old comment:", error);
      });
  };

  return {
    commentList,
    initializeCommentList,
    createNewComment,
    deleteComment,
    updateComment,
  };
});
