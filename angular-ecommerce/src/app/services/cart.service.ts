import { Injectable } from '@angular/core';
import { CartItem } from '../common/cart-item';
import { Subject } from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class CartService {
    cartItems: CartItem[] = [];

    totalPrice: Subject<number> = new Subject<number>();
    totalQuantity: Subject<number> = new Subject<number>();

    constructor() {}

    addToCart(theCartItem: CartItem) {
        // check if we already have the item in out cart
        let alreadyExistsInCart: boolean = false;
        let existingCartItem: CartItem = undefined;

        if (this.cartItems.length > 0) {
            for (let item of this.cartItems) {
                if (item.id === theCartItem.id) {
                    existingCartItem = theCartItem;
                    break;
                }
            }
        }

        // check if we found it
        alreadyExistsInCart = existingCartItem !== undefined;

        if (alreadyExistsInCart) {
            existingCartItem.quantity++;
        } else {
            //add new cart item
            this.cartItems.push(theCartItem);
        }

        //compute cart total price and total quantity
        this.computeCartTotals();
    }
    computeCartTotals() {
        let totalPriceValue: number = 0;
        let totalQuantityValue: number = 0;

        for (let item of this.cartItems) {
            totalPriceValue += item.quantity * item.unitPrice;
            totalQuantityValue += item.quantity;
        }

        //publish the new value ... all subscribers will receive the new data
        this.totalPrice.next(totalPriceValue);
        this.totalQuantity.next(totalQuantityValue);

        ///log cart data just for debugging
        this.logCartData(totalPriceValue, totalQuantityValue);
    }
    logCartData(totalPriceValue: number, totalQuantityValue: number) {
        console.log('Contents of cart');
        for (let item of this.cartItems) {
            const subTotalPrice = item.quantity * item.unitPrice;
            console.log(
                `name: ${item.name}, quantity: ${item.quantity}, unitPrice: ${item.unitPrice}, subTotalPrice: ${subTotalPrice}`
            );
        }

        console.log(`totalPrice: ${totalPriceValue.toFixed(2)}, totalQuantity: ${totalQuantityValue}`);
        console.log('--------');


    }
}
