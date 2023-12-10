<template>
  <div
    class="movie-card"
    :class="{ flipped: showBackSide }"
    @mouseenter="showBackSide = true"
    @mouseleave="showBackSide = false"
    style="padding: 10px;"
  >
    <div class="card-inner">
      <div class="card-front">
        <div class="img-wrapper">
          <img
            v-if="movie && movie.poster_path"
            :src="getImageUrl(movie.poster_path)"
            class="card-img"
            alt="No Image Available"
          />
        </div>
      </div>
      <div class="card-back">
        <div class="card-back-top">
          <img
            :src="getImageUrl(backdropPath)"
            class="card-img"
            alt="No Image Available"
          />
        </div>
        <h2>{{ movie.title }}</h2>
        <p>평점: {{ movie.vote_average }}</p>
        <p>개봉일: {{ releaseDate }}</p>
        <p>{{ tagline }}</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { fetchBackDropPath } from "@/apis/movieApi";

const props = defineProps(["movie"]);

const getImageUrl = (path) => {
  return path ? `https://image.tmdb.org/t/p/w500${path}` : "";
};
const backdropPath = ref("");
const tagline = ref("");
const releaseDate = ref("");

const getBackDropPath = () => {
  fetchBackDropPath(props.movie.pk)
    .then((result) => {
      backdropPath.value = result.backdrop_path;
      tagline.value = result.tagline;
      releaseDate.value = result.release_date;
    })
    .catch((error) => {
      console.error("Error fetching backdrop path:", error);
    });
};
onMounted(() => {
  getBackDropPath();
});

let showBackSide = ref(false);
</script>

<style scoped>
/* 카드 스타일 */
.movie-card {
  width: 18rem;
  height: 26rem;
  perspective: 1000px;
}

.card-inner {
  width: 100%;
  height: 100%;
  transition: transform 0.6s ease; /* 애니메이션 효과를 전체 요소에 적용 */
  transform-style: preserve-3d;
}

.movie-card .card-front,
.movie-card .card-back {
  width: 100%;
  height: 100%;
  position: absolute;
  backface-visibility: hidden;
  border-radius: 8px;
  overflow: hidden;
}

/* 앞면 스타일 */
.movie-card .card-front {
  transform: rotateY(0deg);
}

/* 이미지 스타일 */
.img-wrapper {
  width: 100%;
  height: 100%;
  border-radius: 8px;
  overflow: hidden;
}

.card-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

/* 뒷면 스타일 */
.movie-card .card-back {
  transform: rotateY(180deg);
  background-color: rgba(0, 0, 0, 0.7);
  color: white;
  padding: 1rem;
  transform: rotateY(180deg);
}

/* 호버 시 회전 */
.movie-card:hover .card-inner {
  transform: rotateY(180deg);
}
</style>
