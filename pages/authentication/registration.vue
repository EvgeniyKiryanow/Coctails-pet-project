<template>
  <div class="registration">
    <h1 class="title">Registration</h1>
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

      <v-card class="mb-12" color="surface-variant" variant="tonal">
        <v-card-text class="text-medium-emphasis text-caption">
          Warning: We don't have a feature to send you an email if you forget
          your password.
        </v-card-text>
      </v-card>

      <v-btn
        block
        class="mb-8"
        color="blue"
        size="large"
        variant="tonal"
        :disabled="hasValidationErrors || isRegistering"
        @click="handleRegister"
      >
        {{ isRegistering ? "Signing up..." : "Sign up now" }}
      </v-btn>

      <v-card-text class="text-center">
        <a
          class="text-blue text-decoration-none"
          href="#"
          rel="noopener noreferrer"
          target="_blank"
        >
          <NuxtLink class="log-in" to="/authentication/log_in"
            >Log In <v-icon icon="mdi-chevron-right"></v-icon
          ></NuxtLink>
        </a>
      </v-card-text>
    </v-card>
  </div>
</template>

<script setup>
import { ref, computed } from "vue";
import { useRouter } from "vue-router";
import { storeToRefs } from "pinia";
import { useUserAuthDataStore } from "~/stores/auth";
const { registrateUser } = useUserAuthDataStore();
const { authenticated } = storeToRefs(useUserAuthDataStore());
const router = useRouter();
const visible = ref(false);

const registerData = ref({
  email: "",
  password: "",
});

const emailRules = computed(() => [
  (v) => !!v || "Email is required",
  (v) =>
    /^[a-z.-]+@[a-z.-]+\.[a-z]+$/i.test(v) || "Must be a valid email address",
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

const isRegistering = ref(false);

const handleReset = () => {
  registerData.value.name = "";
  registerData.value.email = "";
  registerData.value.password = "";
};
const handleRegister = async () => {
  if (isRegistering.value) {
    return;
  }
  try {
    await registrateUser({
      email: registerData.value.email,
      password: registerData.value.password,
    });
  } catch (error) {
    console.error("Error during registration:", error);
    alert("Registration failed. Please try again.");
  } finally {
    isRegistering.value = false;
  }
  if (authenticated) {
    router.push("/");
  }
};
</script>

<style lang="scss" scoped>
.registration {
  padding-top: 25px;
}
</style>
