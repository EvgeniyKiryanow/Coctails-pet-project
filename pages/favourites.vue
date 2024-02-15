<template>
  <div>
    <h1>Favourites</h1>
    <ul>
      <li v-for="cocktail in filteredCocktails" :key="cocktail.id">
        {{ cocktail.name }}
        {{ cocktail.description }}
        {{ cocktail.steps }}
      </li>
    </ul>
  </div>
</template>

<script>
import { defineComponent, ref, onMounted } from "vue";
import { cocktailService } from "../services/cocktailService";
import { useUserAuthDataStore } from "@/stores/auth";

export default defineComponent({
  setup() {
    const cocktails = ref([]);
    const userAuthStore = useUserAuthDataStore();
    const userUid = userAuthStore.user.uid || null;
    const filteredCocktails = ref([]);

    // Load cocktails when the component is mounted
    onMounted(async () => {
      try {
        cocktails.value = await cocktailService.getAllCocktails();
        filterCocktailsByUserUid();
      } catch (error) {
        console.error("Error fetching cocktails:", error);
      }
    });
    const filterCocktailsByUserUid = () => {
      if (userUid) {
        filteredCocktails.value = cocktails.value.filter(
          (cocktail) => cocktail.created_by === userUid,
        );
      } else {
        filteredCocktails.value = [];
      }
    };

    return {
      filteredCocktails,
    };
  },
});
</script>
