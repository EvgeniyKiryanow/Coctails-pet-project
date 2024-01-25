<template>
    <div>
      <h1>All Coctails</h1>
      <div class="cocktails-list-wrapper">
        <div class="cocktail-item" v-for="(cocktail, index) in cocktailsList" :key="index">
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
  import { ref } from 'vue';
  
  export default {
    name: "MainPage",
    components: { CocktailsCard },
    setup() {
      const cocktailsList = ref([
        { title: "First cocntails", description: "First description", stepsList: ["1", "2", "3", "4"], id: 1 },
        { title: "Second cocntails", description: "Second description", stepsList: ["11", "22", "33", "44"], id: 2 },
        { title: "3 cocntails", description: "3 description", stepsList: ["14", "32", "23", "14"], id: 3 },
        { title: "3 cocntails", description: "3 description", stepsList: ["14", "32", "23", "14"], id: 4 },
        { title: "3 cocntails", description: "3 description", stepsList: ["14", "32", "23", "14"], id: 5 },
        { title: "3 cocntails", description: "3 description", stepsList: ["14", "32", "23", "14"], id: 6 },
        { title: "3 cocntails", description: "3 description", stepsList: ["14", "32", "23", "14"], id: 7 },
      ]);
  
      const handleRemove = (cocktailId) => {
        const index = cocktailsList.value.findIndex((cocktail) => cocktail.id === cocktailId);
        if (index !== -1) {
          cocktailsList.value.splice(index, 1);
        }
      };
  
      return {
        cocktailsList,
        handleRemove,
      };
    },
  };
  </script>
  
  <style lang="scss" scoped>
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
  }
  </style>
  