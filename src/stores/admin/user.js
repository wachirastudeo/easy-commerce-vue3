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
        async loadUser() {
            const userCol = collection(db, 'users');
            const userSnapShot = await getDocs(userCol);
            const userList = userSnapShot.docs.map(doc => {
                let converttedUser = doc.data();
                converttedUser.uid = doc.id;
                converttedUser.updatedAt = converttedUser.updatedAt.toDate();
                return converttedUser;
            });



            console.log(userList);
            this.list = userList;
        },
        async getUser(uid) {
            try {
                const docRef = doc(db, 'users', uid);
                const docSnap = await getDoc(docRef);
                return docSnap.data();
            } catch (error) {
                console.log('error', error);
            }
        },
        async updateUser(userUid, userData) {
            try {
                let updatedUser = {
                    name: userData.name,
                    status: userData.status,
                    role: userData.role,
                    updatedAt: new Date()
                };
                const docRef = doc(db, 'users', userUid);
                await setDoc(docRef, updatedUser);
            } catch (error) {
                console.log('error', error);
            }
        },
        removeUser(index) {
            this.list.splice(index, 1);
        }
    }
});