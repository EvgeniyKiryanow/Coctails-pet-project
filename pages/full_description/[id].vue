<template>
  <div class="mains">
    <div v-if="loading">Loading...</div>
    <div v-else>
      <h1>Cocktail Full Description</h1>
      <v-card
        v-if="cocktail.length > 0"
        :title="cocktail[0].title || cocktail[0].name"
        :text="cocktail[0].description"
      >
        <div>
          <ol v-for="(stepList, index) in cocktail[0].steps" :key="index">
            <li>{{ index + 1 }} {{ stepList.step }}</li>
          </ol>
        </div>
      </v-card>
      <div v-else>No cocktail found</div>
    </div>
  </div>
</template>

<script>
import { ref, onMounted } from "vue";
import { useRoute } from "vue-router";
import { cocktailService } from "../services/cocktailService";

export default {
  setup() {
    const loading = ref(true);
    const route = useRoute();
    const cocktails = ref([]);
    const filteredCocktail = ref([]);

    const cocktailId = ref(route.params.id);
    onMounted(async () => {
      loading.value = false;
      try {
        cocktails.value = await cocktailService.getAllCocktails();
        filterCocktailsById();
      } catch (error) {
        console.error("Error fetching cocktails:", error);
      }
    });
    const filterCocktailsById = () => {
      console.log(
        cocktails.value,
        "cocktails.value",
        cocktailId.value,
        "cocktailId.value",
      );
      filteredCocktail.value = cocktails.value.filter(
        (cocktail) => cocktail.id === cocktailId.value,
      );
    };

    return {
      cocktail: filteredCocktail,
      loading,
    };
  },
};
</script>

<style lang="scss" scoped>
.mains {
  position: relative;
  z-index: 32;
}
</style>
