import { ref, watch } from "vue";
import { defineStore } from "pinia";
import { useRouter } from "vue-router";
import { fetchGenreList, fetchRecommendedMovieList } from "@/apis/genreApi";

export const useGenreStore = defineStore("genre", () => {
  const router = useRouter();
  const genreList = ref([]);
  const selectedGenres = ref([]);
  const recommendedMovieList = ref([]);

  const getGenreList = () => {
    fetchGenreList()
      .then((response) => {
        genreList.value = response.data;
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const clearGenreList = () => {
    selectedGenres.value = [];
  };

  const getRecommendedMovieList = () => {
    console.log(selectedGenres.value);
    return fetchRecommendedMovieList(selectedGenres.value)
      .then((response) => {
        recommendedMovieList.value = response.data;
        console.log(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const toggleGenre = (genre) => {
    const index = selectedGenres.value.indexOf(genre);

    if (index !== -1) {
      selectedGenres.value.splice(index, 1);
    } else {
      selectedGenres.value.push(genre);
    }
  };

  watch(selectedGenres.value, () => {
    getRecommendedMovieList();
  });

  return {
    genreList,
    selectedGenres,
    recommendedMovieList,
    getGenreList,
    toggleGenre,
    getRecommendedMovieList,
    clearGenreList,
  };
});
