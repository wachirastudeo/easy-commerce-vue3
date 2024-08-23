import { defineStore } from "pinia";
import {
    collection,
    getDocs,
    doc,
    addDoc,
    getDoc,
    setDoc,
    deleteDoc,
    query,
} from "firebase/firestore";
import { db } from "@/firebase";

export const useProductStore = defineStore("product", {
    state: () => ({
        list: [],
        loaded: false,
    }),
    actions: {
        async loadProduct() {
            const productCol = collection(db, "products");
            const productSnapShot = await getDocs(productCol);
            const products = productSnapShot.docs.map((doc) => {
                const convertedProduct = doc.data();
                convertedProduct.productId = doc.id;
                convertedProduct.updatedAt = convertedProduct.updatedAt.toDate();
                return convertedProduct;
            });

            this.list = products;
        },
        async getProduct(productId) {
            // return this.list[index];
            try {
                const productRef = doc(db, "products", productId);
                const productSnapshot = await getDoc(productRef);
                return productSnapshot.data;
            } catch (error) { }
        },
        async addProduct(productData) {
            productData.remainQuantity = productData.quantity;
            productData.updatedAt = new Date();
            try {
                const productCol = collection(db, "products");
                await addDoc(productCol, productData);
            } catch (error) {
                console.log("error", error);
            }
        },
        async updateProduct(productId, productData) {
            const updateProduct = {};
            updateProduct.name = productData.name;
            updateProduct.imageUrl = productData.imageUrl;
            updateProduct.quantity = productData.quantity;
            updateProduct.remainQuantity = productData.quantity;
            updateProduct.status = productData.status;
            updateProduct.updatedAt = new Date();
            const productRef = doc(db, "products", productId);
            await setDoc(productRef, updateProduct);


        },
        async removeProduct(productId) {
            const productRef = doc(db, "products", productId);
            await deleteDoc(productRef, productId);
            // save to localstorage
        },
    },
});
