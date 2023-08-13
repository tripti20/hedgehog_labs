<script setup lang="ts">
  import axios from 'axios';
  import { useToastMessageStore } from '@/stores/toastMessage'
  import { useUserStore } from '@/stores/userStore'
  import UserList from "@/components/UserList.vue";
  import router from "@/router/index";

  //pinia
  const users = useUserStore()
  const message = useToastMessageStore()

  const usersList = users.users


  //get data
  const getData = () => {
    axios.get('https://reqres.in/api/users?page=2')
        .then(function (response) {
          // handle success
          console.log('success')
          console.log(response.data.data)
          users.storeUsers(response.data.data)
        })
        .catch(function (error) {
          // handle error
          console.log(error)
          message.setToastMessage(capitalizeFirstSentence(error.response.data.error))
        });
  }

  if (usersList.length === 0) {
    getData()
  }

  function capitalizeFirstSentence(inputString : string) {
    // Find the index of the first letter of the first sentence
    const firstSentenceStart = inputString.search(/[a-zA-Z]/);

    // If there's no letter, return the original string
    if (firstSentenceStart === -1) {
      return inputString;
    }

    // Capitalize the first letter of the first sentence
    const capitalizedFirstLetter = inputString.charAt(firstSentenceStart).toUpperCase();

    // Build the final string with the capitalized letter
    return capitalizedFirstLetter + inputString.slice(firstSentenceStart + 1);
  }

  const deleteUser = (userId : number) => {
    axios.delete(`https://reqres.in/api/users/${userId}`)
        .then(function (response) {
          // handle success
          message.setToastMessage('User deleted successfully')
          users.deleteUser(userId)
        })
        .catch(function (error) {
          // handle error
          console.log(error)
          message.setToastMessage(capitalizeFirstSentence(error.response.data.error))
        });
  }

  const logout = () => {
    localStorage.removeItem('token')
    router.push('/login')
  }

</script>

<template>
  <div class="button-box">
    <button class="logout" @click="logout">Logout</button>
    <button class="button" @click="router.push('/add-user')">Add User</button>
  </div>
  <div class="container">
    <div v-for="(value, key) in users.users" :key="key" class="items">
      <UserList :id="value.id" :firstName="value.first_name" :LastName="value.last_name" :email="value.email" :avatar="value.avatar" @deleteIconClick="deleteUser"/>
    </div>
  </div>
</template>

<style scoped>
.button-box {
  display: flex;
}

.container {
  width: 100%;
  display: grid;
  grid-template-columns: auto;
  grid-gap: 1rem;
  padding-bottom: 1rem;
  padding-top: 1rem;
}

.items {
  width: 100%;
  margin-left: auto;
  margin-right: auto;
}

.button {
  margin: 1rem;
  height: 3rem;
  width: 7.5rem;
  padding-left: 1rem;
  padding-right: 1rem;
  font-size: 1rem;
  line-height: 1.5rem;
  border-width: 1px;
  border-radius: 0.5rem;
  border-color: rgb(147 51 234);
  background-color: rgb(147 51 234);
  color: white;
  font-weight: 600;
}

.logout {
  margin: 1rem;
  height: 3rem;
  width: 7.5rem;
  padding-left: 1rem;
  padding-right: 1rem;
  font-size: 1rem;
  line-height: 1.5rem;
  border-width: 1px;
  border-radius: 0.5rem;
  border-color: rgb(225 29 72);
  background-color: rgb(225 29 72);
  color: white;
  font-weight: 600;
}

@media (min-width: 768px) {
  .container {
    width: 100%;
    display: grid;
    grid-template-columns: auto auto;
    grid-gap: 1rem;
    padding-bottom: 1rem;
    padding-top: 1rem;
  }

  .logout {
    position: absolute;
    top: 0;
    right: 0;
    margin: 1rem;
    height: 3rem;
    width: fit-content;
    padding-left: 1rem;
    padding-right: 1rem;
    font-size: 1rem;
    line-height: 1.5rem;
    border-width: 1px;
    border-radius: 0.5rem;
    border-color: rgb(225 29 72);
    background-color: rgb(225 29 72);
    color: white;
    font-weight: 600;
  }
}

@media (min-width: 1024px) {
  .container {
    width: 100%;
    display: grid;
    grid-template-columns: auto auto auto;
    grid-gap: 1rem;
    padding-bottom: 1rem;
    padding-top: 1rem;
  }
}

@media (min-width: 1536px) {
  .container {
    width: 100%;
    display: grid;
    grid-template-columns: auto auto auto auto;
    grid-gap: 1rem;
    padding-bottom: 1rem;
    padding-top: 1rem;
  }
}
</style>