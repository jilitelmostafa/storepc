
import React from 'react';
import { CartItem } from '../types';

interface CartProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onRemove: (id: number) => void;
  onUpdateQuantity: (id: number, delta: number) => void;
}

const Cart: React.FC<CartProps> = ({ isOpen, onClose, items, onRemove, onUpdateQuantity }) => {
  const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[60] flex justify-end">
      <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={onClose}></div>
      <div className="relative w-full max-w-md bg-white h-full shadow-2xl flex flex-col animate-slide-in-left">
        <div className="p-6 border-b flex justify-between items-center bg-gray-50 shrink-0">
          <h2 className="text-xl font-black text-gray-900">سلة التسوق</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-900 transition-colors">
            <i className="fas fa-times text-xl"></i>
          </button>
        </div>

        <div className="flex-grow overflow-y-auto p-6 space-y-6">
          {items.length === 0 ? (
            <div className="text-center py-20">
              <div className="bg-gray-50 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4">
                <i className="fas fa-shopping-basket text-3xl text-gray-300"></i>
              </div>
              <p className="text-gray-500 font-medium">السلة فارغة حالياً</p>
              <button 
                onClick={onClose}
                className="mt-4 text-indigo-600 font-bold text-sm hover:underline"
              >
                ابدأ التسوق الآن
              </button>
            </div>
          ) : (
            items.map(item => (
              <div key={item.id} className="flex gap-4 group">
                <div className="w-20 h-20 bg-gray-100 rounded-xl overflow-hidden shrink-0">
                  <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                </div>
                <div className="flex-grow flex flex-col justify-between py-1">
                  <div>
                    <div className="flex justify-between items-start">
                      <h4 className="font-bold text-gray-900 text-sm">{item.name}</h4>
                      <button 
                        onClick={() => onRemove(item.id)}
                        className="text-gray-300 hover:text-red-500 transition-colors"
                      >
                        <i className="fas fa-trash-alt text-xs"></i>
                      </button>
                    </div>
                    <p className="text-indigo-600 font-black text-sm mt-1">{item.price} ر.س</p>
                  </div>
                  
                  <div className="flex items-center gap-4 mt-2">
                    <div className="flex items-center border border-gray-200 rounded-lg overflow-hidden h-8 bg-gray-50">
                      <button 
                        onClick={() => onUpdateQuantity(item.id, -1)}
                        className="px-2 hover:bg-gray-200 transition-colors"
                      >
                        <i className="fas fa-minus text-[10px]"></i>
                      </button>
                      <span className="px-3 text-xs font-bold text-gray-700 min-w-[30px] text-center">{item.quantity}</span>
                      <button 
                        onClick={() => onUpdateQuantity(item.id, 1)}
                        className="px-2 hover:bg-gray-200 transition-colors"
                      >
                        <i className="fas fa-plus text-[10px]"></i>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        <div className="p-6 bg-gray-50 border-t shrink-0">
          <div className="space-y-2 mb-6">
            <div className="flex justify-between text-sm text-gray-500">
              <span>المجموع الفرعي:</span>
              <span>{total.toLocaleString()} ر.س</span>
            </div>
            <div className="flex justify-between text-sm text-gray-500">
              <span>الشحن (تقديري):</span>
              <span className="text-green-600">مجاني</span>
            </div>
            <div className="flex justify-between text-lg font-black text-gray-900 pt-2 border-t border-gray-200">
              <span>الإجمالي:</span>
              <span>{total.toLocaleString()} ر.س</span>
            </div>
          </div>

          <button 
            disabled={items.length === 0}
            className="w-full bg-indigo-600 hover:bg-indigo-700 disabled:bg-gray-300 text-white font-bold py-4 rounded-2xl transition-all shadow-lg shadow-indigo-200 active:scale-[0.98]"
          >
            إتمام عملية الشراء
          </button>
        </div>
      </div>
    </div>
  );
};

export default Cart;
