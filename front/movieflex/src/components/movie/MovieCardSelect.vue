<template>
  <div v-if="selectedMovieComputed.length > 0">
    <div
      class="movie-card"
      @mouseover="toggleHover(true)"
      @mouseleave="toggleHover(false)"
    >
      <div v-if="selectedMovieComputed[0].poster_path">
        <img
          :src="getImageUrl(selectedMovieComputed[0].poster_path)"
          class="card-img"
          alt="해당 이미지 없음"
        />
      </div>
      <div v-else class="no-poster">
        <span>{{ selectedMovieComputed[0].title }}</span>
      </div>
      <button
        v-if="showButton"
        class="add-button"
        @click="deleteToSelectedMovie(selectedMovieComputed[0])"
      >
        <span class="add-btn-text">-</span>
      </button>
    </div>
  </div>
</template>
    
<script setup>
import { ref, computed } from "vue";
import { useArticleStore } from "@/stores/articleStore";

const articleStore = useArticleStore();

const selectedMovieComputed = computed(() => {
  return articleStore.selectedMovie;
});

const getImageUrl = (path) => {
  return path ? `https://image.tmdb.org/t/p/w500${path}` : "";
};

const showButton = ref(false);

const toggleHover = (isHovered) => {
  showButton.value = isHovered;
};

const deleteToSelectedMovie = (movie) => {
  articleStore.deleteSelectedMovie(movie);
};
</script>
    
    <style scoped>
.movie-card {
  position: relative;
  width: 10rem;
  height: 14rem;
  border-radius: 8px;
  overflow: hidden;
  margin: 0.5rem;
  transition: opacity 0.3s ease-in-out;
}

.card-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.no-poster {
  width: 100%;
  height: 100%;
  background-color: darkgray;
  display: flex;
  text-align: center;
  align-items: center;
}

.add-button {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  font-size: 1.5rem;
  width: 3rem;
  height: 3rem;
  border: none;
  border-radius: 50%;
  background-color: rgba(255, 255, 255, 0.7);
  display: none;
  cursor: pointer;
}

.movie-card:hover .add-button {
  display: block;
}

.movie-card:hover {
  opacity: 0.7;
}
.add-btn-text {
  padding: 0;
  margin: 0;
}
</style>
    