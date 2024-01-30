<template>
    <teleport to=".v-toolbar ">
  <v-dialog v-model="isLogOutOpened" persistent width="auto">
    <v-card>
      <v-card-title class="text-h5">
        Use Google's location service?
      </v-card-title>
      <v-card-text
        >Let Google help apps determine location. This means sending anonymous
        location data to Google, even when no apps are running.</v-card-text
      >
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn
          color="green-darken-1"
          variant="text"
          @click="isLogOutOpened = false"
        >
          Disagree
        </v-btn>
        <v-btn
          color="green-darken-1"
          variant="text"
          @click="handleLogOut"
        >
          Agree
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</teleport>
</template>

<script>
export default {
  props: {
    isOpened: Boolean,
  },
  data() {
    return {
      isLogOutOpened: this.isOpened || false,
    };
  },
  methods: {
    handleLogOut() {
        this.isLogOutOpened = false;
        this.$router.push('/');
        this.$emit('accept', true)
    },
  },
  watch: {
    isOpened(newVal) {
      this.isLogOutOpened = newVal;
    },
  },
};
</script>
