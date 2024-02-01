<template>
    <v-card variant="elevated" :title="title" :text="description">
      <h3>Steps to make a cocktail</h3>
      {{ value }}
      <template v-if="type === 'description'">
        <!-- Content for description type -->
        <!-- ... -->
        ...
      </template>
      <v-list v-else lines="one">
        <v-list-item v-for="(step, index) in stepsList" :key="index" :title="step"></v-list-item>
      </v-list>
      <v-card-actions>
        <v-btn v-if="type !== 'description'" @click="remove">Remove</v-btn>
        <v-btn v-if="type !== 'description'" @click="add">Add</v-btn>
        <v-btn v-if="type === 'description'" @click="showDetails">More details</v-btn>
      </v-card-actions>
    </v-card>
  </template>
  
  <script>
  import { ref, defineProps } from 'vue';
  import { useRouter } from 'vue-router';
  
  export default {
    name: "CocktailCard",
    props: {
        value: {
            required: false
        },
        id: {
            type: Number,
            required: true,
        },
      title: {
        required: true,
        default: "Cocktails title",
        type: String,
      },
      description: {
        required: false,
        default: "Description...",
        type: String,
      },
      stepsList: {
        required: true,
        type: Array,
        default: () => ["Take some", "Add some", "Add one more", "Shake"],
      },
      type: {
        required: false,
        type: String,
        default: "",
      },
    },
    setup(props, context) {
      const cardColor = ref("amber-darken-1");
      const router = useRouter();
      const remove = () => {
        // Remove logic
        console.log("Remove button clicked");
        context.emit('remove-item', props.id);
      };
  
      const add = () => {
        // Add logic
        console.log("Add button clicked");
      };
  
      const showDetails = () => {
        router.push({ path: `/full_description/${props.id}` });
      };
  
      return {
        cardColor,
        remove,
        add,
        showDetails,
      };
    },
  };
  </script>
  