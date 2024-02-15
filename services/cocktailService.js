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
import { useFirebaseAuth } from "../../../composables/useFirebaseAuth";
// id UKlYINkIZGCakvyCTZ7M
const db = getFirestore();

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
};
