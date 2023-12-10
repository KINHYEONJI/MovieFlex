<template>
  <div class="mylogout"></div>
</template>
  
  <script setup>
import { onMounted } from "vue";
import { useUserStore } from "@/stores/userStore";
import { useRouter } from "vue-router";
import Swal from "sweetalert2";

const userStore = useUserStore();
const router = useRouter();

const alertMessage = () => {
  Swal.fire({
    title: "로그아웃 하시겠습니까?",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#f00",
    cancelButtonColor: "#313131",
    confirmButtonText: "로그아웃",
    cancelButtonText: "취소",
  }).then((result) => {
    if (result.isConfirmed) {
      logout();
    }
    router.push({ name: "home" });
  });
};

const logout = () => {
  userStore.logout();
};

onMounted(() => {
  if (userStore.isLogin) {
    alertMessage();
  } else {
    Swal.fire("잘못된 접근입니다.", "", "error");
    router.back();
  }
});
</script>
  
  <style scoped>
.mylogout {
  background-color: #313131;
  height: 95vh;
  color: white;
}
</style>
  