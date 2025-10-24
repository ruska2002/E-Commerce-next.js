'use client'
import Image from 'next/image';
import style from './page.module.css';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useForm, SubmitHandler } from 'react-hook-form';

type FormData = {
  name: string;
  lastName: string;
  email: string;
  cardNumber: string;
  cardholderName: string;
  country: string;
  zipCode: string;
  expiry: string;
  cvv: string;
};

export default function PaymentPage() {
  const { register, setValue ,handleSubmit, formState: { errors } } = useForm<FormData>();
  const [cvv, setCvv] = useState("");
  const [expiry, setExpiry] = useState("");
  const [zipcode, setZipcode] = useState("");
  const [cardNumber, setCardNumber] = useState("");
  const [countries, setCountries] = useState<string[]>(["United States"]);
  const [selectedCountry, setSelectedCountry] = useState<string>("");

  useEffect(() => {
    fetch("https://restcountries.com/v3.1/all")
      .then((res) => res.json())
      .then((data) => {
        if (!Array.isArray(data)) return;
        const sorted = data
          .map((country) => country?.name?.common)
          .filter((name: string | undefined): name is string => !!name)
          .sort((a, b) => a.localeCompare(b));
        setCountries(sorted);
      })
      .catch((error) => console.error("Error fetching countries:", error));
  }, []);

  const onSubmit: SubmitHandler<FormData> = (data) => {
    const cleanCardNumber = data.cardNumber.replace(/\s/g, '');
    console.log("Card number:", cleanCardNumber);
  };

  const formatCardNumber = (value: string) => {
  // remove all non-digits
  const digitsOnly = value.replace(/\D/g, '');
  // limit to 16 digits
  const limited = digitsOnly.slice(0, 16);
  // insert spaces every 4 digits
  const formatted = limited.replace(/(\d{4})(?=\d)/g, '$1 ');
  return formatted;
};
 const formatExpiry = (value: string) => {
  const digitsOnly = value.replace(/\D/g, "");
  const limited = digitsOnly.slice(0, 4); 
  if (limited.length >= 3) {
    return limited.replace(/(\d{2})(\d{1,2})/, "$1/$2"); 
  }
  return limited;
};

const formatZip = (value: string) => {
  const digitsOnly = value.replace(/\D/g, "");
  return digitsOnly.slice(0, 10);
};
const formatCvv = (value: string) => {
  const digitsOnly = value.replace(/\D/g, "");
  return digitsOnly.slice(0, 3); 
};
  return (
    <form className={style.WholePaymentPage} onSubmit={handleSubmit(onSubmit)}>
      <h2>Checkout</h2>
      <div className={style.divpaymentBox}>

        <div className={style.email}>
          <p>Email</p>
          <input type="email" placeholder="Email" {...register("email", {
            required: "Email is required",
            pattern: {
              value: /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/,
              message: "Please enter a valid email (e.g. name@email.com)"
            }
          })} />
          {errors.email && <span>Email is required</span>}
        </div>

        <div className={style.email}>
          <p>Name</p>
          <input type="text" placeholder="Name" {...register("name", { required: true })} />
          <p>Last Name</p>
          <input type="text" placeholder="Last Name" {...register("lastName", { required: true })} />
        </div>

        <p>Payment method</p>
        <div className={style.paymentMethod}>
          <div className={style.paymentIcons}>
            <p>Card</p>
            <div className={style.cardImage}>
              <Image alt="dot icon" src="/rec.png" width={20} height={20} />
              <Image alt="payment icon" src="/atm-card.png" width={30} height={30} />
            </div>
          </div>

          <div className={style.cardInfo}>
            <input 
            type="text" 
            placeholder="0000 0000 0000 0000" 
            {...register("cardNumber", { required: true })} 
            value={cardNumber} 
            onChange={(e) => {
              const formatted = formatCardNumber(e.target.value) 
              setCardNumber(formatted)}} maxLength={19}/>
            <div className={style.cardIcons}>
              <Image alt="visa" src="/visa.png" width={30} height={30} />
              <Image alt="creditcard" src="/credit-card.png" width={30} height={30} />
              <Image alt="paypal" src="/paypal.png" width={30} height={30} />
            </div>
          </div>

          <div className={style.extraInfo}>
            <input
              type="text"
              placeholder="MM/YY"
              {...register("expiry", { required: true })}
              value={expiry}
              onChange={(e) => setExpiry(formatExpiry(e.target.value))}
              maxLength={5}
            />
            <input
              type="text"
              placeholder="CVC"
              {...register("cvv", { required: true })}
              value={cvv}
              onChange={(e) => setCvv(formatCvv(e.target.value))}
              maxLength={4}
            />
          </div>

          <p>Cardholder Name</p>
          <input type="text" placeholder="Cardholder Name" {...register("cardholderName", { required: true })} />

          <p>Country or Region</p>
          <select {...register("country", { required: true })} value={selectedCountry} onChange={(e) => setSelectedCountry(e.target.value)}>
            <option value="">Select your country</option>
            {countries.map((country) => (
              <option key={country} value={country}>{country}</option>
            ))}
          </select>

          <input
          type="text"
          placeholder="ZIP code"
          value={zipcode} 
          {...register("zipCode", { required: true })}
          onChange={(e) => {
            const formatted = formatZip(e.target.value);
            setZipcode(formatted); 
            setValue("zipCode", formatted);
          }}
         />
          <button type="submit" className={style.payNowButton}>
            <Link href="/cart/payment/order">Pay Now</Link>
          </button>
        </div>
      </div>
    </form>
  );
}
