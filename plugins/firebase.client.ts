import { initializeApp } from 'firebase/app'
import { getAuth } from "firebase/auth"
import { getFirestore } from 'firebase/firestore'

export default defineNuxtPlugin(nuxtApp => {
    const config = useRuntimeConfig()

    const firebaseConfig = {
        apiKey: "AIzaSyAP0lLz3-5MKXp0OtgZe50fWwvQAtg5Cm8",
        authDomain: "cocktails-project-44253.firebaseapp.com",
        projectId: "cocktails-project-44253",
        storageBucket: "cocktails-project-44253.appspot.com",
        messagingSenderId: "995706343769",
        appId: "1:995706343769:web:0ea537a0ce918951f53c48"
      };

      const app = initializeApp(firebaseConfig)

      const auth = getAuth(app)
      const firestore = getFirestore(app)
  
      nuxtApp.vueApp.provide('auth', auth)
      nuxtApp.provide('auth', auth)
  
      nuxtApp.vueApp.provide('firestore', firestore)
      nuxtApp.provide('firestore', firestore)
})