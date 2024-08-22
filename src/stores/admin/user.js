import { defineStore } from 'pinia';
import { db } from '@/firebase';
import { doc, collection, getDoc, getDocs, setDoc } from 'firebase/firestore';

export const useUserStore = defineStore('user', {
    state: () => ({
        list: []
    }),
    actions: {
        async looadUser() {
            const userCol = collection(db, 'users');
            const userSnapShot = await getDocs(userCol);
            console.log(userSnapShot);
        },
        getUser(index) {
            return this.list[index];
        },
        updateUser(index, userData) {
            this.list[index].name = userData.name;
            this.list[index].status = userData.status;
            this.list[index].role = userData.role;
            this.list[index].updatedAt = (new Date()).toLocaleString();
        },
        removeUser(index) {
            this.list.splice(index, 1);
        }
    }
});