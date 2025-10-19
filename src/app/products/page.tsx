"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { useDispatch } from "react-redux";
import { addToCart } from "../../store/features/cartSlice";
import styles from "./page.module.css"



interface Product {
  id: number;
  title: string;
  price: number;
  image: string;
}

export default function ProductsPage() {
 const dispatch = useDispatch();
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

const handleAdd = (product: Product) => {
    dispatch(addToCart(product)); 
  };



  useEffect(() => {
    async function fetchProducts() {
      try {
        const res = await fetch("/api/products");
        const data = await res.json();
        setProducts(data);
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchProducts();
  }, []);

  if (loading) return <p>Loading...</p>;

  return (
    <div className={styles.productsPage}>
      <p>View all products</p>
      <div className={styles.cards}>
        {products.map((product) => (
          <div key={product.id} className={styles.card}>
            <Image src={product.image} alt={product.title} width={150} height={150} />
               <h3>${product.price}</h3>
            <h3>{product.title}</h3>
            <button onClick={() => handleAdd(product)}>Add to Cart</button>
          </div>
        ))}
      </div>
    </div>
  );
}
