
import React from 'react';
import { Product } from '../types';

interface ProductCardProps {
  product: Product;
  onAddToCart: (product: Product) => void;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, onAddToCart }) => {
  return (
    <div className="bg-white rounded-2xl border border-sky-50 overflow-hidden hover:shadow-2xl hover:shadow-sky-100 transition-all duration-300 group flex flex-col">
      <div className="relative overflow-hidden h-56 bg-sky-50">
        <img 
          src={product.image} 
          alt={product.name} 
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
        />
        <div className="absolute top-3 right-3">
          <span className="bg-white/95 backdrop-blur-sm px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider text-sky-600 shadow-sm border border-sky-100">
            {product.category === 'gaming' ? 'ألعاب' : product.category === 'laptop' ? 'محمول' : product.category === 'desktop' ? 'مكتبي' : 'ملحقات'}
          </span>
        </div>
      </div>
      
      <div className="p-5 flex-grow flex flex-col">
        <h3 className="text-lg font-bold text-slate-800 group-hover:text-sky-600 transition-colors line-clamp-1">
          {product.name}
        </h3>
        <p className="text-slate-500 text-xs mt-1 mb-3 line-clamp-2 leading-relaxed">
          {product.description}
        </p>
        
        <div className="flex flex-wrap gap-1.5 mb-4 mt-auto">
          {product.specs.slice(0, 3).map((spec, i) => (
            <span key={i} className="text-[10px] bg-sky-50 text-sky-700 px-2 py-0.5 rounded-md border border-sky-100">
              {spec}
            </span>
          ))}
        </div>

        <div className="flex items-center justify-between pt-3 border-t border-slate-50">
          <div className="flex flex-col">
            <span className="text-sm text-slate-300 line-through leading-none">{(product.price * 1.2).toFixed(0)} ر.س</span>
            <span className="text-xl font-black text-sky-600 leading-none mt-1">{product.price.toLocaleString()} <small className="text-[10px]">ر.س</small></span>
          </div>
          <button 
            onClick={() => onAddToCart(product)}
            className="bg-sky-500 hover:bg-sky-600 text-white p-3 rounded-xl transition-all shadow-lg shadow-sky-100 active:scale-95"
          >
            <i className="fas fa-cart-plus"></i>
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
