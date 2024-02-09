<template>
  <div>
    <h1>Log in</h1>
    <v-card
      class="mx-auto pa-12 pb-8"
      elevation="8"
      max-width="448"
      rounded="lg"
    >
      <div class="text-subtitle-1 text-medium-emphasis">Account</div>

      <v-text-field
        v-model="registerData.email"
        density="compact"
        placeholder="Email address"
        :rules="emailRules"
        prepend-inner-icon="mdi-email-outline"
        variant="outlined"
      ></v-text-field>

      <div
        class="text-subtitle-1 text-medium-emphasis d-flex align-center justify-space-between"
      >
        Password
      </div>

      <v-text-field
        v-model="registerData.password"
        :append-inner-icon="visible ? 'mdi-eye-off' : 'mdi-eye'"
        :type="visible ? 'text' : 'password'"
        density="compact"
        :rules="passwordRules"
        placeholder="Enter your password"
        prepend-inner-icon="mdi-lock-outline"
        variant="outlined"
        @click:append-inner="visible = !visible"
      ></v-text-field>

      <v-btn
        block
        class="mb-8"
        color="blue"
        size="small"
        variant="tonal"
        @click="handleReset"
      >
        Reset <v-icon icon="mdi-alert-circle"></v-icon>
      </v-btn>

      <v-btn
        block
        class="mb-8"
        color="blue"
        size="large"
        variant="tonal"
        :disabled="hasValidationErrors"
        @click="handleRegister"
      >
        Log In
      </v-btn>

      <!-- Google Sign-In button -->
      <v-btn
        block
        class="mb-8"
        color="blue"
        size="large"
        variant="outlined"
        @click="signInWithGoogle"
      >
        Sign in with Google
      </v-btn>

      <v-card-text class="text-center">
        <a
          class="text-blue text-decoration-none"
          href="#"
          rel="noopener noreferrer"
          target="_blank"
        >
          <NuxtLink class="log-in" to="/authentication/registration"
            >Sign up <v-icon icon="mdi-chevron-right"></v-icon
          ></NuxtLink>
        </a>
      </v-card-text>
    </v-card>
  </div>
</template>

<script>
import { ref, computed, defineComponent } from "vue";
import {
  getAuth,
  GoogleAuthProvider,
  signInWithEmailAndPassword,
  signInWithPopup,
} from "firebase/auth";
import { useRouter } from "vue-router";
import { useUserAuthDataStore } from "@/stores/auth";

export default defineComponent({
  setup() {
    const userAuthStore = useUserAuthDataStore(); // Access the Pinia store instance
    const visible = ref(false);
    const auth = getAuth();
    const router = useRouter();
    const registerData = ref({
      email: "",
      password: "",
    });

    const handleRegister = async () => {
      try {
        const { email, password } = registerData.value;
        const userCredential = await signInWithEmailAndPassword(
          auth,
          email,
          password,
        );
        const user = userCredential.user;
        localStorage.setItem("accessToken", userCredential.accessToken);

        // Set user in Pinia store
        userAuthStore.setUser({
          name: user.displayName, // Adjust according to your user data
          accessToken: userCredential.accessToken,
          uid: user.uid,
          email: user.email,
        });

        router.push("/favourites");
        // Handle signed-in user (you may want to redirect or show a welcome message)
        console.log(user);
      } catch (error) {
        console.error(error);
        // Handle errors
      }
    };

    const signInWithGoogle = async () => {
      try {
        const provider = new GoogleAuthProvider();
        const result = await signInWithPopup(auth, provider);
        const user = result.user;
        // Handle signed-in user (you may want to redirect or show a welcome message)
        console.log(user);
      } catch (error) {
        console.error(error);
        // Handle errors
      }
    };

    const emailRules = computed(() => [
      (v) => !!v || "Email is required",
      (v) =>
        /^[a-z.-]+@[a-z.-]+\.[a-z]+$/i.test(v) ||
        "Must be a valid email address",
    ]);

    const passwordRules = computed(() => [
      (v) => !!v || "Password is required",
      (v) => (v && v.length >= 6) || "Password must be at least 6 characters",
    ]);

    const hasValidationErrors = computed(() => {
      return (
        !registerData.value.email ||
        !registerData.value.password ||
        !emailRules.value.every((rule) => rule(registerData.value.email)) ||
        !passwordRules.value.every((rule) => rule(registerData.value.password))
      );
    });

    const handleReset = () => {
      registerData.value.email = "";
      registerData.value.password = "";
    };

    return {
      visible,
      registerData,
      handleRegister,
      handleReset,
      emailRules,
      passwordRules,
      hasValidationErrors,
      signInWithGoogle,
    };
  },
});
</script>
