"use client";
import style from './page.module.css';
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../store/store";
import { addToCart, decrement, initializeCart, removeFromCart } from "../../store/features/cartSlice";
import { useEffect } from "react";
import Image from "next/image";
import Link from 'next/link';


export default function CartPage() {
  const cartItems = useSelector((state: RootState) => state.cart.cartItems);
  const totalPrice = useSelector((state: RootState) => 
    state.cart.cartItems.reduce((total, item) => total + item.qty * item.price, 0)
  );
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(initializeCart());
  }, [dispatch]);


  return (
    <div className={style.cartPage}>
      <h2>Your Cart ({cartItems.length} items)</h2>

      <div className={style.cartTopBox}>
        <div className={style.cartHeader}>
          <span>Item</span>
          <span>Price</span>
          <span>Quantity</span>
          <span>Total</span>
          <span>Remove</span>
        </div>
        <hr className={style.hr} />

        <div className={style.cartItems}>
          {cartItems.map((item) => (
            <div key={item.id} className={style.cartRow}>
              <div className={style.itemColumn}>
                <Image src={item.image} alt={item.title} width={80} height={80}/>
                <div className={style.itemInfo}>
                  <p className={style.itemTitle}>{item.title}</p>  
                </div>
              </div>

              <div className={style.priceColumn}>${item.price.toFixed(2)}</div>
              <div className={style.qtyColumn}>
                <button onClick={() => dispatch(decrement(item.id))}>-</button>
                <span>{item.qty}</span>
                <button onClick={() => dispatch(addToCart({ ...item, qty: 1 }))}>+</button>

              </div>
              <div className={style.totalColumn}>${(item.price * item.qty).toFixed(2)}</div>
              <div className={style.removeColumn}>
                <button onClick={() => dispatch(removeFromCart(item.id))}>❌</button>
              </div>
            </div>
          ))}
        </div>
      </div>
      
      {cartItems.length > 0 && <div className={style.priceBox}>
        <div className={style.cartFooter}>
          <span>Subtotal:</span>
          <span>${totalPrice.toFixed(2)}</span>
        </div>
        <hr className={style.hrMini} />
        <div className={style.cartFooter}>
          <span>Sales Tax:</span>
          <span>$100</span>
        </div>
        <hr className={style.hrMini} />
        <div className={style.cartFooter}>
          <span>Coupon Code:</span>
          <span className={style.addCoupon}>Add Coupon</span>
        </div>
        <hr className={style.hrMini} />
        <div className={style.grandTotal}>
          <span>Grand Total:</span>
          <h1>${(totalPrice + 100).toFixed(2)}</h1>
        </div>
        <hr className={style.hrMini} />
        <div className={style.checkOut}>
          <div className={style.shippinglogo}>
            <p className={style.shippingText}>Congrats, you are eligible for <strong>free shipping</strong></p> <Image src="/delivery.png" alt="shipping" width={40} height={40} />
            <div>
              <button className={style.checkout}><Link href="/cart/payment">Proceed to Checkout</Link></button>
            </div>
          </div>
        </div>
      </div>
      }
    </div>
  );
}
