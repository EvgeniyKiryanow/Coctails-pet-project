<template>
  <div>
    <v-card
      class="mx-auto pa-12 pb-8"
      elevation="8"
      max-width="448"
      rounded="lg"
    >
      <div class="text-subtitle-1 text-medium-emphasis">Name</div>

      <v-text-field
        v-model="registerData.name"
        density="compact"
        placeholder="Name"
        prepend-inner-icon="mdi-star-outline"
        variant="outlined"
      ></v-text-field>

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

        <!-- <a
            class="text-caption text-decoration-none text-blue"
            href="#"
            rel="noopener noreferrer"
            target="_blank"
          >
            Forgot login password?</a> -->
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

      <v-card class="mb-12" color="surface-variant" variant="tonal">
        <v-card-text class="text-medium-emphasis text-caption">
          Warning: We don`t have feature for send you email , if you forgot
          password
        </v-card-text>
      </v-card>

      <v-btn
        block
        class="mb-8"
        color="blue"
        size="large"
        variant="tonal"
        :disabled="hasValidationErrors"
        @click="handleRegister"
      >
        Sign up now
      </v-btn>

      <v-card-text class="text-center">
        <a
          class="text-blue text-decoration-none"
          href="#"
          rel="noopener noreferrer"
          target="_blank"
        >
            Log In <v-icon icon="mdi-chevron-right"></v-icon>
        </a>
      </v-card-text>
    </v-card>
  </div>
</template>

<script>
export default {
  data: () => ({
    visible: false,
    registerData: {
      email: "",
      password: "",
      name: "",
    },
  }),
  methods: {
    handleRegister() {
      alert(this.registerData.name);
      alert(this.registerData.email);
      alert(this.registerData.password);
    },
  },
  computed: {
    nameRules() {
        return [
        (v) => !!v || 'Name is required',
        (v) => v && v.length >= 2 || 'Name must be at least 2 characters',
      ];
    },
    emailRules() {
      return [
        (v) => !!v || 'Email is required',
        (v) => /^[a-z.-]+@[a-z.-]+\.[a-z]+$/i.test(v) || 'Must be a valid email address',
      ];
    },
    passwordRules() {
      return [
        (v) => !!v || 'Password is required',
        (v) => v && v.length >= 6 || 'Password must be at least 6 characters',
      ];
    },
    hasValidationErrors() {
      return (
        !this.registerData.name ||
        !this.registerData.email ||
        !this.registerData.password ||
        !this.emailRules.every(rule => rule(this.registerData.email)) ||
        !this.passwordRules.every(rule => rule(this.registerData.password))
      );
    },
  },
};
</script>
