<template>
  <div>
    <h1 class="title-all-cocktails">All Cocktails</h1>
    <div v-if="loading">Loading...</div>
    <div v-else class="cocktails-list-wrapper">
      <div
        class="cocktail-item"
        v-for="(cocktail, index) in cocktailsList"
        :key="index"
      >
        <CocktailsCard
          :key="cocktail.id"
          :id="cocktail.id"
          :title="cocktail.title"
          :description="cocktail.description"
          :stepsList="cocktail.stepsList"
          :type="'description'"
          @remove-item="handleRemove"
        />
      </div>
    </div>
  </div>
</template>

<script>
import CocktailsCard from "../assets/components/CocktailsCard.vue";
import { ref, onMounted } from "vue";
import { useWebsiteStore } from "../stores/website";

export default {
  name: "MainPage",
  components: { CocktailsCard },
  setup() {
    const website = useWebsiteStore();
    const loading = ref(true);
    website.fetch();

    onMounted(() => {
      loading.value = false;
    });

    const handleRemove = (cocktailId) => {
      const index = website.cocktails.value.findIndex(
        (cocktail) => cocktail.id === cocktailId
      );
      if (index !== -1) {
        website.cocktails.value.splice(index, 1);
      }
    };

    return {
      cocktailsList: website.cocktails,
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
