// cocktailService.js
import { inject } from "vue";
import {
  collection,
  addDoc,
  deleteDoc,
  doc,
  updateDoc,
  query,
  where,
  getDocs,
} from "firebase/firestore";

function getDbInstance() {
  const db = inject("db");

  if (!db) {
    throw new Error("DB instance not found. Make sure it's provided.");
  }

  return db;
}

export const cocktailService = {
  async addCocktail(cocktailData) {
    try {
      const db = getDbInstance();
      const docRef = await addDoc(collection(db, "cocktails"), cocktailData);
      console.log("Cocktail added with ID: ", docRef.id);
      return docRef.id;
    } catch (error) {
      console.error("Error adding cocktail: ", error);
      throw new Error("Failed to add cocktail");
    }
  },

  async deleteCocktail(cocktailId) {
    try {
      const db = getDbInstance();
      await deleteDoc(doc(db, "cocktails", cocktailId));
      console.log("Cocktail deleted successfully");
    } catch (error) {
      console.error("Error deleting cocktail: ", error);
      throw new Error("Failed to delete cocktail");
    }
  },

  async updateCocktail(cocktailId, updatedData) {
    try {
      const db = getDbInstance();
      const cocktailDocRef = doc(db, "cocktails", cocktailId);
      await updateDoc(cocktailDocRef, updatedData);
      console.log("Cocktail updated successfully");
    } catch (error) {
      console.error("Error updating cocktail: ", error);
      throw new Error("Failed to update cocktail");
    }
  },

  async getCocktailsByUserId(userId) {
    try {
      const db = getDbInstance();
      const q = query(
        collection(db, "cocktails"),
        where("createdBy", "==", userId),
      );
      const querySnapshot = await getDocs(q);
      const cocktails = [];
      querySnapshot.forEach((doc) => {
        cocktails.push({ id: doc.id, ...doc.data() });
      });
      return cocktails;
    } catch (error) {
      console.error("Error getting cocktails: ", error);
      throw new Error("Failed to fetch cocktails");
    }
  },

  async getAllCocktails() {
    try {
      const db = getDbInstance();
      const querySnapshot = await getDocs(collection(db, "cocktails"));
      const cocktails = [];
      querySnapshot.forEach((doc) => {
        cocktails.push({ id: doc.id, ...doc.data() });
      });
      return cocktails;
    } catch (error) {
      console.error("Error getting all cocktails: ", error);
      throw new Error("Failed to fetch all cocktails");
    }
  },
  searchCocktailsByName(name, allCocktails) {
    try {
      const db = getDbInstance();
      const filteredCocktails = allCocktails.filter((cocktail) => {
        const hasName = cocktail.name
          .toLowerCase()
          .includes(name.toLowerCase());
        const hasIngredients = cocktail.ingredients.some((ingredient) => {
          return ingredient.toLowerCase().includes(name.toLowerCase());
        });
        return hasName || hasIngredients;
      });
      return filteredCocktails;
    } catch (error) {
      console.error("Error searching cocktails by name: ", error);
      throw new Error("Failed to search cocktails by name");
    }
  },
};
