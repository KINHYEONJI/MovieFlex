<template>
  <div class="mb-3">
    <label for="searchMovie" style="font-size: 23px; padding: 10px 10px;">영화 검색</label>
    <div class="input-body" style="display: flex; justify-content: space-between;">
      <input
        type="text"
        class="form1"
        id="searchMovie"
        v-model="searchText"
        placeholder="영화 제목"
        style="width: calc(100% - 130px);"
        required
      />
      <button class="mini-btn" @click="searchMovies">찾기</button>
      <span style="bottom: 10px;"></span>
    </div>
  </div>
  <div v-if="isSearch">
    <div v-if="searchResults.length > 0">
      <h3>"{{ searchText }}"에 대한 검색 결과</h3>

      <div class="search-result">
        <div v-for="movie in searchResults" :key="movie.id">
          <MovieCardFind :movie="movie"></MovieCardFind>
        </div>
      </div>
    </div>
    <div v-else>
      <h style="font-size: 19px;">"{{ searchText }}"에 대한 검색 결과가 없습니다.</h>
    </div>
  </div>
</template>
  
  <script setup>
import { ref } from "vue";
import { getFindMovies } from "@/apis/movieApi";
import MovieCardFind from "@/components/movie/MovieCardFind.vue";
import Swal from "sweetalert2";

const searchText = ref("");
const searchResults = ref([]);
const isSearch = ref(false);

const alertMessage = (msg) => {
  Swal.fire({
    title: msg,
    icon: "error",
    confirmButtonColor: "#682cd48c",
    confirmButtonText: "확인",
  });
};

const searchMovies = async () => {
  if (!searchText.value) {
    alertMessage("검색어를 입력하세요.");
    return;
  }
  try {
    const movies = await getFindMovies(searchText.value);
    searchResults.value = movies.slice(0, 20);
    isSearch.value = true;
  } catch (error) {
    console.error(error);
  }
};
</script>
  
  <style scoped>
.search-result {
  display: flex;
  flex-wrap: wrap;
}


label {
  /* position: absolute; */
  color: white;
  /* left: 10px; */
  font-size: 22px;
  /* bottom: 20px; */
  /* transition: all .2s; */
}

.form1::placeholder {
    font-size: 17px;
    bottom: 15px;
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


input:focus ~ span, input:valid ~ span {
  width: calc(100% - 150px);
}
</style>
  