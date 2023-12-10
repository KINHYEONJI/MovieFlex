import { ref } from "vue";
import { defineStore } from "pinia";
import { useRouter } from "vue-router";
import {
  createArticle,
  fetchArticleList,
  deleteArticleApi,
} from "@/apis/articleApi";
import Swal from "sweetalert2";

export const useArticleStore = defineStore("article", () => {
  const router = useRouter();
  const articleList = ref([]);
  const selectedMovie = ref([]);

  const initializeArticleList = () => {
    fetchArticleList()
      .then((response) => {
        articleList.value = response.data;
      })
      .catch((err) => {
        alert(err);
      });
  };

  const addSelectedMovie = (movie) => {
    console.log(selectedMovie.value.length);
    if (selectedMovie.value.length === 0) {
      selectedMovie.value[0] = movie;
      console.log(selectedMovie.value);
      return;
    }

    if (movie.pk === selectedMovie.value[0].pk) return;

    if (selectedMovie.value.length > 0) {
      Swal.fire({
        title: "영화는 하나만 선택해야합니다.",
        icon: "error",
        confirmButtonColor: "#3085d6",
        confirmButtonText: "확인",
      });
      return;
    }

    selectedMovie.value[0] = movie;
  };

  const deleteSelectedMovie = (movie) => {
    selectedMovie.value = [];
  };

  const clearSelectedMovie = () => {
    selectedMovie.value = [];
  };

  const addArticle = (newArticle) => {
    return createArticle(newArticle)
      .then((response) => {
        if (response.status === 201) {
          router.push({
            name: "ArticleDetail",
            params: { articlePk: response.data.id },
          });
          clearSelectedMovie();
        }
      })
      .catch((error) => {
        console.error(error);
        throw error;
      });
  };

  const deleteArticle = (articleId) => {
    return deleteArticleApi(articleId)
      .then((response) => {
        if (response.status === 200) {
          const index = articleList.value.findIndex(
            (article) => article.id === articleId
          );
          if (index !== -1) {
            articleList.value.splice(index, 1);
          }
          router.push({ name: "Articles" });
        } else {
          window.alert("서버 오류");
        }
      })
      .catch((error) => {
        console.error(error);
        throw error;
      });
  };

  return {
    articleList,
    selectedMovie,
    initializeArticleList,
    addSelectedMovie,
    deleteSelectedMovie,
    addArticle,
    clearSelectedMovie,
    deleteArticle,
  };
});
