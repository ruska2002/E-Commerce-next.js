import style from "./page.module.css";
import Link from "next/link";


export default function Home() {
  return (
    <div className={style.homePage}>
      <p>Welcome to MyStore! Discover the best products at amazing prices.</p>
      <button><Link href="/products">SHOP NOW!</Link></button>
    </div>
  );
}
