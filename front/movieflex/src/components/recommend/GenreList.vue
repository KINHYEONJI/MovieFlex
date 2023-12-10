<template>
  <div class="container">
    <ul
      v-if="genreStore.genreList && genreStore.genreList.length > 0"
      class="genre-list"
    >
      <button
        v-for="genre in genreStore.genreList"
        :key="genre.pk"
        @click="genreStore.toggleGenre(genre)"
        :class="{ selected: isSelected(genre) }"
        class="genre-button"
      >
        {{ genre.name }}
      </button>
    </ul>
    <div class="selected-genres">
      <h4 style="color: white; text-align: center;">선택된 장르</h4>
      <ul class="choice">
        <li
          v-for="genre in genreStore.selectedGenres"
          :key="genre.pk"
          class="selected-genre-item"
        >
          {{ genre.name }}
        </li>
      </ul>
    </div>
  </div>  
  <div class="cards">
    <div v-for="movie in genreStore.recommendedMovieList" :key="movie.pk">
      <SimpleMovieCard :movie="movie"></SimpleMovieCard>
    </div>
  </div>
  
</template>
  
  <script setup>
import { onMounted } from "vue";
import { onBeforeRouteLeave } from "vue-router";
import { useGenreStore } from "@/stores/genreStore";
import SimpleMovieCard from "@/components/movie/SimpleMovieCard.vue";
const genreStore = useGenreStore();

const isSelected = (genre) => {
  return genreStore.selectedGenres.includes(genre);
};

onMounted(() => {
  genreStore.getGenreList();
});

onBeforeRouteLeave(() => {
  genreStore.clearGenreList();
});
</script>
  
  <style scoped>
.container {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  width: 100vw;
}

.genre-list {
  display: flex;
  list-style-type: none;
  padding: 5% 0;
  flex-wrap: wrap;
  gap: 8px;
  width: 80%;
  align-items: center;
  justify-content: space-around;
}
.choice{
  display: flex;
  flex-wrap: wrap;
  width: 100%;
  padding: 0;
}
.genre-button {
  border: none;
  background-color: #f3f3f3;
  padding: 8px 16px;
  border-radius: 20px;
  cursor: pointer;
  width: 120px; 
  text-align: center; 
}

.genre-button:hover {
  border: none;
  background-color: #f00;
  color: white;
  padding: 8px 16px;
  border-radius: 20px;
  cursor: pointer;
}

.genre-button.selected {
  background-color: #f00;
  color: white;
}


.selected-genre-item {
  display: flex;
  justify-content: center;
  list-style-type: none;
  padding: 5px;
  background-color: #f00;
  text-align: center;
  align-items: center;
  color: white;
  border-radius: 20px;
  margin: 5px;
  height: 40px;
  width: 80px;
}

.cards{
  display: flex;
  flex-wrap: wrap;
  gap: 30px;
  margin: 10px;
  justify-content: space-evenly;
}

</style>
  