"use client";

import { useEffect, useState } from "react";
import Image from 'next/image';
import styles from './page.module.css';



interface Product {
  id: number;
  title: string;
  price: number;
  description: string;
  image: string;
}

export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

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

  if (loading) return <Image className={styles.loading} src="/loading.gif" alt="Loading..." width={200} height={200} />;

  return (
    <div className={styles.productsPage}>
      <p>View all products</p>
      <div className={styles.cards}>
        {products.map((product: Product) => (
        <div className={styles.card} key={product.id}>
          <Image src={product.image} alt={product.title} width={200} height={200} />
          <h3>${product.price}</h3>
          <h3>{product.title}</h3>
          <button className={styles.buyButton}>buy now</button>
        </div>
      ))}</div>
    </div>
  );
}
