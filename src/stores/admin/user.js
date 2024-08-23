import { defineStore } from 'pinia';
import { db } from '@/firebase';
import {
    collection,
    getDocs,
    doc,
    getDoc,
    setDoc
} from 'firebase/firestore';

export const useUserStore = defineStore('user', {
    state: () => ({
        list: []
    }),
    actions: {
        // load user form database collection users
        async looadUser() {
            const userCol = collection(db, 'users');
            const userSnapShot = await getDocs(userCol);
            const userList = userSnapShot.docs.map(doc => {
                return doc.data();
            });

            console.log(userList);
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