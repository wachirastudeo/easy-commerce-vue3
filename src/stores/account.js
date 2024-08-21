import { defineStore } from 'pinia';
import { auth } from '@/firebase';

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
        user: {}
    }),
    actions: {
        async checkAuthState() {
            return new Promise((resolve) => {
                onAuthStateChanged(auth, (user) => {
                    if (user) {
                        this.user = user;
                        this.isLoggedIn = true;
                        if (this.user.email === 'admin@test.com') {
                            this.isAdmin = true;
                        }
                        resolve(true);
                    } else {
                        resolve(false);
                    }
                });
            });
        },
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