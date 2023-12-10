import { ref } from "vue";
import { defineStore } from "pinia";
import { useRouter } from "vue-router";
import {
  createMovieZip,
  deleteMovieZip,
  fetchMovieZipList,
} from "@/apis/movieApi";

export const useMovieZipStore = defineStore("movieZip", () => {
  const router = useRouter();
  const movieZipList = ref([]);
  const selectedMovielist = ref([]);

  const initializeMovieZipList = () => {
    fetchMovieZipList()
      .then((response) => {
        movieZipList.value = response.data;
      })
      .catch((err) => {
        alert(err);
      });
  };

  const addSelectedMovieList = (movie) => {
    const isDuplicate = selectedMovielist.value.some((selectedMovie) => {
      return selectedMovie.pk === movie.pk;
    });
    if (!isDuplicate) {
      selectedMovielist.value.push(movie);
    }
  };

  const deleteSelectedMovieList = (movie) => {
    const index = selectedMovielist.value.findIndex((selectedMovie) => {
      return selectedMovie.pk === movie.pk;
    });

    if (index !== -1) {
      selectedMovielist.value.splice(index, 1);
    }
  };

  const clearSelectedMovieList = () => {
    selectedMovielist.value = [];
  };

  const addMovieZip = (newMovieZip) => {
    return createMovieZip(newMovieZip)
      .then((response) => {
        if (response.status === 201) {
          clearSelectedMovieList();
          router.push({
            name: "MovieZipDetail",
            params: { movieZipPk: response.data.pk },
          });
        }
      })
      .catch((error) => {
        console.error(error);
        throw error;
      });
  };

  const deleteZip = (movieZipPk) => {
    return deleteMovieZip(movieZipPk)
      .then((response) => {
        if (response.status === 200) {
          const index = movieZipList.value.findIndex(
            (movieZip) => movieZip.pk === movieZipPk
          );
          if (index !== -1) {
            movieZipList.value.splice(index, 1);
          }
          router.push({ name: "MovieZips" });
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
    movieZipList,
    selectedMovielist,
    addSelectedMovieList,
    deleteSelectedMovieList,
    addMovieZip,
    clearSelectedMovieList,
    initializeMovieZipList,
    deleteZip,
  };
});
