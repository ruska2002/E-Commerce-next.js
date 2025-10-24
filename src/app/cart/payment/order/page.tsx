import Link from 'next/link';
import style from './page.module.css';

export default function PaymentPage() {
    return(
    <div className={style.thankYouBox}>
      <div className={style.modalContent}>
        <h2>Thank You for Your Purchase!</h2>
        <p>Your order has been successfully processed.</p>
        <button><Link href="/">Close</Link></button>
      </div>
    </div>)
}