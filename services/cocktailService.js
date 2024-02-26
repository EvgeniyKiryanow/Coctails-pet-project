// cocktailService.js

import {
  getFirestore,
  collection,
  addDoc,
  deleteDoc,
  doc,
  updateDoc,
  query,
  where,
  getDocs,
} from "firebase/firestore";
import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: process.env.FIREBASE_API_KEY,
  authDomain: "cocktails-51c9d.firebaseapp.com",
  projectId: "cocktails-51c9d",
  storageBucket: "cocktails-51c9d.appspot.com",
  messagingSenderId: "748466580997",
  appId: process.env.FIREBASE_API_ID,
};
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export const cocktailService = {
  async addCocktail(cocktailData) {
    try {
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
      await deleteDoc(doc(db, "cocktails", cocktailId));
      console.log("Cocktail deleted successfully");
    } catch (error) {
      console.error("Error deleting cocktail: ", error);
      throw new Error("Failed to delete cocktail");
    }
  },

  async updateCocktail(cocktailId, updatedData) {
    try {
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
  // searchCocktailsByName(name, allCocktails) {
  //   try {
  //     const filteredCocktails = allCocktails.filter((cocktail) => {
  //       return cocktail.name.toLowerCase().includes(name.toLowerCase());
  //     });
  //     return filteredCocktails;
  //   } catch (error) {
  //     console.error("Error searching cocktails by name: ", error);
  //     throw new Error("Failed to search cocktails by name");
  //   }
  // },
  searchCocktailsByName(name, allCocktails) {
    try {
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
