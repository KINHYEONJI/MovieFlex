<template>
  <div class="moviezips-body" style="display: flex;">
    <div class="mini-btn" 
    style=";margin-bottom: 20px; text-align: center;"
    >
      <RouterLink :to="{ name: 'MovieZipCreate' }">
        <div class="zip" style="color: white">모음집 생성</div>
      </RouterLink>
    </div>

    <div class="cards">
      <div
        class="card"
        v-for="movieZip in movieZipStore.movieZipList"
        :key="movieZip.id"
      >
        <MovieZipCard :movieZip="movieZip" />
      </div>
    </div>
  </div>
</template>
    
<script setup>
import { onMounted } from "vue";
import MovieZipCard from "@/components/movie/MovieZipCard.vue";
import { useMovieZipStore } from "@/stores/movieZipStore";

const movieZipStore = useMovieZipStore();

onMounted(() => {
  movieZipStore.initializeMovieZipList();
});
</script>
    
<style scoped>
.moviezips-body{
  position: fixed;
  flex-direction: column;
  /* flex-wrap: wrap; */
  align-items: center;
  height: 100%;
  width: 100%;
  background-color: #313131;
  /* justify-content: space-around; */
  gap: 20px;
}

a{
  text-decoration-line: none;
}
.cards{
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  align-items: center;
  width: 100%;
  justify-content: center;
}

.card{
  width: 18rem;
  height: 26rem;
  perspective: 1000px;
  margin: 0 5%;
  border: #313131;
  border-radius: 10%;
}

</style>