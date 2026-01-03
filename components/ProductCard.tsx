
import React from 'react';
import { Product } from '../types';

interface ProductCardProps {
  product: Product;
  onAddToCart: (product: Product) => void;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, onAddToCart }) => {
  return (
    <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden hover:shadow-xl transition-all duration-300 group flex flex-col">
      <div className="relative overflow-hidden h-48 bg-gray-100">
        <img 
          src={product.image} 
          alt={product.name} 
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        <div className="absolute top-3 right-3">
          <span className="bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider text-indigo-600 shadow-sm">
            {product.category === 'gaming' ? 'ألعاب' : product.category === 'laptop' ? 'محمول' : 'ملحقات'}
          </span>
        </div>
      </div>
      
      <div className="p-5 flex-grow flex flex-col">
        <h3 className="text-lg font-bold text-gray-900 group-hover:text-indigo-600 transition-colors line-clamp-1">
          {product.name}
        </h3>
        <p className="text-gray-500 text-xs mt-1 mb-3 line-clamp-2">
          {product.description}
        </p>
        
        <div className="flex flex-wrap gap-1.5 mb-4">
          {product.specs.slice(0, 3).map((spec, i) => (
            <span key={i} className="text-[10px] bg-gray-50 text-gray-600 px-2 py-0.5 rounded border border-gray-100">
              {spec}
            </span>
          ))}
        </div>

        <div className="mt-auto flex items-center justify-between">
          <div className="flex flex-col">
            <span className="text-sm text-gray-400 line-through leading-none">{(product.price * 1.2).toFixed(0)} ر.س</span>
            <span className="text-xl font-black text-indigo-600 leading-none">{product.price} <small className="text-[10px]">ر.س</small></span>
          </div>
          <button 
            onClick={() => onAddToCart(product)}
            className="bg-indigo-600 hover:bg-indigo-700 text-white p-3 rounded-xl transition-colors shadow-lg shadow-indigo-200"
          >
            <i className="fas fa-plus"></i>
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
