<template>
  <form>
    <v-text-field
      v-model="cocktailName.value.value"
      :counter="10"
      :error-messages="cocktailName.errorMessage.value"
      label="Cocktail Name"
    ></v-text-field>

    <v-col cols="12" md="4">
      <v-textarea
        v-model="cocktailsDescription.value.value"
        label=" Cocktails description"
        variant="outlined"
      ></v-textarea>
    </v-col>
    <!-- <v-col cols="12" md="4">
      <v-file-input label="File input"></v-file-input>
    </v-col> -->

    <v-col cols="12" md="4">
      <h3>Coctails step to creating</h3>
      <v-text-field v-model="newCocktailsStep" label="Add a new step" />
      <v-btn @click="addNewCocktailsStep">+</v-btn>
      <ol>
        <li v-for="(todo, index) in CocktailsStep" :key="index">
          {{ todo.text }}
          <v-btn @click="removeCocktailsStep(index)">Remove step</v-btn>
        </li>
      </ol>
    </v-col>

    <v-btn class="me-4" @click="handleSubmit"> create </v-btn>

    <v-btn @click="handleReset"> clear </v-btn>
  </form>
</template>

<script>
import { ref } from "vue";
import { useField, useForm } from "vee-validate";
import { cocktailService } from "../../services/cocktailService";

export default {
  setup() {
    const newCocktailsStep = ref("");
    const CocktailsStep = ref([]);

    const addNewCocktailsStep = () => {
      // Your existing logic to add a new cocktail step
    };

    const removeCocktailsStep = (index) => {
      // Your existing logic to remove a cocktail step
    };

    const cocktailName = useField("cocktailName");
    const cocktailsDescription = useField("cocktailsDescription");

    const handleReset = () => {
      // Your existing logic to reset form fields
    };

    const handleSubmit = async (values) => {
      // Your existing submit logic

      // Example usage of cocktailService to add a cocktail
      try {
        const cocktailId = await cocktailService.addCocktail({
          name: "Jeka",
          description: "test",
          steps: ['1', '2', '3'],
          created_by: 123234, // You need to replace this with the actual user ID
          created_at: 123234,
        });
        console.log("Cocktail added with ID: ", cocktailId);
        handleReset(); // Clear form fields
      } catch (error) {
        console.error("Error adding cocktail: ", error);
      }
    };

    return {
      newCocktailsStep,
      CocktailsStep,
      addNewCocktailsStep,
      removeCocktailsStep,
      handleSubmit,
      handleReset,
      cocktailName,
      cocktailsDescription,
    };
  },
};
</script>
