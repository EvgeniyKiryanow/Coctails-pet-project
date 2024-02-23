<template>
  <div>
    <h1 class="title">Create Cocktails</h1>
    <v-card class="mx-auto px-6 py-8 cocktail-form" max-width="700">
      <v-form>
        <h4 class="field-title">Enter name</h4>
        <v-text-field
          v-model="cocktailName.value.value"
          variant="underlined"
          :counter="10"
          :error-messages="cocktailName.errorMessage.value"
          label="Cocktail Name"
        ></v-text-field>
        <h4 class="field-title">Enter description</h4>
        <v-col cols="12" md="12">
          <v-textarea
            v-model="cocktailsDescription.value.value"
            label=" Cocktails description"
            variant="outlined"
          ></v-textarea>
        </v-col>

        <v-col cols="12" md="12">
          <h4 class="field-title">Enter steps</h4>
          <div class="todo-wrapper">
            <v-text-field
              v-model="newCocktailsStep"
              variant="underlined"
              label="Add a new step"
            />
            <v-btn
              color="amber-darken-1"
              density="default"
              icon="mdi-plus"
              @click="addNewCocktailsStep"
            ></v-btn>
          </div>
          <ol>
            <li
              v-for="(step, index) in cocktailsSteps"
              :key="index"
              class="list-wrapper"
            >
              <span class="orange"
                >{{ index + 1 + "." }}
                <span class="list-item">{{ step.text }}</span>
              </span>
              <v-btn
                density="compact"
                icon="mdi-minus"
                @click="removeCocktailsStep(index)"
              />
            </li>
          </ol>
        </v-col>

        <v-col cols="12" md="12">
          <h4 class="field-title">Enter Ingredients</h4>
          <div class="todo-wrapper">
            <v-text-field
              v-model="newIngredient"
              variant="underlined"
              label="Add a new ingredient"
            />
            <v-btn
              color="amber-darken-1"
              density="default"
              icon="mdi-plus"
              @click="addNewIngredient"
            ></v-btn>
          </div>
          <ol>
            <li
              v-for="(ingredient, index) in cocktailIngredients"
              :key="index"
              class="list-wrapper"
            >
              <span class="orange"
                >{{ index + 1 + "." }}
                <span class="list-item">{{ ingredient.text }}</span>
              </span>
              <v-btn
                density="compact"
                icon="mdi-minus"
                @click="removeIngredient(index)"
              />
            </li>
          </ol>
        </v-col>

        <div class="button-wrapper">
          <v-btn color="amber-darken-1" class="me-4" @click="handleSubmit">
            Create
          </v-btn>
          <v-btn color="amber-darken-1" @click="handleReset"> Clear </v-btn>
        </div>
      </v-form>
    </v-card>
  </div>
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
      if (!newCocktailsStep.value) {
        return false;
      }
      cocktailsSteps.value.push({ text: newCocktailsStep.value });
      newCocktailsStep.value = "";
    };

    const removeCocktailsStep = (index) => {
      cocktailsSteps.value.splice(index, 1);
    };

    const addNewIngredient = () => {
      if (!cocktailIngredients.value) {
        return false;
      }
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
<style lang="scss" scoped>
.cocktail-form {
  box-shadow: 2px 3px 8px orange;
  padding: 10px;
  border: thick double orange;
  .field-title {
    font-weight: 600;
    font-family: fantasy;
    text-align: center;
    font-size: 18px;
    padding: 10px;
  }
  .list-item {
    color: black;
    font-family: fantasy;
    text-align: center;
    font-size: 16px;
  }
  .button-wrapper {
    padding-top: 10px;
    display: flex;
    justify-content: space-around;
  }
  .todo-wrapper {
    display: flex;
    align-items: center;
    align-content: center;
    input {
      margin-right: 25px;
    }
  }
  .list-wrapper {
    display: flex;
    align-content: center;
    align-items: center;
    justify-content: space-between;
    padding: 10px;
    border-bottom: 1px solid orange;
  }
}
.orange {
  color: orange;
}
</style>
