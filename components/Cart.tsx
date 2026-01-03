
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
      <div className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm" onClick={onClose}></div>
      <div className="relative w-full max-w-md bg-white h-full shadow-2xl flex flex-col animate-slide-in-left">
        <div className="p-6 border-b flex justify-between items-center bg-slate-50 shrink-0">
          <h2 className="text-xl font-black text-slate-800">سلة التسوق</h2>
          <button onClick={onClose} className="text-slate-400 hover:text-sky-600 transition-colors">
            <i className="fas fa-times text-xl"></i>
          </button>
        </div>

        <div className="flex-grow overflow-y-auto p-6 space-y-6">
          {items.length === 0 ? (
            <div className="text-center py-20">
              <div className="bg-sky-50 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4">
                <i className="fas fa-shopping-basket text-3xl text-sky-200"></i>
              </div>
              <p className="text-slate-400 font-medium">السلة فارغة حالياً</p>
              <button 
                onClick={onClose}
                className="mt-4 text-sky-600 font-bold text-sm hover:text-sky-700 underline underline-offset-4"
              >
                ابدأ رحلة التسوق
              </button>
            </div>
          ) : (
            items.map(item => (
              <div key={item.id} className="flex gap-4 group animate-fade-in">
                <div className="w-20 h-20 bg-sky-50 rounded-xl overflow-hidden shrink-0 border border-sky-100">
                  <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                </div>
                <div className="flex-grow flex flex-col justify-between py-1">
                  <div>
                    <div className="flex justify-between items-start">
                      <h4 className="font-bold text-slate-800 text-sm leading-tight">{item.name}</h4>
                      <button 
                        onClick={() => onRemove(item.id)}
                        className="text-slate-300 hover:text-red-500 transition-colors p-1"
                      >
                        <i className="fas fa-trash-alt text-xs"></i>
                      </button>
                    </div>
                    <p className="text-sky-600 font-black text-sm mt-1">{item.price.toLocaleString()} ر.س</p>
                  </div>
                  
                  <div className="flex items-center gap-4 mt-2">
                    <div className="flex items-center border border-sky-100 rounded-lg overflow-hidden h-8 bg-sky-50/50">
                      <button 
                        onClick={() => onUpdateQuantity(item.id, -1)}
                        className="px-2 hover:bg-sky-100 text-sky-600 transition-colors"
                      >
                        <i className="fas fa-minus text-[10px]"></i>
                      </button>
                      <span className="px-3 text-xs font-bold text-slate-700 min-w-[30px] text-center">{item.quantity}</span>
                      <button 
                        onClick={() => onUpdateQuantity(item.id, 1)}
                        className="px-2 hover:bg-sky-100 text-sky-600 transition-colors"
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

        <div className="p-6 bg-slate-50 border-t shrink-0">
          <div className="space-y-3 mb-6">
            <div className="flex justify-between text-sm text-slate-500">
              <span>المجموع الفرعي:</span>
              <span className="font-semibold text-slate-800">{total.toLocaleString()} ر.س</span>
            </div>
            <div className="flex justify-between text-sm text-slate-500">
              <span>الشحن السريع:</span>
              <span className="text-sky-600 font-bold">مجاني</span>
            </div>
            <div className="flex justify-between text-xl font-black text-slate-900 pt-3 border-t border-sky-100">
              <span>الإجمالي:</span>
              <span className="text-sky-600">{total.toLocaleString()} ر.س</span>
            </div>
          </div>

          <button 
            disabled={items.length === 0}
            className="w-full bg-sky-500 hover:bg-sky-600 disabled:bg-slate-300 text-white font-bold py-4 rounded-2xl transition-all shadow-xl shadow-sky-100 active:scale-[0.98] flex items-center justify-center gap-3"
          >
            <i className="fas fa-check-circle"></i>
            إتمام عملية الشراء
          </button>
        </div>
      </div>
    </div>
  );
};

export default Cart;
