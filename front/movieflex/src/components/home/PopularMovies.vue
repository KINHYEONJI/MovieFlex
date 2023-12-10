
<template>
  <div class="scene">
    <img src="@/assets/bestmovie.png" class="bestmovie" alt="bestmovie">
    <ul class="gall" ref="gall">
      <li class="gall-item" v-for="(movie, index) in movies" :key="index">
        <img class="item-image" :src="getImageUrl(movie.poster_path)" alt="Movie poster" />
      </li>
    </ul>
    <div class="btns">
      <button id="prevButton" @click="rotate('prev')">
        <svg xmlns="http://www.w3.org/2000/svg" width="35" height="35" fill="currentColor" class="bi bi-chevron-double-left" viewBox="0 0 16 16">
          <path fill-rule="evenodd" d="M8.354 1.646a.5.5 0 0 1 0 .708L2.707 8l5.647 5.646a.5.5 0 0 1-.708.708l-6-6a.5.5 0 0 1 0-.708l6-6a.5.5 0 0 1 .708 0z"/>
          <path fill-rule="evenodd" d="M12.354 1.646a.5.5 0 0 1 0 .708L6.707 8l5.647 5.646a.5.5 0 0 1-.708.708l-6-6a.5.5 0 0 1 0-.708l6-6a.5.5 0 0 1 .708 0z"/>
        </svg>
      </button>
      <button id="nextButton" @click="rotate('next')">
        <svg xmlns="http://www.w3.org/2000/svg" width="35" height="35" fill="currentColor" class="bi bi-chevron-double-right" viewBox="0 0 16 16">
          <path fill-rule="evenodd" d="M3.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L9.293 8 3.646 2.354a.5.5 0 0 1 0-.708z"/>
          <path fill-rule="evenodd" d="M7.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L13.293 8 7.646 2.354a.5.5 0 0 1 0-.708z"/>
        </svg>
      </button>
    </div>
  </div>
</template>

<script>
import { ref, onMounted, nextTick   } from 'vue';
import { fetchPopularMovies } from "@/apis/movieApi";

export default {
  setup() {
      const movies = ref([]);
      const gall = ref(null);
      let gallDeg = 0;
      let deg;

      const style_item = () => {
          nextTick(() => {
              const itemWidth = gall.value.children[0].offsetWidth;
              const getZ = get_z({deg, itemWidth});
              Array.from(gall.value.children).forEach((item, idx) => {
                  item.style.transform = `rotateY(${idx * deg}deg) translateZ(${getZ}px)`;
              });
          });
      };

      const get_z = (INFO = {}) => {
          const {deg,itemWidth} = INFO;
          const widthHalf = (itemWidth / 2);
          const radient = (Math.PI / 180 ) * (deg / 2.5);
          const r =  widthHalf / Math.tan(radient);
          const gap = Math.min(window.innerWidth, window.innerHeight) / 10;
          return parseInt(r) + gap;
      };

      const rotate = (direction) => {
          const finalDeg = direction === "prev" ?  deg : -1 * deg;
          gallDeg += finalDeg;

          gall.value.style.transition = 'transform 1.2s ease-in-out';
          gall.value.style.transform = `rotateY(${gallDeg}deg)`;
      };

      const fetchMovie = async () => {  
      try {
        const response = await fetchPopularMovies(); 
        movies.value = response.data.results.slice(0, 10);
        deg = 360 / movies.value.length;
      } catch (error) {
        console.error(error);
      }
    };
    
    window.addEventListener('keydown', function(event) {
    switch (event.key) {
        case "ArrowLeft":
            rotate('prev');
            // 버튼 효과를 적용하려면 다음 행의 주석을 해제하세요.
            // document.getElementById("prevButton").classList.add("active");
            break;
        case "ArrowRight":
            rotate('next');
            // 버튼 효과를 적용하려면 다음 행의 주석을 해제하세요.
            // document.getElementById("nextButton").classList.add("active");
            break;
        }
    });
    

    onMounted(async () => { 
        await fetchMovie(); 
        style_item();
    });

    window.addEventListener('resize', style_item);

    const getImageUrl = (path) => {
      return path ? `https://image.tmdb.org/t/p/w500${path}` : "";
    };

    return { movies, gall, rotate, getImageUrl };
  }
};
</script>

<style scoped>
*{margin:0;padding:0;box-sizing:border-box;}
li{list-style-type:none;}

.scene{
  display:flex; 
  justify-content:center;align-items:center;
  position:fixed;
  width: 100%;
  height: 100vh;
  perspective:100vmax;
  background:#313131;
  overflow: hidden;
}

.bestmovie{
  position: absolute;
  width: 30vh;
  height: auto;
  top: 10px;
}

.gall{
  outline:1px solid transparent;
  position:absolute;
  background:transparent; /* transparent;*/
  height: 40%; 
  aspect-ratio:2/3;
  max-width: 50vw;
  /* top: 4vh; */
  transform-style:preserve-3d;
  
}

.gall-item{
  overflow: hidden;
  display:flex;
  justify-content:center; align-items:center;
  position:absolute;
  /* width:100%; height:100%; */
  border:2px solid black;
  font-size:5vmin;
  backdrop-filter:blur(5px);
  user-select:none;
  -webkit-box-reflect:below 0px linear-gradient(transparent,#0004);
}


.btns{
  display: flex;
  justify-content: space-between !important;
  position: absolute;
  margin: 0 auto;
  width: 100%;
  background-color: transparent;
} 

button{
  color: white;
  font-family:inherit;
  padding:1em 1em;
  margin: 0 10px;
  background-color: transparent;
  border-radius: 10px;
  border: 1px solid transparent;
}

button:hover{
  background-color: transparent;
  border: 1px solid #f00;
  border-radius: 10px;
}

button:active{
  color: red;
}

.item-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
}
</style>
