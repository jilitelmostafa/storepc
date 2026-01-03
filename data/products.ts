
import { Product } from '../types';

export const products: Product[] = [
  {
    id: 1,
    name: "لابتوب نكسوس برو X1",
    nameEn: "Nexus Pro X1",
    description: "لابتوب نحيف جداً بمعالج قوي للأعمال المكتبية والتنقل.",
    price: 4500,
    image: "https://picsum.photos/seed/laptop1/600/400",
    category: 'laptop',
    specs: ["M2 Chip", "16GB RAM", "512GB SSD", "14-inch OLED"]
  },
  {
    id: 2,
    name: "صندوق الألعاب تيتان G9",
    nameEn: "Titan G9 Gaming Desktop",
    description: "أداء خارق للألعاب بدقة 4K مع تبريد مائي متطور.",
    price: 8900,
    image: "https://picsum.photos/seed/pc1/600/400",
    category: 'gaming',
    specs: ["RTX 4080", "i9-13900K", "32GB DDR5", "2TB NVMe"]
  },
  {
    id: 3,
    name: "ماكبوك إير M3",
    nameEn: "MacBook Air M3",
    description: "الأناقة والقوة في جهاز واحد مع بطارية تدوم طويلاً.",
    price: 5200,
    image: "https://picsum.photos/seed/mac/600/400",
    category: 'laptop',
    specs: ["M3 Chip", "8GB RAM", "256GB SSD", "Liquid Retina"]
  },
  {
    id: 4,
    name: "شاشة ألترا وايد 34",
    nameEn: "UltraWide 34 Monitor",
    description: "تجربة بصرية مذهلة للمصممين واللاعبين.",
    price: 2800,
    image: "https://picsum.photos/seed/monitor/600/400",
    category: 'accessory',
    specs: ["3440 x 1440", "144Hz", "IPS Panel", "HDR 400"]
  },
  {
    id: 5,
    name: "لوحة مفاتيح ميكانيكية RGB",
    nameEn: "Mechanical RGB Keyboard",
    description: "سرعة استجابة مذهلة مع إضاءة قابلة للتخصيص.",
    price: 450,
    image: "https://picsum.photos/seed/kb/600/400",
    category: 'accessory',
    specs: ["Blue Switches", "PBT Keycaps", "Wired/Wireless"]
  },
  {
    id: 6,
    name: "وورك ستيشن بريسيجن 500",
    nameEn: "Precision 500 Workstation",
    description: "جهاز مكتبي متكامل مخصص للمهندسين والمصممين.",
    price: 12500,
    image: "https://picsum.photos/seed/ws/600/400",
    category: 'desktop',
    specs: ["Xeon Silver", "64GB RAM", "Quadro RTX 5000", "4TB SSD"]
  }
];
