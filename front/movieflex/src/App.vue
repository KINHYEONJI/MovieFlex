<template>
  <HeaderNavbar />
  <RouterView />
</template>

<script setup>
import HeaderNavbar from "@/components/common/HeaderNavbar.vue";
import { RouterView } from "vue-router";
</script>

<style>
@import url(http://fonts.googleapis.com/earlyaccess/hanna.css); 

body {
  background-color: #313131;
  font-family: 'hanna';
}

.login-btn {
  width: 100%;
  padding: 8px;
  background-color: #f00;
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

.mini-btn{
  width: 100px;
  padding: 10px;
  background-color: #f00;
  color: #fff;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s ease;  
}

.mini-btn:hover {
  background-color: #cc1111;
  color: #fff;
}

.mini-btn:active {
  background-color: #a50000;
  transition: 0.3s;
  color: #fff;
}

.input-body {
  position: relative;
  width: 100%;
  /* margin: 5px; */
  padding: 10px 10px;
  margin-top: 10px;
}

.form1 {
  font-size: 20px;
  color: white;
  width: 100%;
  border: none;
  position: relative;
  background: none;
  background-color: transparent;
  z-index: 5;
  outline: none;
  border-bottom: solid #aaaaaa 1px;
  padding: 10px;
}

.form1::placeholder { 
  color: lightgray; 
  position: absolute;
  bottom: 10px; 
}

</style>
