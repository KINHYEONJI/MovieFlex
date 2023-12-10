<template>
  <div class="zip-body">
    <div v-if="!userStore.isLogin" class="not-login">
      <div class="not-login-body">
        <p>게시글 작성을 위해선<br>로그인이 필요합니다.</p>
        <button class="login-btn" @click="redirectToLogin">로그인</button>
      </div>
      <video src="@/assets/video3.mp4" muted autoplay loop playbackRate="1.5"></video>
    </div>
    <div v-else class="moviezip-body">
      <div style="display: flex; justify-content: space-between; align-items: center;">
        <h style="font-size: 30px;">영화 모음집 만들기</h>
        <button @click="submitMovieZip" class="mb-2 mini-btn">생성하기</button>
      </div>
      <hr style="border:3px solid white;"/>
      
      <div class="input-body">
        <input
          type="text"
          class="form1"
          v-model="movieZip.title"
          required
        />
        <label>모음집 이름</label>
        <span></span>
      </div>

      <div class="input-body">
        <textarea
          type="text"
          class="form1"
          v-model="movieZip.content"
          placeholder="영화 모음집에 대한 부가 설명을 작성해주세요"
          rows="3"
          required
        ></textarea>
        <label class="label-content">본문</label>
        <span style="bottom: 16px;"></span>
      </div>
      <hr style="border:2px solid white;"/>
      <MoviesFind></MoviesFind>
      <hr style="border:2px solid white;"/>
      <h style="font-size: 23px; padding: 10px 10px;">선택한 영화</h>
      <div class="select-movies">
        <div v-for="movie in selectedMovielist" :key="movie.id">
          <MovieCardsSelect :movie="movie"></MovieCardsSelect>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import { useUserStore } from "@/stores/userStore";
import { useMovieZipStore } from "@/stores/movieZipStore";
import MoviesFind from "@/components/movie/MoviesFind.vue";
import MovieCardsSelect from "@/components/movie/MovieCardsSelect.vue";
import Swal from "sweetalert2";

const router = useRouter();

const userStore = useUserStore();
const movieZipStore = useMovieZipStore();

const selectedMovielist = movieZipStore.selectedMovielist;

const movieZip = ref({
  title: "",
  content: "",
  movies: [],
  poster_path: "",
});

const redirectToLogin = () => {
  router.push({ name: "login" });
};

const alertMessage = (msg) => {
  Swal.fire({
    title: msg,
    icon: "error",
    confirmButtonColor: "#682cd48c",
    confirmButtonText: "확인",
  });
};

const submitMovieZip = () => {
  const pkList = selectedMovielist.map((movie) => movie.pk);
  movieZip.value.movies = pkList;

  if (!movieZip.value.title) {
    alertMessage("모음집 이름을 입력해주세요.");
    return;
  }
  if (!movieZip.value.content) {
    alertMessage("모음집에 대한 내용을 입력해주세요.");
    return;
  }
  if (movieZip.value.movies.length <= 0) {
    alertMessage("영화는 최소 하나 이상 선택되어야 합니다.");
    return;
  }

  Swal.fire({
    title: "영화 모음집을 생성하시겠습니까?",
    icon: "success",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "확인",
    cancelButtonText: "취소",
  }).then((result) => {
    if (result.isConfirmed) {
      movieZip.value.poster_path = selectedMovielist[0].poster_path;
      movieZipStore
        .addMovieZip(movieZip.value)
        .then(() => {
          movieZip.value = {
            title: "",
            content: "",
            movies: [],
            poster_path: "",
          };
        })
        .catch((error) => {
          console.error(error);
        });
    }
  });
};
</script>

<style scoped>

video{
  width: 100%;
  height: 100vh;
  object-fit: cover;
  opacity: 0.7;
  z-index: 0;
}
.not-login{
  position: fixed;
  overflow: hidden;
  width: 100%;
  height: 100%;
  background-color: lightgrey;
}

.not-login-body{
  position: absolute;
  top: 40%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 1;
  width: 400px;
  height: 200px;
  padding: 20px;
  border: 1px solid #313131;
  border-radius: 5px;
  background-color: #414141;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.3);
  color: white;
  font-size: larger;
  display: flex;
  text-align: center;
  justify-content: center;
  flex-direction: column;
  letter-spacing: 3px;
}
.select-movies {
  display: flex;
  flex-wrap: wrap;
}

.moviezip-body{
  color: white;
  margin: 30px;
}

span {
  display: block;
  position: absolute;
  bottom: 9px;
  left: 10px;  /* right로만 바꿔주면 오 - 왼 */
  background-color: red;
  width: 0;
  height: 2px;
  transition: 1s;
  z-index: 10;
}

label {
  position: absolute;
  color: white;
  left: 10px;
  font-size: 22px;
  bottom: 20px;
  transition: all .2s;
}

.label-content{
  position: absolute;
  color: white;
  left: 10px;
  font-size: 22px;
  top: 15px;
  /* transition: all .20s; */
}

input:focus ~ label, input:valid ~ label {
  font-size: 17px;
  top: -5px;
  color: rgb(200, 200, 200);
}

input:focus ~ span, input:valid ~ span {
  width: calc(100% - 20px);
}

.form1::placeholder {
    font-size: 17px;
}

textarea:focus ~ label, textarea:valid ~ label {
  font-size: 17px;
  top: -5px;
  color: rgb(200, 200, 200);
}

textarea:focus ~ span, textarea:valid ~ span {
  width: calc(100% - 20px);
}
</style>
