<template>
  <div class="movie-card">
    <RouterLink
      :to="{ name: 'MovieZipDetail', params: { movieZipPk: movieZip.id } }"
    >
      <div class="card-overlay">
        {{ movieZip.title }}
      </div>
      <img
        :src="getImageUrl(movieZip.poster_path)"
        class="card-img"
        alt="해당 이미지 없음"
      />
    </RouterLink>
  </div>
</template>

<script setup>
const props = defineProps(["movieZip"]);

const getImageUrl = (path) => {
  return path ? `https://image.tmdb.org/t/p/w500${path}` : "";
};
</script>

<style scoped>
.movie-card {
  position: relative;
  width: 100%;
  height: 100%;
  border-radius: 8px;
  overflow: hidden;
  transition: transform 0.3s;
}

.card-overlay {
  position: absolute;
  height: 100%;
  width: 100%;
  color: white;
  font-size: 24px;
  font-weight: bold;
  padding: 20px;
  width: 100%;
  text-align: center;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.card-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}
</style>
