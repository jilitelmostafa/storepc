
import React from 'react';

interface NavbarProps {
  cartCount: number;
  onOpenCart: () => void;
  onOpenChat: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ cartCount, onOpenCart, onOpenChat }) => {
  return (
    <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-100 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center gap-2">
            <div className="bg-indigo-600 p-2 rounded-lg">
              <i className="fas fa-microchip text-white text-xl"></i>
            </div>
            <span className="text-2xl font-extrabold text-gray-900 tracking-tight">Tech<span className="text-indigo-600">Nova</span></span>
          </div>

          <div className="hidden md:flex items-center space-x-8 space-x-reverse text-sm font-medium">
            <a href="#" className="text-gray-600 hover:text-indigo-600 transition-colors">الرئيسية</a>
            <a href="#" className="text-gray-600 hover:text-indigo-600 transition-colors">الحواسيب المحمولة</a>
            <a href="#" className="text-gray-600 hover:text-indigo-600 transition-colors">أجهزة الألعاب</a>
            <a href="#" className="text-gray-600 hover:text-indigo-600 transition-colors">الملحقات</a>
          </div>

          <div className="flex items-center gap-4">
            <button 
              onClick={onOpenChat}
              className="p-2 text-gray-500 hover:text-indigo-600 transition-colors flex items-center gap-2"
              title="مساعد الذكاء الاصطناعي"
            >
              <i className="fas fa-robot text-lg"></i>
              <span className="hidden sm:inline text-xs font-bold">اسأل AI</span>
            </button>
            <button 
              onClick={onOpenCart}
              className="relative p-2 text-gray-500 hover:text-indigo-600 transition-colors"
            >
              <i className="fas fa-shopping-cart text-lg"></i>
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full ring-2 ring-white">
                  {cartCount}
                </span>
              )}
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
