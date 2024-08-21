import { defineStore } from 'pinia';


export const useCartStore = defineStore('cart', {
    state: () => ({
        items: [],
        checkout: {}
    }),
    actions: {
        loadCart() {
            const previousCart = localStorage.getItem('cart-data');
            if (previousCart) {
                this.items = JSON.parse(previousCart);
            }
        },
        addTocart(productData) {

            const findProductIndex = this.items.findIndex(item => {
                return item.name === productData.name;
            });

            if (findProductIndex < 0) {
                productData.quantity = 1;
                this.items.push(productData);
            } else {
                const currentItem = this.items[findProductIndex];
                this.updateQuantity(findProductIndex, currentItem.quantity + 1);

            }


            localStorage.setItem('cart-data', JSON.stringify(this.items));


        },
        updateQuantity(index, quantity) {
            this.items[index].quantity = parseInt(quantity, 10);
            localStorage.setItem('cart-data', JSON.stringify(this.items));
        },
        removeItemCart(index) {
            this.items.splice(index, 1);
            localStorage.setItem('cart-data', JSON.stringify(this.items));

        },
        placeorder(checkoutData) {
            const checkout = {
                ...checkoutData,
                totalPrice: this.summaryPrice,
                paymentMethod: 'Credit Card',
                createdAt: (new Date()).toLocaleString(),
                orderNumber: `AA${(Math.floor(Math.random() * 900000) + 100000).toString()}`,
                products: this.items
            };
            localStorage.setItem('checkout-data', JSON.stringify(checkout));
        },
        loadCheckout() {
            const checkoutData = localStorage.getItem('checkout-data');
            if (checkoutData) {
                this.checkout = JSON.parse(checkoutData);
            }
        }
    },
    getters: {
        summaryQuantity: (state) => {
            return state.items.reduce((total, item) => total + item.quantity, 0);
        },
        summaryPrice: (state) => {
            return state.items.reduce((total, item) => total + (item.price * item.quantity), 0);
        }
    }
});
