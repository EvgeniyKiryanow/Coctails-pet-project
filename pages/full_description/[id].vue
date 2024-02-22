<template>
  <div class="cocktails-full">
    <h1 class="title">Cocktail Full Description</h1>
    <LoaderUi v-if="loading" />
    <div v-else>
      <div v-if="cocktail.length > 0">
        <v-card
          :title="cocktail[0].title || cocktail[0].name"
          :text="cocktail[0].description"
        >
          <v-card-text class="title-steps">Steps :</v-card-text>
          <div class="steps-wrapper">
            <ol>
              <li v-for="(stepList, index) in cocktail[0].steps" :key="index">
                <span>{{ stepList }}</span>
              </li>
            </ol>
          </div>
          <v-card-text class="title-steps">Ingredients :</v-card-text>
          <div class="ingredients-wrapper">
            <ol>
              <li
                v-for="(ingredient, index) in cocktail[0].ingredients"
                :key="index"
              >
                <span>{{ ingredient }}</span>
              </li>
            </ol>
          </div>
        </v-card>
        <div class="button-wrapper">
          <NuxtLink to="/"
            ><v-btn color="amber-darken-1">Back to home Page</v-btn></NuxtLink
          >
          {{ checkFavourites }}
          <v-btn
            v-if="canDelete !== cocktail[0].created_by"
            color="amber-darken-1"
            @click="handleAddToFavourites"
            >Add to favourites</v-btn
          >
          <v-btn
            v-if="canDelete === cocktail[0].created_by"
            color="amber-darken-1"
            @click="handleDelete"
            >Delete</v-btn
          >
        </div>
      </div>
      <div v-else>No cocktail found.</div>
    </div>
  </div>
</template>

<script>
import { ref, onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";
import { cocktailService } from "../services/cocktailService";
import LoaderUi from "../assets/components/LoaderUi.vue";

export default {
  components: { LoaderUi },
  setup() {
    const loading = ref(true);
    const route = useRoute();
    const router = useRouter();
    const cocktails = ref([]);
    const filteredCocktail = ref([]);
    const cocktailId = ref(route.params.id);

    onMounted(async () => {
      try {
        cocktails.value = await cocktailService.getAllCocktails();
        filterCocktailsById();
        loading.value = false;
      } catch (error) {
        console.error("Error fetching cocktails:", error);
        loading.value = false;
      }
    });

    const filterCocktailsById = () => {
      filteredCocktail.value = cocktails.value.filter(
        (cocktail) => cocktail.id === cocktailId.value,
      );
    };
    const canDelete = localStorage.getItem("uid") || false;
    const handleDelete = async () => {
      try {
        const cocktailToDelete = filteredCocktail.value[0];
        await cocktailService.deleteCocktail(cocktailToDelete.id);
        router.push("/");
      } catch (error) {
        console.error("Error deleting cocktail:", error);
      }
    };
    const handleAddToFavourites = async () => {
      const cocktailId = filteredCocktail.value[0].id;
      filteredCocktail.value[0].favourites.push(localStorage.getItem("uid"));
      const updatedData = {
        ...filteredCocktail.value[0],
      };
      await cocktailService.updateCocktail(cocktailId, updatedData);
      router.push("/favourites");
    };

    return {
      cocktail: filteredCocktail,
      loading,
      canDelete,
      handleDelete,
      handleAddToFavourites,
    };
  },
};
</script>

<style lang="scss">
.cocktails-full {
  position: relative;
  z-index: 32;
  .v-card {
    margin-top: 15px;
    box-shadow: 2px 3px 8px orange;
  }
  .v-card-item {
    border-bottom: 1px solid lightgrey;
  }
  .v-card-text {
    text-align: center;
    padding-top: 10px;
  }
  .title-steps {
    font-weight: 800;
  }
  .steps-wrapper,
  .ingredients-wrapper {
    padding: 35px;
    ol {
      li {
        span {
          color: orange;
        }
      }
    }
  }
  .button-wrapper {
    button {
      margin-left: 15px;
    }
  }
}
</style>
