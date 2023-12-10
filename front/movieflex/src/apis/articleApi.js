import axios from "axios";

const API_URL = "http://127.0.0.1:8000";

export const fetchArticleList = () => {
  return axios
    .get(`${API_URL}/movies/articles/`)
    .then((response) => {
      return response;
    })
    .catch((error) => {
      console.error("API 요청 중 에러가 발생했습니다:", error);
      throw error;
    });
};

export const getArticle = (articlePk) => {
  console.log(articlePk);
  return axios
    .get(`${API_URL}/movies/articles/${articlePk}/`)
    .then((response) => {
      return response;
    })
    .catch((error) => {
      console.error("API 요청 중 에러가 발생했습니다:", error);
      throw error;
    });
};

export const likeArticleApi = (articlePk) => {
  const token = window.localStorage.getItem("token");
  return axios
    .post(
      `${API_URL}/movies/articles/${articlePk}/`,
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

export const deleteArticleApi = (articlePk) => {
  const token = window.localStorage.getItem("token");
  return axios
    .delete(`${API_URL}/movies/articles/${articlePk}/`, {
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

export const createArticle = (payload) => {
  const token = window.localStorage.getItem("token");
  return axios
    .post(`${API_URL}/movies/articles/`, payload, {
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
