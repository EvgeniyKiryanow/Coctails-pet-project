<template>
    <div class="mains">
      <h1>Cocktail Full Description</h1>
      <p>Cocktail ID: {{ $route.params.id }}</p>
      <!-- You can add more content here as needed -->
    </div>
  </template>
  
  <script>
  export default {
    async asyncData({ params }) {
      const cocktailId = params.id;
      // You can fetch cocktail details based on the ID from your API or data source here if needed
      // const cocktailDetails = await fetchCocktailDetails(cocktailId);
      return { cocktailId };
    },
  };
  </script>
  
  <style lang="scss" scoped>
  .mains {
    position: relative;
    z-index:32;
  }
  </style>