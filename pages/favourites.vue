<template>
  <div>
    <h1>Favourites</h1>
    <div v-for="cocktail in filteredCocktails" :key="cocktail.id">
      <ul>
        <li>
          {{ cocktail.ingredients_list }}
          {{ cocktail.name }}
          {{ cocktail.description }}
          {{ cocktail.steps }}
        </li>
      </ul>
      <v-btn
        v-if="cocktail.created_by !== uid"
        color="amber-darken-1"
        @click="handleDeleteFromFavourites(cocktail.id)"
        >Delete from favourites</v-btn
      >
      <v-btn
        v-if="cocktail.created_by === uid"
        color="amber-darken-1"
        @click="handleDelete(cocktail.id)"
        >Delete</v-btn
      >
    </div>
  </div>
</template>

<script>
import { defineComponent, ref, onMounted } from "vue";
import { useRouter } from "vue-router";
import { cocktailService } from "../services/cocktailService";

export default defineComponent({
  setup() {
    const cocktails = ref([]);
    const filteredCocktails = ref([]);
    const uid = ref("");
    const router = useRouter();
    onMounted(async () => {
      try {
        cocktails.value = await cocktailService.getAllCocktails();
        uid.value = localStorage.getItem("uid");
        if (uid.value) {
          await filterCocktailsByUser(uid.value);
        } else {
          console.error("User UID not available in localStorage.");
        }
      } catch (error) {
        console.error("Error fetching cocktails:", error);
      }
    });
    const filterCocktailsByUser = (uid) => {
      try {
        filteredCocktails.value = cocktails.value.filter((cocktail) => {
          // Check if the cocktail was created by the user or is in the user's favorites
          return (
            cocktail.created_by === uid ||
            (cocktail.favourites && cocktail.favourites.includes(uid))
          );
        });
      } catch (error) {
        console.error("Error filtering cocktails:", error);
      }
    };

    const handleDeleteFromFavourites = async (cocktailId) => {
      const foundedCocktail = cocktails.value.filter(
        (cocktail) => cocktail.id === cocktailId,
      );
      const updatedFavourites = removeUidFromFavourites(
        foundedCocktail[0].favourites,
        uid.value,
      );
      foundedCocktail[0].favourites = [...updatedFavourites];
      await cocktailService.updateCocktail(cocktailId, foundedCocktail[0]);
      router.push("/");
    };
    const removeUidFromFavourites = (favourites, uidToRemove) => {
      try {
        return favourites.filter((uid) => uid !== uidToRemove);
      } catch (error) {
        console.error("Error removing uid from favourites:", error);
        return favourites;
      }
    };
    const handleDelete = async (cocktailId) => {
      try {
        await cocktailService.deleteCocktail(cocktailId);
        router.push("/");
      } catch (error) {
        console.error("Error deleting cocktail:", error);
      }
    };

    return {
      filteredCocktails,
      handleDeleteFromFavourites,
      handleDelete,
      uid,
    };
  },
});
</script>
