<template>
  <div class="mains">
    <div v-if="loading">Loading...</div>
    <div v-else>
      <h1>Cocktail Full Description</h1>
      <v-card :title="cocktail.title" :text="cocktail.description">
        <div>
          <ol v-for="(stepList, index) in cocktail.stepsList" :key="index">
            <li>{{ index + ' ' + stepList.step }}</li>
          </ol>
        </div>
      </v-card>
    </div>
  </div>
</template>

<script>
import { ref, onMounted} from "vue";
import { useWebsiteStore } from "../../stores/website";
import { useRoute } from 'vue-router';

export default {
  setup() {
    const website = useWebsiteStore();
    const loading = ref(true);
    const route = useRoute();

    const cocktailId = ref(route.params.id);

    website.fetch();
    onMounted(()=> {
      loading.value = false;
    })

    const getCocktailById = website.getCocktailById(parseInt(cocktailId.value));

    return {
      cocktailslist: website.cocktails,
      cocktail: getCocktailById,
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
