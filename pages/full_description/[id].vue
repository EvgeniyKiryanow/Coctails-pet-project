<template>
  <div class="cocktails-full">
    <h1 class="title">Cocktail Full Description</h1>
    <LoaderUi v-if="loading" />
    <div v-else>
      <div>
        <v-card
          v-if="cocktail.length > 0"
          :title="cocktail[0].title || cocktail[0].name"
          :text="cocktail[0].description"
        >
          <v-card-text class="title-steps">Steps :</v-card-text>
          <div class="steps-wrapper">
            <ol>
              <li v-for="(stepList, index) in cocktail[0].steps" :key="index">
                <span>{{ index + 1 }}</span> {{ stepList.step }}
              </li>
            </ol>
          </div>
        </v-card>
      </div>
      <div class="button-wrapper">
        <NuxtLink to="/"
          ><v-btn color="amber-darken-1">Back to home Page</v-btn></NuxtLink
        >
        <v-btn color="amber-darken-1">Edit</v-btn>
        <v-btn color="amber-darken-1">Add</v-btn>
        <v-btn color="amber-darken-1">Delete</v-btn>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, onMounted } from "vue";
import { useRoute } from "vue-router";
import { cocktailService } from "../services/cocktailService";
import LoaderUi from "../assets/components/LoaderUi.vue";

export default {
  components: { LoaderUi },
  setup() {
    const loading = ref(true);
    const route = useRoute();
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

    return {
      cocktail: filteredCocktail,
      loading,
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
  .steps-wrapper {
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
