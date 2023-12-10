<template>
  <nav>
    <div class="navbar-left">
      <RouterLink to="/">
        <img :src="logoSrc" />
      </RouterLink>
      <div class="navbar-menu">
        <RouterLink :to="{ name: 'best' }">
          <div class="navbar-menu-item" :style="{ fontSize: fontSize, padding: padding }">{{ movieBest }}</div>
        </RouterLink>
        <RouterLink :to="{ name: 'Articles' }">
          <div
            class="navbar-menu-item"
            :style="{ fontSize: fontSize, padding: padding }"
          >
            {{ movieReview }}
          </div>
        </RouterLink>
        <RouterLink :to="{ name: 'MovieZips' }">
          <div
            class="navbar-menu-item"
            :style="{ fontSize: fontSize, padding: padding }"
          >
            {{ movieCollection }}
          </div>
        </RouterLink>
      </div>
    </div>

    <div class="navbar-right">
      <RouterLink to="/Recommend" class="navbar-right-find">
        <img src="@/assets/find.png" />
      </RouterLink>
      <div v-if="!userStore.isLogin" class="text-center">
        <button @click="redirectToLogin" class="login-button">로그인</button>
      </div>
      <div v-else>
        <RouterLink :to="{ name: 'profile' }" class="navbar-right-profile" @click="redirectToLogout">
          <img src="@/assets/user.png" />
        </RouterLink>
      </div>
    </div>
  </nav>
</template>

<script setup>
import { ref, onMounted, onUnmounted, computed } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useUserStore } from "@/stores/userStore";
import logoSrc from "@/assets/logo.png";

const route = useRoute();
const router = useRouter();

const userStore = useUserStore();

const redirectToLogin = () => {
  router.push({ name: "login" });
};

const windowWidth = ref(window.innerWidth);

const updateWidth = () => {
  windowWidth.value = window.innerWidth;
};

onMounted(() => {
  window.addEventListener("resize", updateWidth);
});

onUnmounted(() => {
  window.removeEventListener("resize", updateWidth);
});

const movieBest = computed(() => (windowWidth.value <= 670 ? "Top10" : "Top10 영화"));
const movieReview = computed(() => (windowWidth.value <= 670 ? "리뷰" : "영화 리뷰"));
const movieCollection = computed(() => (windowWidth.value <= 670 ? "모음집" : "영화 모음집"));
const fontSize = computed(() => (windowWidth.value <= 535 ? "17px" : "19px"));
const padding = computed(() => (windowWidth.value <= 560 ? "0.5rem" : "1rem"));

const redirectToLogout = () => {
  userStore.logout();
  router.push({ name: "home" });
};
</script>

<style scoped>
@import url(http://fonts.googleapis.com/earlyaccess/hanna.css);

nav {
  background-color: #313131;
  display: flex;
  height: 50px;
  width: 100%;
  height: 10px;
  align-items: center;
  justify-content: space-between;
  padding: 2rem 1rem;
  font-family: "hanna";
}
.navbar-left {
  display: flex;
  align-items: center;
}
.navbar-menu {
  display: flex;
  padding: 1rem;
}

.navbar-menu-item {
  color: white;
  text-decoration: none !important ;
  padding: 1rem;
}

/* 아래밑줄 없애기 */
a {
  text-decoration: none !important;
}
.navbar-menu-item:hover {
  color: #f00;
  text-decoration: none !important ;
}
.navbar-right {
  display: flex;
  height: 100%;
  align-items: center;
}

.navbar-right-find:hover img {
  content: url("@/assets/find1.png");
}
.navbar-right-profile img{
  padding: 1rem;
  width: 75px;
  height: 75px;
}
.navbar-right-profile:hover img{
  padding: 1rem;
  content: url('@/assets/user1.png');
  width: 75px;
  height: 75px;
}

.text-center {
  display: flex;
  justify-content: center;
}
.login-button {
  background-color: #f00;
  border-radius: 7px;
  width: 80px;
  height: 40px;
  color: white;
  font-size: 18px;
  margin: 10px;
}
.login-button:hover {
  background-color: #cc1111;
  color: white;
}
.login-button:active {
  background-color: #a50000;
  color: white;
  transition: 0.2s;
}
</style>