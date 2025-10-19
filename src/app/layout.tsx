"use client"
import { Provider } from "react-redux";
import "./globals.css";
import Link from "next/link";
import { store } from "@/store/store";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
      <Provider store={store}>
          <header>
            <Link href="/">MyStore</Link>
            <nav className="navbar">
              <Link href="/">Home</Link>
              <Link href="/products">Products</Link>
              <Link className="cart" href="/cart">Cart 🛒</Link>
            </nav>
          </header>

          <main>{children}</main>
          <footer>© 2025 All rights reserved.</footer>
        </Provider>
      </body>
    </html>
  );
}
