import axios from "axios";

const API_URL = "http://127.0.0.1:8000";

export const getCommentList = (articlePk) => {
  return axios
    .get(`${API_URL}/movies/articles/${articlePk}/comments/`)
    .then((response) => {
      return response;
    })
    .catch((error) => {
      console.error("API 요청 중 에러가 발생했습니다:", error);
      throw error;
    });
};

export const createNewCommentApi = (articlePk, payload) => {
  const token = window.localStorage.getItem("token");
  return axios
    .post(`${API_URL}/movies/articles/${articlePk}/comments/`, payload, {
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

export const deleteCommentApi = (articlePk, commentPk) => {
  const token = window.localStorage.getItem("token");
  return axios
    .delete(`${API_URL}/movies/articles/${articlePk}/comments/${commentPk}`, {
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

export const updateCommentApi = (articlePk, commentPk, payload) => {
  const token = window.localStorage.getItem("token");
  console.log(payload);
  return axios
    .put(
      `${API_URL}/movies/articles/${articlePk}/comments/${commentPk}`,
      payload,
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

export const likeCommemntApi = (moviePk, articlePk) => {
  const token = window.localStorage.getItem("token");
  return axios
    .post(
      `${API_URL}/movies/${moviePk}/articles/${articlePk}/comments/like/`,
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
