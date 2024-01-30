<template>
  <div class="mains">
    <div v-if="loading">Loading...</div>
    <div v-else>
      <div v-for="(cocktail, index) in cocktailslist"
        :key="index">
        <div v-if="parseInt(cocktail.id) === parseInt(cocktailId)">
          <h1>Cocktail Full Description</h1>
          <p>{{ cocktail.title }}</p>
          <p>{{ cocktail.description }}</p>
          <p>{{ cocktail.stepsList }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, onMounted, computed } from "vue";
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

    return {
      cocktailslist: website.cocktails,
      cocktailId,
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
