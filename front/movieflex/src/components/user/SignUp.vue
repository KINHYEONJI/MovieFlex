<template>
  <div class="signup-container">
    <div class="signup-form">
      <h2 class="signup-title">회원가입</h2>
      <div class="input-wrapper">
        <label for="email" class="form-label">이메일</label>
        <input
          v-model="email"
          type="email"
          class="form-control"
          id="email"
          placeholder="name@example.com"
        />
      </div>
      <div class="input-wrapper">
        <label for="nickname" class="form-label">닉네임</label>
        <input
          v-model="nickname"
          type="nickname"
          class="form-control"
          id="nickname"
          placeholder="홍길동"
        />
      </div>
      <div class="input-wrapper">
        <label for="password1" class="form-label">비밀번호</label>
        <input
          v-model="password1"
          type="password"
          class="form-control"
          id="password1"
          placeholder="비밀번호"
        />
      </div>
      <div class="input-wrapper">
        <label for="password2" class="form-label">비밀번호 확인</label>
        <input
          v-model="password2"
          @keyup.enter="signUp"
          type="password"
          class="form-control"
          id="password2"
          placeholder="비밀번호 확인"
        />
      </div>
      <div class="d-grid">
        <button @click="signUp" class="mt-2 btn btn-info">회원가입</button>
      </div>
    </div>
    <video src="@/assets/video2.mp4" muted autoplay loop></video>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useUserStore } from "@/stores/userStore";
import Swal from "sweetalert2";
import { useRouter } from "vue-router";

const router = useRouter();

const email = ref(null);
const nickname = ref(null);
const password1 = ref(null);
const password2 = ref(null);
const userStore = useUserStore();

const alertMessage = (msg) => {
  Swal.fire({
    title: `${msg}`,
    icon: "error",
    confirmButtonColor: "#682cd48c",
    confirmButtonText: "확인",
  });
};

const signUp = () => {
  if (!email.value) {
    alertMessage("이메일를 입력해주세요");
    return;
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email.value)) {
    alertMessage("이메일 형식이어야 합니다");
    return;
  }

  if (!nickname.value) {
    alertMessage("닉네임를 입력해주세요");
    return;
  }

  if (!password1.value) {
    alertMessage("비밀번호를 입력해주세요");
    return;
  }

  if (password1.value.length < 8) {
    alertMessage("비밀번호가 너무 짧습니다. \n 8자리 이상 입력해주세요.");
    return;
  }

  if (password1.value !== password2.value) {
    alertMessage("비밀번호가 일치하지 않습니다");
    return;
  }

  const payload = {
    username: email.value,
    nickname: nickname.value,
    password1: password1.value,
    password2: password2.value,
  };

  userStore.signUpUser(payload);
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
.signup-container {
  position: fixed;
  overflow: hidden;
  width: 100%;
  height: 100%;
  background-color: lightgray;

  display: flex;
  justify-content: center;
  align-items: center;
}

.signup-form {
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

.signup-title {
  text-align: center;
  margin-bottom: 1rem;
  font-size: 30px;
}

.input-wrapper {
  margin-bottom: 1rem;
}

.form-label {
  display: block;
  margin-bottom: 5px;
}

.form-control {
  width: 100%;
  padding: 8px;
  font-size: 16px;
  border: 1px solid #ccc;
  border-radius: 4px;
}

.d-grid {
  display: grid;
  gap: 10px;
}

.btn {
  width: 100%;
  padding: 10px;
  background-color: #f00;
  color: #fff;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.btn:hover {
  background-color: #cc1111;
  color: #fff;
}

.btn:active {
  background-color: #a50000 !important;
  color: #fff !important;
}

.form-control::placeholder {
  color: rgb(150, 150, 150)
}
</style>
