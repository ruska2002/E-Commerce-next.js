"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { useAppDispatch } from "./../../store/store";
import { addToCart } from "../../store/features/cartSlice";
import styles from "./page.module.css";
import { useRouter } from "next/navigation";
import { Product } from '../../store/interfaces';

export default function ProductsPage() {
  const router = useRouter()
  const dispatch = useAppDispatch();
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  const handleAdd = (product: Product) => {
  dispatch(addToCart({
    id: product.id,
    title: product.title,
    price: product.price,
    description: "", 
    image: product.image,
    qty: 1,
    rating: product.rating,
  }));
};



   const handleClick = (id: number) => {
    router.push(`/products/${id}`); 
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

  if (loading)
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "80vh",
      }}
    >
      <Image
        src="/loading.gif"
        alt="loading gif"
        width={100}
        height={100}
      />
    </div>
  );


  return (
    <div className={styles.productsPage}>
      <p>View all products</p>
      <div className={styles.cards}>
        {products.map((product) => (
          <div key={product.id} className={styles.card} onClick={() => handleClick(product.id)} 
            style={{ cursor: "pointer" }}>
            <Image
              src={product.image}
              alt={product.title}
              width={150}
              height={150}
            />
            <h3>${product.price}</h3>
            <h3>{product.title}</h3>
            <button
              onClick={(e) => {
                e.stopPropagation();
                handleAdd(product);
              }}
            >Add to Cart</button>
          </div>
        ))}
      </div>
    </div>
  );
}
