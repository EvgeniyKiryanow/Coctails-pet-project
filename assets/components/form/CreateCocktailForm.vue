<template>
  <form @submit.prevent="submit">
    <v-text-field
      v-model="cocktailName.value.value"
      :counter="10"
      :error-messages="cocktailName.errorMessage.value"
      label="Cocktail Name"
    ></v-text-field>

    <v-col cols="12" md="4">
      <v-textarea
        label=" Cocktails description"
        v-model="cocktailsDescription.value.value"
        variant="outlined"
      ></v-textarea>
    </v-col>
    <v-col cols="12" md="4">
      <v-file-input label="File input"></v-file-input>
    </v-col>

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

    <v-btn class="me-4" type="submit"> create </v-btn>

    <v-btn @click="handleReset"> clear </v-btn>
  </form>
</template>

<script>
import { ref } from "vue";
import { useField, useForm } from "vee-validate";

export default {
  setup() {
    const { handleSubmit, resetForm } = useForm({
      validationSchema: {
        cocktailName(value) {
          if (value?.length >= 3) return true;
          return "Cocktail Name needs to be at least 3 characters.";
        },
      },
    });

    const newCocktailsStep = ref("");
    const CocktailsStep = ref([]);

    const addNewCocktailsStep = () => {
      if (newCocktailsStep.value.trim() !== "") {
        CocktailsStep.value = [
          ...CocktailsStep.value,
          { text: newCocktailsStep.value, completed: false },
        ];
        newCocktailsStep.value = "";
      }
    };

    const removeCocktailsStep = (index) => {
      CocktailsStep.value.splice(index, 1);
    };

    const submit = handleSubmit((values) => {
      alert(JSON.stringify(values, null, 2));
    });

    const cocktailName = useField("cocktailName");
    const cocktailsDescription = useField("cocktailsDescription");
    const cocktailsStep = useField("CocktailsStep");

    const handleReset = () => {
      resetForm();
      newCocktailsStep.value = "";
      CocktailsStep.value = [];
    };

    return {
      newCocktailsStep,
      CocktailsStep,
      addNewCocktailsStep,
      removeCocktailsStep,
      submit,
      handleReset,
      cocktailName,
      cocktailsDescription,
      cocktailsStep,
    };
  },
};
</script>
