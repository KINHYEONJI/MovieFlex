<template>
  <div class="login-container">
    <div class="login-form">
      <div class="mb-2 text-center">
        <div>로그인</div>
      </div>
      <div class="mb-3 input-wrapper">
        <label for="email" class="form-label">이메일</label>
        <input
          v-model="username"
          type="email"
          class="form-control"
          id="email"
          placeholder="you@example.com"
        />
      </div>
      <div class="mb-3 input-wrapper">
        <label for="password" class="form-label">비밀번호</label>
        <input
          v-model="password"
          @keyup.enter="logIn"
          type="password"
          class="form-control"
          id="password"
        />
      </div>
      <div class="gap-2 d-grid">
        <button @click="logIn" class="login-btn">로그인</button>
      </div>
      <p class="logup-center mt-4 mb-1">
        아직 계정이 없으신가요?
      </p>
      <div class="signup-link">
        <RouterLink :to="{ name: 'signUp' }" class="signup-link">
          회원가입 하세요.
        </RouterLink>        
      </div>
    </div>
    <video src="@/assets/video1.mp4" muted autoplay loop playbackRate="1.5"></video>
  </div>
</template>
  
<script setup>
import { ref } from "vue";
import { useUserStore } from "@/stores/userStore";
// import Swal from "sweetalert2";

const username = ref(null);
const password = ref(null);
const userStore = useUserStore();

const alertMessage = (msg) => {
  Swal.fire({
    title: `${msg} 입력해주세요`,
    icon: "error",
    confirmButtonColor: "#682cd48c",
    confirmButtonText: "확인",
  });
};

const logIn = () => {
  if (!username.value) {
    alertMessage("아이디를");
    return;
  }
  if (!password.value) {
    alertMessage("비밀번호를");
    return;
  }

  const payload = {
    username: username.value,
    password: password.value,
  };
  userStore.loginUser(payload);
};
</script>
  
<style scope>
@import url(http://fonts.googleapis.com/earlyaccess/hanna.css); 

video{
  width: 100%;
  height: 100vh;
  object-fit: cover;
  opacity: 0.8;
  z-index: 0;
}
.text-center {
  font-size: 30px;
}
.login-container {
  position: fixed;
  overflow: hidden;
  width: 100%;
  height: 100%;
  background-color: lightgrey;
}

.login-form {
  position: absolute;
  top: 40%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 1;
  width: 300px;
  padding: 20px;
  border: 1px solid #313131;
  border-radius: 5px;
  background-color: #414141;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.3);
  color: white;
  font-family: 'hanna';
  font-size: large;
  letter-spacing:3px;
}

.input-wrapper {
  margin-bottom: 15px;
}

.form-label {
  display: block;
  margin-bottom: 5px;
  font-size: 18px;
}

.form-control {
  width: 100%;
  padding: 8px;
  font-size: 18px;
  border: 1px solid #ccc;
  border-radius: 4px;
}

.d-grid {
  display: grid;
  gap: 10px;
}

.signup-link {
  text-align: center;
  color: #f00;
  font-size: medium;
  text-decoration-line: none;
}

.signup-link:hover {
  text-align: center;
  color: #f00;
  font-size: medium;
  text-decoration-line: underline;
}

.logup-center {
  text-align: center;
}

.login-btn {
  width: 100%;
  padding: 8px;
  background-color: #f00;
  /* font-size: 20px; */
  color: #fff;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.login-btn:hover {
  background-color: #cc1111;
  color: #fff;
}

.login-btn:active {
  background-color: #a50000;
  transition: 0.3s;
  color: #fff;
}

.form-control::placeholder {
  color: rgb(150, 150, 150)
}
</style>