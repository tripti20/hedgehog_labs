<script setup lang="ts">
  import { useToastMessageStore } from '@/stores/toastMessage'
  import {watch} from "vue";

  const message = useToastMessageStore()

  watch(
      () => message.text,
      () => {
        if (message.text === '') return
        message.setVisisbility(true)
        setTimeout(() => {
          message.setVisisbility(false)
          message.setToastMessage('')
        }, 3000)
      },
  )
</script>

<template>
  <div class="container">
    <p class="header">Tripti Soni</p>
    <RouterView />
    <div class="toast" :class="{ fadeIn : message.visible, fadeOut: !message.visible }">{{ message.text }}</div>
  </div>
</template>

<style scoped>
.header {
  font-family: 'Water Brush', cursive;
  font-size: 4.5rem; /* 72px */
  line-height: 1;
  font-weight: 700;
  color: #fff;
}

.container {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-bottom: 2.5rem;
  height: 100%;
}

.toast {
  position: absolute;
  top: 0;
  right: 0;
  margin: 1rem;
  z-index: 9999;
  background-color: rgb(147 51 234);
  padding: 1.5rem;
  border-radius: 0.5rem; /* 8px */
  box-shadow: 0 0.5rem 1rem rgba(0, 0, 0, 0.15);
  color: white;
  font-weight: 600;
  font-size: 1rem;
  visibility: hidden;
  opacity: 0;
  -webkit-animation-duration: 1s;
  animation-duration: 1s;
  -webkit-animation-fill-mode: both;
  animation-fill-mode: both;
}

@-webkit-keyframes fadeIn {
  0% {opacity: 0;}
  100% {opacity: 1;}
}

@keyframes fadeIn {
  0% {opacity: 0;}
  100% {opacity: 1;}
}

@-webkit-keyframes fadeOut {
  0% {opacity: 1;}
  100% {opacity: 0;}
}

@keyframes fadeOut {
  0% {opacity: 1;}
  100% {opacity: 0;}
}

.fadeIn {
  visibility: visible;
  -webkit-animation-name: fadeIn;
  animation-name: fadeIn;
}

.fadeOut {
  -webkit-animation-name: fadeOut;
  animation-name: fadeOut;
}

@media (min-width: 820px) {
  .container {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding-bottom: 2.5rem;
    padding-left: 1rem;
    padding-right: 1rem;
    height: 100%;
  }
}
</style>
