<script setup lang="ts">

</script>

<template>
  <div class="form">
    <div class="card">
      <div class="card-header">
        <RouterLink class="nav-items" to="/login">Ligin</RouterLink>
        <RouterLink class="nav-items" to="/register">Register</RouterLink>
      </div>
      <div class="card-body">
        <RouterView />
      </div>
    </div>
  </div>
</template>

<style scoped>
.form {
  flex-grow: 1;
  width: 100%;
  display: flex;
}

.card {
  margin: 5rem 1rem;
  background-color: rgb(255 255 255);
  flex-grow: 1;
  border-radius: 0.5rem; /* 8px */
  box-shadow: 0 25px 50px -12px rgb(0 0 0 / 0.25);
  overflow: hidden;
  display: flex;
  flex-direction: column;
}

.card-header {
  display: flex;
}

.nav-items {
  flex-grow: 1;
  margin: 0;
  padding: 1.25rem; /* 20px */
  text-align: center;
  font-size: 1.25rem; /* 20px */
  line-height: 1.75rem; /* 28px */
  font-weight: 600;
  text-decoration: none;
  color: rgb(147 51 234);
}

.router-link-active {
  background-color: rgb(147 51 234);
  color: #ffffff;
}

.card-body {
  padding: 2rem;
  flex-grow: 1;
  display: flex;
  justify-content: center;
  align-items: center;
}

@media (min-width: 768px) {
  .card {
    background-color: rgb(255 255 255);
    margin: 5rem 2.5rem;
    flex-grow: 1;
    border-radius: 0.5rem; /* 8px */
    box-shadow: 0 25px 50px -12px rgb(0 0 0 / 0.25);
    overflow: hidden;
    display: flex;
    flex-direction: column;
  }
}

@media (min-width: 1024px) {
  .card {
    background-color: rgb(255 255 255);
    margin: 5rem 25rem;
    flex-grow: 1;
    border-radius: 0.5rem; /* 8px */
    box-shadow: 0 25px 50px -12px rgb(0 0 0 / 0.25);
    overflow: hidden;
    display: flex;
    flex-direction: column;
  }
}
</style>
