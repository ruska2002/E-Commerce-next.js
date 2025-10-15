import style from "./page.module.css";


export default function Home() {
  return (
    <div className={style.homePage}>
      <p>Welcome to MyStore! Discover the best products at amazing prices.</p>
      <button><a href="/products">SHOP NOW!</a></button>
    </div>
  );
}
