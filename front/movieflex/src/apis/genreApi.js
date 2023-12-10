import axios from "axios";

const API_URL = "http://127.0.0.1:8000";

export const fetchGenreList = () => {
  return axios
    .get(`${API_URL}/movies/recommend/genres/`)
    .then((response) => {
      return response;
    })
    .catch((error) => {
      console.error("API 요청 중 에러가 발생했습니다:", error);
      throw error;
    });
};

export const fetchRecommendedMovieList = (payload) => {
  const token = window.localStorage.getItem("token");
  const formattedPayload = payload.map((genre) => {
    return genre.pk;
  });
  const queryParams = new URLSearchParams({
    genre: formattedPayload.join(","),
  }).toString();

  return axios
    .get(`${API_URL}/movies/recommend/?${queryParams}`, {
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
