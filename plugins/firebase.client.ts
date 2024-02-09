import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

export default defineNuxtPlugin((nuxtApp) => {
  const config = useRuntimeConfig();

  const firebaseConfig = {
    apiKey: "AIzaSyBGY9-BYsmWxWzhM872DjHoG_Gg5zQNj4I",
    authDomain: "cocktails-51c9d.firebaseapp.com",
    projectId: "cocktails-51c9d",
    storageBucket: "cocktails-51c9d.appspot.com",
    messagingSenderId: "748466580997",
    appId: "1:748466580997:web:1b35782e0e807c433df66c",
  };

  const app = initializeApp(firebaseConfig);

  const auth = getAuth(app);
  const firestore = getFirestore(app);

  nuxtApp.vueApp.provide("auth", auth);
  nuxtApp.provide("auth", auth);

  nuxtApp.vueApp.provide("firestore", firestore);
  nuxtApp.provide("firestore", firestore);
});
