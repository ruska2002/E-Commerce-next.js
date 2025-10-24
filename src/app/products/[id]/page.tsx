"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Image from "next/image";
import { useAppDispatch } from "../../../store/store";
import { addToCart } from "../../../store/features/cartSlice";
import style from "./page.module.css";

interface Product {
  id: number;
  title: string;
  price: number;
  description: string;
  image: string;
  rating: {
    rate: number;
    count: number;
  };
}

export default function ProductDetailPage() {
  const { id } = useParams();
  const dispatch = useAppDispatch();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchProduct() {
      try {
        const res = await fetch(`/api/products/${id}`); 
        if (!res.ok) {
          setProduct(null);
          return;
        }
        const data: Product = await res.json();
        setProduct(data);
      } catch (error) {
        console.error("Fetch failed:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchProduct();
  }, [id]);

  if (loading) return <p>Loading...</p>;
  if (!product) return <p>Product not found</p>;

  const handleAdd = () => {
  
    dispatch(addToCart({ ...product, qty: 1 }));
  };

  return (
    <div className={style.productDetail}>
        <div className={style.productImg}>
            <Image src={product.image} alt={product.title} width={300} height={300} />
        </div>
        <div className={style.productInfo}>
            <h1>{product.title}</h1>
            <p className={style.descriptiontext}>{product.description}</p>
            <div className={style.miniInfoDiv}> 
                <div className={style.priceDiv}><p>Price: ${product.price}</p></div>
                <div className={style.countDiv}><p>Count: {product.rating.count}</p></div>
                <div className={style.rateDiv}><p>Rate: {product.rating.rate}<Image src='/star.png' alt="star" width='20' height='20' className={style.statImg}/></p></div>
            </div>
            <div className={style.AddToCart}>
                <button onClick={handleAdd}>Add to Cart</button>
                <Image src='/shopping-cart.png' alt="empty cart png" width='65' height='65'/>
            </div>
        </div>
      </div>
  );
}
