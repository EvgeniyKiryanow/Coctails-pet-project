import { defineStore } from "pinia";

interface Cocktail {
  title: string;
  description: string;
  stepsList: string[];
  id: number;
}

interface WebsiteState {
  cocktails: Cocktail[];
}

export const useWebsiteStore = defineStore("websiteStore", {
  state: (): WebsiteState => ({
    cocktails: [],
  }),
  actions: {
     fetch() {
      // TODO: Use fetch to get data from an API
      // const infos = await $fetch('https://api.nuxt.com/modules/pinia');

      // Sample data for demonstration purposes
      const fetchedCocktails: Cocktail[] = [
        {
          title: "First cocntails",
          description: "First description",
          stepsList: ["1", "2", "3", "4"],
          id: 1,
        },
        {
          title: "Second cocntails",
          description: "Second description",
          stepsList: ["11", "22", "33", "44"],
          id: 2,
        },
        {
          title: "3 cocntails",
          description: "3 description",
          stepsList: ["14", "32", "23", "14"],
          id: 3,
        },
        {
          title: "3 cocntails",
          description: "3 description",
          stepsList: ["14", "32", "23", "14"],
          id: 4,
        },
        {
          title: "3 cocntails",
          description: "3 description",
          stepsList: ["14", "32", "23", "14"],
          id: 5,
        },
        {
          title: "3 cocntails",
          description: "3 description",
          stepsList: ["14", "32", "23", "14"],
          id: 6,
        },
        {
          title: "3 cocntails",
          description: "3 description",
          stepsList: ["14", "32", "23", "14"],
          id: 7,
        },
        {
          title: "3 cocntails",
          description: "3 description",
          stepsList: ["14", "32", "23", "14"],
          id: 8,
        },
        {
          title: "3 cocntails",
          description: "3 description",
          stepsList: ["14", "32", "23", "14"],
          id: 9,
        },
        {
          title: "3 cocntails",
          description: "3 description",
          stepsList: ["14", "32", "23", "14"],
          id: 10,
        },
        {
          title: "3 cocntails",
          description: "3 description",
          stepsList: ["14", "32", "23", "14"],
          id: 11,
        },
        {
          title: "3 cocntails",
          description: "3 description",
          stepsList: ["14", "32", "23", "14"],
          id: 12,
        },
        {
          title: "3 cocntails",
          description: "3 description",
          stepsList: ["14", "32", "23", "14"],
          id: 13,
        },
      ];

      // Update the cocktails array in the state
      this.updateCocktails(fetchedCocktails);
    },

    updateCocktails(cocktails: Cocktail[]) {
      // Use Pinia's `this.$state` to update the state
      this.$state.cocktails = cocktails;
    },
  },
});
