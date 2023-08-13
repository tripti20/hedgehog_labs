<script setup lang="ts">
  import axios from 'axios';
  import {ref} from 'vue'
  import {useToastMessageStore} from '@/stores/toastMessage'
  import router from "@/router";

  //pinia
  const message = useToastMessageStore()

  //props
  const props = defineProps(['type', 'buttonText'])

  //data
  const email = ref('')
  const password = ref('')

  //functions
  function capitalizeFirstSentence(inputString: string) {
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

  function submitForm(e : Event) {
    e.preventDefault()

    //validation
    if (email.value === '' && password.value === '') {
      message.setToastMessage('Email & Password is required')
      return
    } else if (email.value === '') {
      message.setToastMessage('Email is required')
      return
    } else if (password.value === '') {
      message.setToastMessage('Password is required')
      return
    }

    //api call
    let url = ''
    let actualPassword = ''
    const actualEemail = 'eve.holt@reqres.in'

    if (props.type === 'register') {
      url = 'https://reqres.in/api/register'
      actualPassword = 'pistol'
    } else if (props.type === 'login') {
      // Retrieve the JSON string from localStorage
      

      

      url = 'https://reqres.in/api/login'
      actualPassword = 'cityslicka'
    }

    axios.post(url, {
      email: actualEemail,
      password: actualPassword
    }).then(function (response) {
          if (response.status === 200) {
            if (props.type === 'register') {
              //get previsous data
              // Retrieve the JSON string from localStorage
              const storedArrayJSON = localStorage.getItem('arrayOfObjects');

              let storedArray: any[]

              if (storedArrayJSON) {
                // Parse the JSON string to get the original array of objects
                storedArray = JSON.parse(storedArrayJSON);

                let containsValue = storedArray.some(obj => obj.email === email.value);

                if (containsValue) {
                  message.setToastMessage('Email already exists')
                  return
                } else {
                  storedArray.push({ email: email.value, password: password.value })
                }
              } else {
                storedArray = [
                  { email: email.value, password: password.value }
                ];
              }


              // Convert the array to a JSON string
              let arrayOfObjectsJSON = JSON.stringify(storedArray);

              // Store the JSON string in localStorage
              localStorage.setItem('arrayOfObjects', arrayOfObjectsJSON);

              //redirect to login page
              router.push('/login')
              message.setToastMessage('Registration Successful')
            } else if (props.type === 'login') {
              //redirect to dashboard page
              router.push('/dashboard')
              localStorage.setItem('token', response.data.token)
              message.setToastMessage('Login Successful')
            }
          }
        })
        .catch(function (error) {
          console.log(error)
          message.setToastMessage(capitalizeFirstSentence(error.response.data.error))
        });
  }
</script>

<template>
    <form class="form">
        <label for="email" class="form-lable">Email</label>
        <input type="text" placeholder="Email" id="email" v-model="email" class="form-input" />
        <label for="password" class="form-lable">Password</label>
        <input type="password" placeholder="Password" id="password" v-model="password" class="form-input" />
        <button class="form-button" @click="submitForm">{{ props.buttonText }}</button>
    </form>
</template>

<style scoped>
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
</style>