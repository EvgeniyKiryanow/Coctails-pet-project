<template>
  <div>
    <h1 class="title-all-cocktails">All Cocktails</h1>
    <div v-if="loading">Loading...</div>
    <div v-else class="cocktails-list-wrapper">
      <div
        v-for="(cocktail, index) in cocktailsList"
        :key="index"
        class="cocktail-item"
      >
        <CocktailsCard
          :id="cocktail.id"
          :key="cocktail.id"
          :title="cocktail.title"
          :description="cocktail.description"
          :steps-list="cocktail.stepsList"
          :type="'description'"
          @remove-item="handleRemove"
        />
      </div>
    </div>
  </div>
</template>

<script>
import { ref, onMounted } from "vue";
import CocktailsCard from "../assets/components/CocktailsCard.vue";
import { useWebsiteStore } from "../stores/website";
import { cocktailService } from "../services/cocktailService";

export default {
  name: "MainPage",
  components: { CocktailsCard },
  setup() {
    const cocktails = ref([]);
    const website = useWebsiteStore();
    const loading = ref(true);
    website.fetch();

    onMounted(async () => {
      loading.value = false;
      try {
        cocktails.value = await cocktailService.getAllCocktails();
      } catch (error) {
        console.error("Error fetching cocktails:", error);
      }
    });

    const handleRemove = (cocktailId) => {
      const index = website.cocktails.value.findIndex(
        (cocktail) => cocktail.id === cocktailId,
      );
      if (index !== -1) {
        website.cocktails.value.splice(index, 1);
      }
    };

    return {
      cocktailsList: cocktails,
      loading,
      handleRemove,
    };
  },
};
</script>

<style lang="scss" scoped>
.title-all-cocktails {
  padding-top: 15px;
}
.cocktails-list-wrapper {
  display: flex;
  flex-wrap: wrap;
  padding: 15px;
}
.cocktail-item {
  width: 23%;
  padding: 10px;
  box-shadow: 6px 6px 8px black;
  margin: 10px;
  position: relative;
  z-index: 1;
  background: transparent;
}
</style>
