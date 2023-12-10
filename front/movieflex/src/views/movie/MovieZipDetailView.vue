<template>
  <div class="container mt-4" style="color: white; width: 100vw">
    <div style="width: 50vw">
      <h1 style="font-weight: bold">영화 모음집 제목 : {{ movieZip.title }}</h1>
      <h5 v-if="movieZip.user">작성자 : {{ movieZip.user.nickname }}</h5>
      <div style="display: flex">
        <h5 style="padding: 0 10px 0 0">
          추천수 : {{ movieZip.like_user_count }}
        </h5>
        <div
          v-if="userStore.isLogin"
          class="like-button-container"
          style="width: fit-content"
          @click="likeMovieZip(movieZip.pk)"
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

      <h4>{{ movieZip.content }}</h4>
      <div v-if="userStore.isLogin">
        <div v-if="isOwner">
          <button @click="deleteZip" class="mini-btn">삭제</button>
        </div>
      </div>
    </div>
    <div   class="movie-card-container">
    <div
    
      v-for="movie in movies"
      :key="movie.pk"
    >
      <SimpleMovieCard :movie="movie" />
    </div>
  </div>
</div>
</template>

<script setup>
import { ref, computed, onMounted } from "vue";
import { useRoute } from "vue-router";
import { useUserStore } from "@/stores/userStore";
import { getMovieZip, getMovieDetail, likeMovieZipApi } from "@/apis/movieApi";
import { useMovieZipStore } from "@/stores/movieZipStore";
import SimpleMovieCard from "@/components/movie/SimpleMovieCard.vue";
import Swal from "sweetalert2";

const route = useRoute();
const userStore = useUserStore();
const movieZipStore = useMovieZipStore();
const movieZip = ref({});
const movies = ref([]);
const isLiked = ref(null);

const fetchMovieZip = () => {
  getMovieZip(route.params.movieZipPk)
    .then((response) => {
      movieZip.value = response.data;
      const moviePks = JSON.parse(response.data.movies);
      const movieDetailPromises = moviePks.map((moviePk) => {
        return getMovieDetail(moviePk);
      });

      Promise.all(movieDetailPromises)
        .then((moviesData) => {
          movies.value = moviesData;
          isLiked.value = Array.isArray(movieZip.value.like_users)
            ? movieZip.value.like_users.some(
                (user) => user.pk === userStore.userData.pk
              )
            : false;
        })
        .catch((err) => {
          console.error("Error fetching movie details:", err);
        });
    })
    .catch((err) => {
      alert(err);
    });
};

const likeMovieZip = (movieZipPk) => {
  likeMovieZipApi(movieZipPk)
    .then((response) => {
      if (response.status === 200) {
        isLiked.value = !isLiked.value;
        if (isLiked.value) {
          movieZip.value.like_user_count += 1;
        } else {
          movieZip.value.like_user_count -= 1;
        }
      } else {
        alert("서버 오류");
      }
    })
    .catch((error) => {
      console.error(error);
    });
};

const deleteZip = () => {
  Swal.fire({
    title: "영화 모음집을 삭제하시겠습니까?",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "네",
    cancelButtonText: "아니요",
  }).then((result) => {
    if (result.isConfirmed) {
      movieZipStore
        .deleteZip(movieZip.value.pk)
        .then(() => {
          movieZipStore.initializeMovieZipList(movieZip.value.pk);
        })
        .catch((error) => {
          console.error(error);
        });
    }
  });
};

onMounted(() => {
  fetchMovieZip();
});

const isOwner = computed(() => {
  return (
    movieZip.value.user &&
    userStore.userData &&
    movieZip.value.user.pk === userStore.userData.pk
  );
});
</script>

<style scoped>
.movie-card-container {
  display: flex;
  flex-wrap: wrap;
  padding: 20px 0;
}
</style>
