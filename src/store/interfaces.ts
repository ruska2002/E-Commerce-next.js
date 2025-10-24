export interface Product{
    id: number;
    title: string;
    price: number;
    image: string;
    rating: {
    rate: number;
    count: number;
  };
}

export interface CartItem{
    id: number;
  title: string;
  price: number;
  description: string;
  image: string;
  qty: number;
  rating: {
    rate: number;
    count: number;
  };
}