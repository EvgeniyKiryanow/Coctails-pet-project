<template>
  <div class="mains">
    <h1>Cocktail Full Description</h1>
    <p>Cocktail ID: {{ $route.params.id }}</p>
    {{ cocktailDetails }}
    <!-- You can add more content here as needed -->
  </div>
</template>

<script>
export default {
  async asyncData({ params }) {
    console.log(params, 'params');
    // You can fetch cocktail details based on the ID from your API or data source here if needed
    // const cocktailDetails = await fetchCocktailDetails(params.id);
    return { cocktailId: params.id };
  },
  props: {
    // Define the props you expect to receive
    id: {
      type: Number,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: false,
    },
    stepsList: {
      type: Array,
      required: true,
    },
    type: {
      type: String,
      required: false,
    },
  },
  computed: {
    cocktailDetails() {
      // Use the received props as needed
      return {
        id: this.id,
        title: this.title,
        description: this.description,
        stepsList: this.stepsList,
        type: this.type,
      };
    },
  },
};
</script>

<style lang="scss" scoped>
.mains {
  position: relative;
  z-index: 32;
}
</style>
