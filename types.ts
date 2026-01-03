
export interface Product {
  id: number;
  name: string;
  nameEn: string;
  description: string;
  price: number;
  image: string;
  category: 'laptop' | 'desktop' | 'gaming' | 'accessory';
  specs: string[];
}

export interface CartItem extends Product {
  quantity: number;
}

export interface ChatMessage {
  role: 'user' | 'model';
  text: string;
}
