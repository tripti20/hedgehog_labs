<script setup lang="ts">
  const props = defineProps(['id', 'firstName', 'LastName', 'email', 'avatar'])

  const emit = defineEmits(['deleteIconClick'])

  const deleteIconClick = (userId : number) => {
    emit('deleteIconClick', userId)
  }
</script>

<template>
  <div class="item-container">
    <img :src="props.avatar" alt="avatar" class="avatar">
    <div class="user-info">
      <span class="name">{{ firstName }} {{ LastName }}</span>
      <span class="email">{{ email }}</span>
    </div>
    <div class="delete-icon-container" @click="deleteIconClick(props.id)">
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="delete-icon">
        <path stroke-linecap="round" stroke-linejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
      </svg>
    </div>
  </div>
</template>

<style scoped>
.item-container {
  background-color: rgb(255 255 255);
  border-radius: 0.5rem; /* 8px */
  box-shadow: 0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1);
  overflow: hidden;
  display: flex;
}

.avatar {
  width: 5rem;
  height: 5rem;
  object-fit: fill;
  border-radius: 9999px;
  margin: 1.5rem;
}

.user-info {
  display: flex;
  flex-direction: column;
  justify-content: center;
  flex-grow: 1;
}

.name {
  font-size: 1.25rem; /* 20px */
  line-height: 1.75rem; /* 28px */
  font-weight: 600;
}

.email {
  font-size: 1rem; /* 16px */
  line-height: 1.5rem; /* 24px */
  color: rgb(107 114 128);
}

.delete-icon-container {
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.delete-icon {
  margin: 1.5rem;
  cursor: pointer;
  width: 1.5rem;
  height: 1.5rem;
  color: red;
}
</style>