export interface Product{
    id: number;
    title: string;
    price: number;
    image: string;
}

export interface CartItem{
    product: Product;
    qty: number
}