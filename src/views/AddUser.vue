<script setup lang="ts">
  import {ref} from 'vue'
  import router from "@/router/index";
  import { useUserStore } from '@/stores/userStore'
  import { useToastMessageStore } from '@/stores/toastMessage'
  import axios from "axios";

  //pinia
  const users = useUserStore()
  const message = useToastMessageStore()

  const firstName = ref('')
  const lastName = ref('')
  const email = ref('')

  const usersList = users.users

  //redirect
  if (usersList.length === 0) {
    router.push('/dashboard').catch(err => {
      console.log(err)
    })
  }

  let lastId = usersList[users.users.length - 1].id
  console.log(lastId)

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

  const submitForm = (e : Event) => {
    e.preventDefault()

    //redirect
    if (usersList.length === 0) {
      message.setToastMessage('An error has occurred')
      router.push('/dashboard').catch(err => {
        console.log(err)
      })
    }

    //validation
    if (email.value === '' && firstName.value === '' && lastName.value === '') {
      message.setToastMessage('Email, First Name & Last Name is required')
      return
    } else if (email.value === '') {
      message.setToastMessage('Email is required')
      return
    } else if (firstName.value === '') {
      message.setToastMessage('First Name is required')
      return
    } else if (lastName.value === '') {
      message.setToastMessage('Last Name is required')
      return
    }

    //api call
    axios.post('https://reqres.in/api/users', {
      name: firstName.value + ' ' + lastName.value,
      job: 'Flintstone'
    })
        .then(function (response) {
          message.setToastMessage('User added successfully')
          users.addUser({
            id: lastId + 1,
            email: email.value,
            first_name: firstName.value,
            last_name: lastName.value,
            avatar: 'https://xsgames.co/randomusers/avatar.php?g=male'
          })
          console.log(users.users.length)
          router.push('/dashboard').catch(err => {
            console.log(err)
          })
        })
        .catch(function (error) {
          // handle error
          console.log(error)
          message.setToastMessage(capitalizeFirstSentence(error.response.data.error))
        });
  }
</script>

<template>
  <div class="form">
    <div class="card">
      <div class="card-body">
        <form class="form">
          <label for="first-name" class="form-lable">First Name</label>
          <input type="text" placeholder="First Name" id="first-name" v-model="firstName" class="form-input" />
          <label for="last-name" class="form-lable">Last Name</label>
          <input type="text" placeholder="Last Name" id="last-name" v-model="lastName" class="form-input" />
          <label for="email" class="form-lable">Email</label>
          <input type="text" placeholder="Email" id="email" v-model="email" class="form-input" />
          <button class="form-button" @click="submitForm">Add</button>
        </form>
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
  background-color: rgb(255 255 255);
  margin: 5rem 1rem;
  flex-grow: 1;
  border-radius: 0.5rem; /* 8px */
  box-shadow: 0 25px 50px -12px rgb(0 0 0 / 0.25);
  overflow: hidden;
  display: flex;
  flex-direction: column;
}

.card-body {
  padding: 2rem;
  flex-grow: 1;
  display: flex;
  justify-content: center;
  align-items: center;
}

.form {
  display: flex;
  flex-direction: column;
}

.form-lable {
  color: rgb(147 51 234);
  margin: 0.25rem 1rem;
  font-size: 1rem;
  line-height: 1.5rem;
  font-weight: 600;
}

.form-input {
  margin: 1rem;
  height: 3rem;
  padding-left: 1rem;
  padding-right: 1rem;
  font-size: 1rem;
  line-height: 1.5rem;
  border-width: 1px;
  border-radius: 0.5rem;
  border-color: rgb(147 51 234);
}

.form-input:focus {
  outline: none !important;
}

.form-button {
  margin: 0.25rem 1rem;
  height: 3rem;
  width: fit-content;
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
  align-self: flex-end;
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
