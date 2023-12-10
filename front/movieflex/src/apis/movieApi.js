import axios from "axios";

const API_URL = "http://127.0.0.1:8000";
const TMDB_URL = {
  base: "https://api.themoviedb.org/3",
  discover: "/discover/movie",
  now_playing: "/movie/now_playing",
  detail_seting: "?language=ko-KR&page=1",
  detail_movie: "/movie/",
};
const TMDB_KEY = import.meta.env.VITE_TMDB_API_KEY;

export const fetchPopularMovies = () => {
  const fetchPopularMoviesUrl =
    TMDB_URL.base + TMDB_URL.discover + TMDB_URL.detail_seting;
  const headers = {
    accept: "application/json",
    Authorization: `Bearer ${TMDB_KEY}`,
  };
  return axios
    .get(fetchPopularMoviesUrl, { headers })
    .then((response) => {
      return response;
    })
    .catch((err) => {
      console.error("Axios Error:", err.message);
      throw err;
    });
};

export const fetchNowPlayingMovies = () => {
  const fetchNowPlayingMoviesUrl = TMDB_URL.base + TMDB_URL.now_playing;
  const headers = {
    accept: "application/json",
    Authorization: `Bearer ${TMDB_KEY}`,
  };
  return axios
    .get(fetchNowPlayingMoviesUrl, { headers })
    .then((response) => {
      return response;
    })
    .catch((err) => {
      console.error("Axios Error:", err.message);
      throw err;
    });
};

export const fetchMovieZipList = () => {
  return axios
    .get(`${API_URL}/movies/movie-zips/`)
    .then((response) => {
      return response;
    })
    .catch((error) => {
      console.error("API 요청 중 에러가 발생했습니다:", error);
      throw error;
    });
};

export const getMovieZip = (movieZipPk) => {
  return axios
    .get(`${API_URL}/movies/movie-zips/${movieZipPk}/`)
    .then((response) => {
      return response;
    })
    .catch((error) => {
      console.error("API 요청 중 에러가 발생했습니다:", error);
      throw error;
    });
};

export const likeMovieZipApi = (movieZipPk) => {
  const token = window.localStorage.getItem("token");

  return axios
    .post(
      `${API_URL}/movies/movie-zips/${movieZipPk}/`,
      {},
      {
        headers: {
          Authorization: `Token ${token}`,
        },
      }
    )
    .then((response) => {
      return response;
    })
    .catch((error) => {
      console.error("API 요청 중 에러가 발생했습니다:", error);
      throw error;
    });
};

export const deleteMovieZip = (movieZipPk) => {
  const token = window.localStorage.getItem("token");
  return axios
    .delete(`${API_URL}/movies/movie-zips/${movieZipPk}/`, {
      headers: {
        Authorization: `Token ${token}`,
      },
    })
    .then((response) => {
      return response;
    })
    .catch((error) => {
      console.error("API 요청 중 에러가 발생했습니다:", error);
      throw error;
    });
};

export const getMovieDetail = (moviePk) => {
  return axios
    .get(`${API_URL}/movies/${moviePk}`)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      console.error("API 요청 중 에러가 발생했습니다:", error);
      throw error;
    });
};

export const fetchBackDropPath = (moviePk) => {
  const fetchDetailMoviesUrl =
    TMDB_URL.base + TMDB_URL.detail_movie + moviePk + TMDB_URL.detail_seting;
  const headers = {
    accept: "application/json",
    Authorization: `Bearer ${TMDB_KEY}`,
  };
  return axios
    .get(fetchDetailMoviesUrl, { headers })
    .then((response) => {
      return response.data;
    })
    .catch((err) => {
      console.error("Axios Error:", err.message); 
      throw err;
    });
};

export const getFindMovies = (searchText) => {
  const token = window.localStorage.getItem("token");
  return axios
    .get(`${API_URL}/movies/create/search?search=${searchText}`, {
      headers: {
        Authorization: `Token ${token}`,
      },
    })
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      console.error("API 요청 중 에러가 발생했습니다:", error);
      throw error;
    });
};

export const createMovieZip = (payload) => {
  const token = window.localStorage.getItem("token");
  return axios
    .post(`${API_URL}/movies/movie-zips/`, payload, {
      headers: {
        Authorization: `Token ${token}`,
      },
    })
    .then((response) => {
      return response;
    })
    .catch((error) => {
      console.error("API 요청 중 에러가 발생했습니다:", error);
      throw error;
    });
};
