import { defineStore } from 'pinia';

// import library Firestore
import { collection, getDocs } from 'firebase/firestore/lite';

// import db ตัวแทนของ Firestore
import { db } from '@/firebase';

export const useProductStore = defineStore('user-product', {
  state: () => ({
    list: [],
    loaded: false
  }),
  actions: {
    async loadProduct() {
      // เปลี่ยนมาดึงจาก collection
      const productsCol = collection(db, 'products');
      const productSnapshop = await getDocs(productsCol);
      const productList = productSnapshop.docs.map(doc => doc.data());
      if (productList && productList.length > 0) {
        // นำแทนกลับไปใส่ list แทน
        this.list = productList;
      }
      this.loaded = true;
    },
    filterProducts(searchName) {
      if (!this.loaded) {
        this.loadProduct();
      }
      return this.list.filter(product => product.name.includes(searchName));
    }
  }
});