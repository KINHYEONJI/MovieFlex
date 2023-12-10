<template>
  <div class="container mt-4">
    <div style="display: flex; justify-content: center;">
      <div class="poster">
        <div v-if="article.movie && Object.keys(article.movie).length > 0">
          <SimpleMovieCard :movie="article.movie"></SimpleMovieCard>
        </div>
      </div>
      <div class="right" style="padding: 10px;">
        <div v-if="userStore.isLogin">
          <div v-if="isOwner">
            <button @click="deleteArticle" class="mini-btn">삭제</button>
          </div>
        </div>
        <h1 style="font-weight: bold">{{ article.title }}</h1>
        <h5 v-if="article.user">작성자 : {{ article.user.nickname }}</h5>
        <div style="display: flex">
          <h5 style="padding: 0 10px 0 0">
            추천수 : {{ article.like_user_count }}
          </h5>
          <div
            v-if="userStore.isLogin"
            class="like-button-container"
            style="width: fit-content"
            @click="likeArticle(article.id)"
          >
            <i
              :class="
                isLiked
                  ? 'bi bi-chat-square-heart-fill'
                  : 'bi bi-chat-square-heart'
              "
              style="font-size: 24px"
            ></i>
          </div>
        </div>
        <h4>내용</h4>
        <h3>{{ article.content }}</h3>
      </div>
    </div>
    <div style="width: 50%; margin:0 auto">
      <ArticleComment v-if="articleLoaded" :article="article"></ArticleComment>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from "vue";
import { useRoute } from "vue-router";
import { useUserStore } from "@/stores/userStore";
import { getArticle, likeArticleApi } from "@/apis/articleApi";
import { getMovieDetail } from "@/apis/movieApi";
import { useArticleStore } from "@/stores/articleStore";
import SimpleMovieCard from "@/components/movie/SimpleMovieCard.vue";
import ArticleComment from "@/components/article/ArticleComment.vue";

import Swal from "sweetalert2";

const route = useRoute();
const userStore = useUserStore();
const articleStore = useArticleStore();
const article = ref({});
const movie = ref({});
const isLiked = ref(null);
const articleLoaded = ref(false);

const fetchArticle = () => {
  getArticle(route.params.articlePk)
    .then((response) => {
      article.value = response.data;
      getMovieDetail(article.value.movie.pk)
        .then((movieData) => {
          movie.value = movieData;
          isLiked.value = Array.isArray(article.value.like_users)
            ? article.value.like_users.some(
                (user) => user.pk === userStore.userData.pk
              )
            : false;
          articleLoaded.value = true;
        })
        .catch((err) => {
          console.error(err);
        });
    })
    .catch((err) => {
      alert(err);
    });
};

const likeArticle = (articlePk) => {
  likeArticleApi(articlePk)
    .then((response) => {
      if (response.status === 200) {
        isLiked.value = !isLiked.value;
        if (isLiked.value) {
          article.value.like_user_count += 1;
        } else {
          article.value.like_user_count -= 1;
        }
      } else {
        alert("서버 오류");
      }
    })
    .catch((error) => {
      console.error(error);
    });
};

const deleteArticle = () => {
  Swal.fire({
    title: "게시글을 삭제하시겠습니까?",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "네",
    cancelButtonText: "아니요",
  }).then((result) => {
    if (result.isConfirmed) {
      articleStore
        .deleteArticle(article.value.id)
        .then(() => {
          articleStore.initializeArticleList(article.value.id);
        })
        .catch((error) => {
          console.error(error);
        });
    }
  });
};

onMounted(() => {
  fetchArticle();
});

const isOwner = computed(() => {
  return (
    article.value.user &&
    userStore.userData &&
    article.value.user.pk === userStore.userData.pk
  );
});
</script>

<style scoped>
.container {
  color: white;
  margin-top: 4rem;
  gap: 2rem; /* 양쪽 벽과 사이에 간격 추가 (필요에 따라 조절) */
  justify-items: center;
}

.poster {
 /* 변경된 부분: vw 대신 %로 변경 */
  display: flex; /* 추가된 부분: flex 속성 추가 */
  align-items: center; /* 추가된 부분: 수직 정렬 중앙으로 설정 */
}

.right {
 /* 변경된 부분: vw 대신 %로 변경 */
}
.like-button-container {
  cursor: pointer;
}

.like-button-container:hover {
  color: #f00;
}
</style>
