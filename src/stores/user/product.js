import { defineStore } from 'pinia';
import { collection, query, getDocs } from "firebase/firestore";
import { db } from '@/firebase';
export const useProductStore = defineStore('user-product', {
  state: () => ({
    list: [],
    loaded: false
  }),
  actions: {
    async loadProduct() {
      let productsCol = query(collection(db, 'products'));
      const productSnapshot = await getDocs(productsCol);
      const products = productSnapshot.docs.map(doc => doc.data());

      if (products.length > 0) {
        this.list = products;
        this.loaded = true;
      }
    },
    filterProducts(searchName) {
      if (!this.loaded) {
        this.loadProduct();
      }
      return this.list.filter(product => product.name.includes(searchName));
    }
  }
});