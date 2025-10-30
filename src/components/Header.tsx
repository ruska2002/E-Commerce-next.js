"use client";
import { useSelector } from "react-redux";
import Link from "next/link";
import { RootState } from "@/store/store";

export default function Header() {  
  const totalQuantity = useSelector((state: RootState) =>
    state.cart.cartItems.reduce((total, item) => total + item.qty, 0)
  );

  return (
    <header>
      <Link href="/">MyStore</Link>
      <nav className="navbar">
        <Link href="/">Home</Link>
        <Link href="/products">Products</Link>
        <Link href="/cart" className="cartIcon">
          {totalQuantity > 0 && (
            <div className="CartIcon">{totalQuantity}</div>
          )}
          <span className="icon">Cart 🛒</span>
        </Link>
      </nav>
    </header>
  );
}

