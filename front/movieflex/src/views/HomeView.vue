<template>
  <div class="first">
    <div class="netflix-projector">
      <p id="netflix" class="netflix"><span class="highlight">MOVIE</span>FLEX</p>
      <div id="mask" class="mask"></div>
      <img id="projector" class="projector" src="@/assets/projector2.png" />
    </div>
    <div class="chairs">
      <img id="img1" class="el" src="@/assets/row1.png" />
      <img id="img2" class="el" src="@/assets/row2.png" />
      <img id="popcorn" class="popcorn" src="@/assets/popcorn.png" />
      <img id="img3" class="el" src="@/assets/row3.png" />
    </div>
  </div>
</template>

<script setup>
import { onMounted } from 'vue';
import anime from 'animejs';


onMounted(() => {
  const halfScreenWidth = window.innerWidth / 2;
  const img1 = document.getElementById('img1');
  const halfImageWidth = img1 ? img1.offsetWidth / 2 : 0;
  const translateX1 = halfScreenWidth - halfImageWidth;

  

  anime({
    targets: '#img1',
    translateX: [-window.innerWidth, translateX1],
    delay: 0,
    easing: 'spring(0.8, 40, 10, 3)'
  });
  anime({
    targets: '#img2',
    translateX: [window.innerWidth, translateX1],
    delay: 150,
    easing: 'spring(0.5, 40, 12, 3)'
  });
  anime({
    targets: '#img3',
    translateX: [-window.innerWidth, translateX1],
    delay: 150,
    easing: 'spring(0.8, 40, 10, 3)'
  });
  anime({
    targets: '#popcorn',
    translateY: [-(window.innerHeight), 0],
    delay: 150,
    easing: 'spring(0.8, 50, 10, 3)'
  });
  anime({
    targets: '#projector',
    translateY: [-(window.innerHeight), 0],
    delay: 1000,
    easing: 'spring(0.8, 60, 10, 3)'
  });
  
  const netflix = document.getElementById('netflix');
  const translateXNetflix = netflix ? netflix.offsetWidth : 0;

  anime({
    targets: '#netflix',
    translateX: [0, translateXNetflix], // 글자 길이만큼 움직이게 수정
    duration: 1000, // 움직임의 속도를 일정하게 유지
    delay: 2000,
    easing: 'linear' // 일정한 속도
  });
});
</script>


<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Exo+2:wght@900&family=Teko:wght@700&display=swap');

.first {
  position: fixed;
  background-color: #313131;  /* 배경색 */
  height: 100vh;  /* 뷰포트의 높이를 100%로 설정 */
  width: 100vw;  /* 뷰포트의 너비를 100%로 설정 */
}
.chairs {
  overflow: hidden;
  position: relative; 
  height: 100vh;
  width: 100vw;
  align-items: center;
  bottom: 0;
}

.el {
  position: absolute; 
  width: 100vw;
  height: auto; 
}

#img1 {
  bottom: 3%;
}
#img2, #img3 {
  bottom: -5%;
}
.popcorn{
  position: absolute;
  width: 13vw;
  left: 53vw;
  bottom: 4vh;
  height: auto;
}
.netflix-projector{
  position: absolute;
  top: 0;
  width: 35vw;
  height: 60vh;
  display: flex;
  justify-content: right;
  align-items: center;
  background-color: transparent; /*transparent */
}
.projector {
  position: absolute;
  /* top: 50%; */
  /* right: 0; */
  /* transform: translate(0, -50%); */
  height: 35vh;
  /* max-width: 20vw; */
  width: auto;
}

.mask {
  position: absolute;
  /* top: 35%; */
  /* left: 0%; */
  width: 100%;
  height: 30vh;
  background-color: #313131 /* 배경색 #313131*/
}

.netflix {
  position: absolute;
  font-size: 18vh;
  right: 1%;
  top: 26.5%;
  color: black; 
  letter-spacing: -0.3rem;
  /* font-family: 'Exo 2', sans-serif; */
  font-family: 'Teko', sans-serif;
  overflow: hidden;
}

.highlight {
  color: black;
  animation: blink 0.8s linear 3 forwards;
  animation-delay: 3.5s; 
}


@keyframes blink {
  0%, 70% {
    color: black;
  }
  70%, 100% {
    color: red;
  }
}
</style>
