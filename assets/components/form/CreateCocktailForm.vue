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

    <v-col cols="12" md="4">
      <h3>Cocktails steps to create</h3>
      <v-text-field v-model="newCocktailsStep" label="Add a new step" />
      <v-btn @click="addNewCocktailsStep">+</v-btn>
      <ol>
        <li v-for="(step, index) in cocktailsSteps" :key="index">
          {{ step.text }}
          <v-btn @click="removeCocktailsStep(index)">Remove step</v-btn>
        </li>
      </ol>
    </v-col>

    <v-col cols="12" md="4">
      <h3>Ingredients list</h3>
      <v-text-field v-model="newIngredient" label="Add a new ingredient" />
      <v-btn @click="addNewIngredient">+</v-btn>
      <ol>
        <li v-for="(ingredient, index) in cocktailIngredients" :key="index">
          {{ ingredient.text }}
          <v-btn @click="removeIngredient(index)">Remove ingredient</v-btn>
        </li>
      </ol>
    </v-col>

    <v-btn class="me-4" @click="handleSubmit"> Create </v-btn>
    <v-btn @click="handleReset"> Clear </v-btn>
  </form>
</template>

<script>
import { ref } from "vue";
import { useField } from "vee-validate";
import { useRouter } from "vue-router";
import { cocktailService } from "../../services/cocktailService";
import { useUserAuthDataStore } from "~/stores/auth";

export default {
  setup() {
    const router = useRouter();
    const userAuthStore = useUserAuthDataStore();
    const cocktailName = useField("cocktailName");
    const cocktailsDescription = useField("cocktailsDescription");
    const cocktailsSteps = ref([]);
    const newCocktailsStep = ref("");
    const cocktailIngredients = ref([]);
    const newIngredient = ref("");

    const addNewCocktailsStep = () => {
      cocktailsSteps.value.push({ text: newCocktailsStep.value });
      newCocktailsStep.value = "";
    };

    const removeCocktailsStep = (index) => {
      cocktailsSteps.value.splice(index, 1);
    };

    const addNewIngredient = () => {
      cocktailIngredients.value.push({ text: newIngredient.value });
      newIngredient.value = "";
    };

    const removeIngredient = (index) => {
      cocktailIngredients.value.splice(index, 1);
    };

    const handleReset = () => {
      cocktailName.value.value = "";
      cocktailsDescription.value.value = "";
      cocktailsSteps.value = [];
      cocktailIngredients.value = [];
      router.push("/favourites");
    };

    const handleSubmit = async () => {
      try {
        if (userAuthStore.user.uid) {
          await cocktailService.addCocktail({
            name: cocktailName.value.value,
            description: cocktailsDescription.value.value,
            steps: cocktailsSteps.value.map((step) => step.text),
            ingredients: cocktailIngredients.value.map(
              (ingredient) => ingredient.text,
            ),
            created_by: userAuthStore.user.uid,
            created_at: Date.now(),
            favourites: [userAuthStore.user.uid],
          });
        }
        handleReset(); // Clear form fields
      } catch (error) {
        console.error("Error adding cocktail: ", error);
      }
    };

    return {
      newCocktailsStep,
      cocktailsSteps,
      newIngredient,
      cocktailIngredients,
      addNewCocktailsStep,
      removeCocktailsStep,
      addNewIngredient,
      removeIngredient,
      handleSubmit,
      handleReset,
      cocktailName,
      cocktailsDescription,
    };
  },
};
</script>
