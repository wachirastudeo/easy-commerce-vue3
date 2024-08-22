import { defineStore } from 'pinia';
// ทำการ import firestore เพิ่มเข้ามา
import { doc, getDoc, setDoc } from 'firebase/firestore';

// ทำการเพิ่ม db สำหรับเขียนข้อมูลเข้ามา
import { db, auth } from '@/firebase';

import {
    GoogleAuthProvider,
    onAuthStateChanged,
    signInWithPopup,
    signOut, signInWithEmailAndPassword
} from 'firebase/auth';


// ระบุ social provider ที่จะใช้ login
const provider = new GoogleAuthProvider();

export const useAccountStore = defineStore('account', {
    state: () => ({
        isLoggedIn: false,
        isAdmin: false,
        user: {},
        profile: {}
    }),
    actions: {
        async checkAuthState() {
            return new Promise((resolve) => {

                onAuthStateChanged(auth, async (user) => {
                    try {
                        if (user) {
                            this.user = user;
                            this.isLoggedIn = true;
                            // เพิ่มการอ้างอิงถึง collection users, document id 
                            const docRef = doc(db, 'users', user.uid);
                            console.log(docRef);
                            const docSnap = await getDoc(docRef);

                            // ถ้าข้อมูลไม่มีอยู่ = เขียนข้อมูลเข้าไปใหม่
                            if (!docSnap.exists()) {
                                const userData = {
                                    name: user.displayName,
                                    role: 'member',
                                    status: 'active',
                                    updatedAt: new Date()
                                };
                                await setDoc(docRef, userData);
                                this.profile = userData;
                            } else {
                                this.profile = docSnap.data();
                            }
                            if (this.profile.role !== 'member') {
                                this.isAdmin = true;
                            }
                            resolve(true);
                        } else {
                            resolve(false);
                        }
                    } catch (error) {
                        console.log('error', error);
                        resolve(false);
                    }
                });
            });

        },
        // async checkAuthState() {
        //     return new Promise((resolve) => {
        //         onAuthStateChanged(auth, async (user) => {
        //             try {
        //                 if (user) {
        //                     this.user = user;
        //                     this.user = user;
        //                     this.isLoggedIn = true;
        //                     // เพิ่มการอ้างอิงถึง collection users, document id 
        //                     const docRef = doc(db, 'users', user.uid);






        //                     if (this.user.email === 'admin@gmail.com') {
        //                         this.isAdmin = true;
        //                     }
        //                     this.isLoggedIn = true;
        //                     // member first login create user

        //                     resolve(true);
        //                 } else {
        //                     resolve(false);
        //                 }
        //             } catch (error) {

        //             }

        //         });
        //     });
        // },
        async signInWithGoogle() {
            try {
                const result = await signInWithPopup(auth, provider);
                this.user = result.user;
                this.isLoggedIn = true;

            } catch (error) {

            }

        },
        async singInWithAdmin(email, password) {
            try {
                const result = await signInWithEmailAndPassword(auth, email, password);
                this.isLoggedIn = true;
                this.isAdmin = true;

                this.user = result.user;

            } catch (error) {
                console.log('error', error);
                switch (error.code) {
                    case 'auth/invalid-email':
                        throw new Error('Email ไม่ถูกต้อง');
                    case 'auth/wrong-password':
                        throw new Error('Wrong password');
                    default:
                        throw new Error('Login invalid');
                }


            }
        },
        async logout() {

            this.isLoggedIn = false;

            this.isAdmin = false;
            await signOut(auth);

        }
    }

});