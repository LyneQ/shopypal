export interface Product {
  name: string;
  id: number;
  description: string;
  image: string | null;
  price: number;
  quantityLeft: number;
  category: string;
  promotionPercentage: number | null;
}
