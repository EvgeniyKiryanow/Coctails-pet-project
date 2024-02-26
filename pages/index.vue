<template>
  <div>
    <h1 class="title">All Cocktails</h1>
    <LoaderUi v-if="loading" />
    <div v-else>
      <v-row class="filter-wrapper">
        <div class="filter-by-name">
          {{ Date.now() }}
          <v-text-field
            v-model="searchInput"
            label="Cocktail name"
            variant="outlined"
            hide-details
          ></v-text-field>
          <v-btn @click="handleSearchByName">Search</v-btn>
        </div>
        <div class="filter-by-select">
          <v-select
            v-model="filterBy"
            label="Filtered by"
            :items="['Latest', 'Newest']"
            variant="outlined"
          ></v-select>
          <v-btn @click="handleSearchVariant">Search</v-btn>
        </div>
      </v-row>
      <div class="cocktails-list-wrapper">
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
    const searchInput = ref("");
    const filterBy = ref(null);

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

    const handleSearchByName = async () => {
      loading.value = true; // Show loader while searching
      try {
        if (searchInput.value.trim() === "") {
          cocktails.value = await cocktailService.getAllCocktails();
        } else {
          cocktails.value = await cocktailService.searchCocktailsByName(
            searchInput.value.trim(),
            cocktails.value,
          );
        }
      } catch (error) {
        console.error("Error searching cocktails:", error);
      } finally {
        loading.value = false; // Hide loader after search completes
      }
    };

    const handleSearchVariant = () => {
      loading.value = true;
      try {
        if (filterBy.value === "Latest") {
          cocktails.value = cocktails.value.sort(
            (a, b) => b.created_at - a.created_at,
          );
        } else if (filterBy.value === "Newest") {
          cocktails.value = cocktails.value.sort(
            (a, b) => a.created_at - b.created_at,
          );
        }
      } catch (error) {
        console.error("Error filtering cocktails:", error);
      } finally {
        loading.value = false;
      }
    };

    return {
      cocktailsList: cocktails,
      loading,
      handleRemove,
      handleSearchByName,
      searchInput,
      handleSearchVariant,
      filterBy,
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
.filter-wrapper {
  display: flex;
  justify-content: space-between;
  border: 1px solid orange;
  padding: 25px 25px 0 25px;
  margin: 0 10px;
  .filter-by-name {
    align-items: center;
    display: flex;
    height: 100%;
    width: 40%;
    .v-input {
      padding-right: 20px;
    }
  }
  .filter-by-select {
    height: 100%;
    width: 40%;
    display: flex;
  }
}
</style>
