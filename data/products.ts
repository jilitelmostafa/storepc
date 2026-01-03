
import { Product } from '../types';

export const products: Product[] = [
  {
    id: 1,
    name: "لابتوب نكسوس برو X1",
    nameEn: "Nexus Pro X1",
    description: "لابتوب نحيف جداً بمعالج قوي للأعمال المكتبية والتنقل السريع.",
    price: 4500,
    image: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&q=80&w=800",
    category: 'laptop',
    specs: ["M2 Chip", "16GB RAM", "512GB SSD", "14-inch OLED"]
  },
  {
    id: 2,
    name: "صندوق الألعاب تيتان G9",
    nameEn: "Titan G9 Gaming Desktop",
    description: "أداء خارق للألعاب بدقة 4K مع تبريد مائي متطور وإضاءة مذهلة.",
    price: 8900,
    image: "https://images.unsplash.com/photo-1587831990711-23ca6441447b?auto=format&fit=crop&q=80&w=800",
    category: 'gaming',
    specs: ["RTX 4080", "i9-13900K", "32GB DDR5", "2TB NVMe"]
  },
  {
    id: 3,
    name: "ماكبوك إير M3",
    nameEn: "MacBook Air M3",
    description: "الأناقة والقوة في جهاز واحد مع بطارية تدوم طويلاً وتصميم بلا مراوح.",
    price: 5200,
    image: "https://images.unsplash.com/photo-1541807084-5c52b6b3adef?auto=format&fit=crop&q=80&w=800",
    category: 'laptop',
    specs: ["M3 Chip", "8GB RAM", "256GB SSD", "Liquid Retina"]
  },
  {
    id: 4,
    name: "شاشة ألترا وايد 34",
    nameEn: "UltraWide 34 Monitor",
    description: "تجربة بصرية مذهلة للمصممين واللاعبين بمعدل تحديث عالي.",
    price: 2800,
    image: "https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?auto=format&fit=crop&q=80&w=800",
    category: 'accessory',
    specs: ["3440 x 1440", "144Hz", "IPS Panel", "HDR 400"]
  },
  {
    id: 5,
    name: "لوحة مفاتيح ميكانيكية RGB",
    nameEn: "Mechanical RGB Keyboard",
    description: "سرعة استجابة مذهلة مع إضاءة قابلة للتخصيص ومفاتيح ميكانيكية.",
    price: 450,
    image: "https://images.unsplash.com/photo-1511467687858-23d96c32e4ae?auto=format&fit=crop&q=80&w=800",
    category: 'accessory',
    specs: ["Blue Switches", "PBT Keycaps", "Wired/Wireless"]
  },
  {
    id: 6,
    name: "وورك ستيشن بريسيجن 500",
    nameEn: "Precision 500 Workstation",
    description: "جهاز مكتبي متكامل مخصص للمهندسين والمصممين والمبدعين.",
    price: 12500,
    image: "https://images.unsplash.com/photo-1593640408182-31c70c8268f5?auto=format&fit=crop&q=80&w=800",
    category: 'desktop',
    specs: ["Xeon Silver", "64GB RAM", "Quadro RTX 5000", "4TB SSD"]
  }
];
