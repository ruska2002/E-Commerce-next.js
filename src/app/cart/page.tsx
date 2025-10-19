"use client";

import style from './page.module.css'


export default function CartPage() {
    return(<div>
        <div className={style.cartTitle}><h2>Your Cart (4 items)</h2></div>
        <div className={style.cartContainer}>
            <div className={style.cartAbout}>
                <p>Item</p>
                <div className={style.cartAbout2}>  <p>Price</p>
                <p>Quantity</p>
                <p>Total</p></div>
            </div>
            <hr className={style.Hr} />
            <div>
            </div>
        </div>
    </div>)
}