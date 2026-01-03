
import React, { useState, useCallback, useMemo } from 'react';
import Navbar from './components/Navbar';
import ProductCard from './components/ProductCard';
import Cart from './components/Cart';
import AIChat from './components/AIChat';
import { products } from './data/products';
import { Product, CartItem } from './types';

const App: React.FC = () => {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [filter, setFilter] = useState<string>('all');

  const filteredProducts = useMemo(() => {
    if (filter === 'all') return products;
    return products.filter(p => p.category === filter);
  }, [filter]);

  const addToCart = useCallback((product: Product) => {
    setCart(prev => {
      const existing = prev.find(item => item.id === product.id);
      if (existing) {
        return prev.map(item => 
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prev, { ...product, quantity: 1 }];
    });
    setIsCartOpen(true);
  }, []);

  const removeFromCart = (id: number) => {
    setCart(prev => prev.filter(item => item.id !== id));
  };

  const updateQuantity = (id: number, delta: number) => {
    setCart(prev => prev.map(item => {
      if (item.id === id) {
        const newQty = Math.max(1, item.quantity + delta);
        return { ...item, quantity: newQty };
      }
      return item;
    }));
  };

  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 selection:bg-indigo-100">
      <Navbar 
        cartCount={cartCount} 
        onOpenCart={() => setIsCartOpen(true)}
        onOpenChat={() => setIsChatOpen(true)}
      />

      <main className="flex-grow">
        {/* Hero Section */}
        <section className="relative bg-indigo-900 py-24 overflow-hidden">
          <div className="absolute inset-0 opacity-10 pointer-events-none">
            <svg className="h-full w-full" viewBox="0 0 100 100" preserveAspectRatio="none">
              <path d="M0 100 C 20 0 50 0 100 100 Z" fill="white" />
            </svg>
          </div>
          
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
            <h1 className="text-4xl md:text-6xl font-black text-white mb-6 leading-tight">
              مستقبل الحوسبة يبدأ <span className="text-indigo-400">هنا</span>
            </h1>
            <p className="text-indigo-100 text-lg md:text-xl max-w-2xl mx-auto mb-10 leading-relaxed font-light">
              اكتشف أقوى أجهزة الكمبيوتر المحمولة والمكتبية المجهزة بأحدث التقنيات لتناسب طموحاتك المهنية والإبداعية.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <button 
                onClick={() => setIsChatOpen(true)}
                className="bg-white text-indigo-900 px-8 py-4 rounded-2xl font-bold hover:bg-indigo-50 transition-all flex items-center gap-3 shadow-xl"
              >
                <i className="fas fa-robot text-indigo-600"></i>
                ساعدني في الاختيار (AI)
              </button>
              <button className="bg-indigo-600 text-white px-8 py-4 rounded-2xl font-bold hover:bg-indigo-500 transition-all flex items-center gap-3 shadow-xl shadow-indigo-900/40">
                تسوق جميع المنتجات
              </button>
            </div>
          </div>
        </section>

        {/* Filters & Products */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-8 mb-12">
            <div>
              <h2 className="text-3xl font-black text-gray-900">منتجاتنا المختارة</h2>
              <div className="h-1.5 w-16 bg-indigo-600 rounded-full mt-2"></div>
            </div>

            <div className="flex flex-wrap gap-2 overflow-x-auto pb-2 scrollbar-hide">
              {[
                { id: 'all', label: 'الكل', icon: 'fas fa-th-large' },
                { id: 'laptop', label: 'محمول', icon: 'fas fa-laptop' },
                { id: 'gaming', label: 'ألعاب', icon: 'fas fa-gamepad' },
                { id: 'desktop', label: 'مكتبي', icon: 'fas fa-desktop' },
                { id: 'accessory', label: 'ملحقات', icon: 'fas fa-mouse' },
              ].map(cat => (
                <button
                  key={cat.id}
                  onClick={() => setFilter(cat.id)}
                  className={`px-5 py-2.5 rounded-full text-sm font-bold flex items-center gap-2 transition-all whitespace-nowrap ${
                    filter === cat.id 
                    ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-200 ring-2 ring-indigo-600 ring-offset-2' 
                    : 'bg-white text-gray-500 border border-gray-200 hover:border-indigo-300 hover:text-indigo-600'
                  }`}
                >
                  <i className={cat.icon}></i>
                  {cat.label}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {filteredProducts.map(product => (
              <ProductCard 
                key={product.id} 
                product={product} 
                onAddToCart={addToCart} 
              />
            ))}
          </div>

          {filteredProducts.length === 0 && (
            <div className="text-center py-32 bg-white rounded-3xl border border-dashed border-gray-300">
              <i className="fas fa-search text-gray-200 text-6xl mb-4"></i>
              <p className="text-gray-500">لا توجد منتجات مطابقة لهذا التصنيف حالياً.</p>
            </div>
          )}
        </section>

        {/* Features Section */}
        <section className="bg-white py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-12 text-center">
              <div className="space-y-4">
                <div className="w-16 h-16 bg-indigo-50 text-indigo-600 rounded-2xl flex items-center justify-center mx-auto text-2xl shadow-sm">
                  <i className="fas fa-truck-fast"></i>
                </div>
                <h3 className="font-bold text-xl text-gray-900">شحن سريع ومجاني</h3>
                <p className="text-gray-500 text-sm">نصل إليك أينما كنت في المملكة العربية السعودية خلال 48 ساعة فقط.</p>
              </div>
              <div className="space-y-4">
                <div className="w-16 h-16 bg-green-50 text-green-600 rounded-2xl flex items-center justify-center mx-auto text-2xl shadow-sm">
                  <i className="fas fa-shield-halved"></i>
                </div>
                <h3 className="font-bold text-xl text-gray-900">ضمان ذهبي ممتد</h3>
                <p className="text-gray-500 text-sm">ضمان سنتين شامل على جميع القطع مع خدمة الدعم الفني المباشر.</p>
              </div>
              <div className="space-y-4">
                <div className="w-16 h-16 bg-amber-50 text-amber-600 rounded-2xl flex items-center justify-center mx-auto text-2xl shadow-sm">
                  <i className="fas fa-headset"></i>
                </div>
                <h3 className="font-bold text-xl text-gray-900">دعم فني متخصص</h3>
                <p className="text-gray-500 text-sm">خبراء تقنيون متاحون لمساعدتك في أي وقت لحل المشاكل التقنية.</p>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
            <div className="md:col-span-2">
              <div className="flex items-center gap-2 mb-6">
                <div className="bg-indigo-600 p-2 rounded-lg">
                  <i className="fas fa-microchip text-white text-xl"></i>
                </div>
                <span className="text-2xl font-extrabold tracking-tight">Tech<span className="text-indigo-600">Nova</span></span>
              </div>
              <p className="text-gray-400 text-sm max-w-sm mb-6 leading-relaxed">
                وجهتك الأولى للحصول على أفضل تقنيات الحوسبة في الشرق الأوسط. نحن نجمع بين الجودة العالية، السعر المنافس، وخدمة العملاء الاستثنائية.
              </p>
              <div className="flex gap-4">
                <a href="#" className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-indigo-600 transition-all">
                  <i className="fab fa-twitter"></i>
                </a>
                <a href="#" className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-indigo-600 transition-all">
                  <i className="fab fa-instagram"></i>
                </a>
                <a href="#" className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-indigo-600 transition-all">
                  <i className="fab fa-linkedin-in"></i>
                </a>
              </div>
            </div>
            
            <div>
              <h4 className="font-bold text-lg mb-6">روابط سريعة</h4>
              <ul className="space-y-4 text-gray-400 text-sm">
                <li><a href="#" className="hover:text-white transition-colors">عن المتجر</a></li>
                <li><a href="#" className="hover:text-white transition-colors">سياسة الخصوصية</a></li>
                <li><a href="#" className="hover:text-white transition-colors">الشروط والأحكام</a></li>
                <li><a href="#" className="hover:text-white transition-colors">اتصل بنا</a></li>
              </ul>
            </div>

            <div>
              <h4 className="font-bold text-lg mb-6">القائمة البريدية</h4>
              <p className="text-gray-400 text-xs mb-4">اشترك للحصول على آخر العروض والأخبار التقنية.</p>
              <div className="flex flex-col gap-2">
                <input 
                  type="email" 
                  placeholder="بريدك الإلكتروني"
                  className="bg-gray-800 border-none rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-indigo-600"
                />
                <button className="bg-indigo-600 hover:bg-indigo-500 text-white font-bold py-3 rounded-xl transition-all">
                  اشترك الآن
                </button>
              </div>
            </div>
          </div>
          
          <div className="pt-8 border-t border-gray-800 text-center text-gray-500 text-xs">
            <p>© {new Date().getFullYear()} تيك نوفا (TechNova). جميع الحقوق محفوظة.</p>
          </div>
        </div>
      </footer>

      {/* Side Panels */}
      <Cart 
        isOpen={isCartOpen} 
        onClose={() => setIsCartOpen(false)} 
        items={cart}
        onRemove={removeFromCart}
        onUpdateQuantity={updateQuantity}
      />

      <AIChat 
        isOpen={isChatOpen} 
        onClose={() => setIsChatOpen(false)} 
      />

      {/* Floating Chat Trigger */}
      <button 
        onClick={() => setIsChatOpen(true)}
        className="fixed bottom-6 right-6 bg-indigo-600 text-white w-14 h-14 rounded-full flex items-center justify-center shadow-2xl hover:scale-110 transition-transform z-40 group"
      >
        <i className="fas fa-robot text-2xl"></i>
        <span className="absolute right-full mr-4 bg-white text-indigo-900 px-3 py-1.5 rounded-lg text-xs font-bold shadow-xl opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
          هل تحتاج لمساعدة؟ اسأل AI
        </span>
      </button>

      <style>{`
        @keyframes slide-in-left {
          from { transform: translateX(100%); }
          to { transform: translateX(0); }
        }
        .animate-slide-in-left {
          animation: slide-in-left 0.4s cubic-bezier(0.16, 1, 0.3, 1);
        }
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </div>
  );
};

export default App;
