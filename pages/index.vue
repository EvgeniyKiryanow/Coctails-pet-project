<template>
  <div>
    <h1 class="title">All Cocktails</h1>
    <LoaderUi v-if="loading" />
    <!-- <div class="loading" v-if="loading">Loading...</div> -->
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
import LoaderUi from "../assets/components/LoaderUi.vue";
import { cocktailService } from "../services/cocktailService";

export default {
  name: "MainPage",
  components: { CocktailsCard, LoaderUi },
  setup() {
    const cocktails = ref([]);
    const loading = ref(true);

    onMounted(async () => {
      loading.value = false;
      try {
        cocktails.value = await cocktailService.getAllCocktails();
      } catch (error) {
        console.error("Error fetching cocktails:", error);
      }
    });

    const handleRemove = () => {
      // TODO
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
  width: 31%;
  padding: 10px;
  box-shadow: 2px 3px 8px orange;
  margin: 10px;
  position: relative;
  z-index: 1;
  background: transparent;
}
</style>
