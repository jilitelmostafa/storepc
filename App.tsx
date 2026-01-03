
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
    <div className="min-h-screen flex flex-col bg-slate-50 selection:bg-sky-100">
      <Navbar 
        cartCount={cartCount} 
        onOpenCart={() => setIsCartOpen(true)}
        onOpenChat={() => setIsChatOpen(true)}
      />

      <main className="flex-grow">
        {/* Hero Section */}
        <section className="relative bg-gradient-to-br from-sky-600 via-sky-500 to-sky-700 py-32 overflow-hidden">
          <div className="absolute inset-0 opacity-20 pointer-events-none">
            <div className="absolute top-0 left-0 w-64 h-64 bg-white rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2"></div>
            <div className="absolute bottom-0 right-0 w-96 h-96 bg-sky-300 rounded-full blur-3xl translate-x-1/2 translate-y-1/2"></div>
          </div>
          
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
            <div className="inline-block px-4 py-1.5 bg-sky-400/30 backdrop-blur-sm border border-sky-300/30 rounded-full text-white text-xs font-bold mb-6 tracking-widest uppercase">
              الجيل القادم من الحوسبة
            </div>
            <h1 className="text-5xl md:text-7xl font-black text-white mb-6 leading-tight drop-shadow-sm">
              عالمك الرقمي بلون <span className="text-sky-100">السماء</span>
            </h1>
            <p className="text-sky-50 text-lg md:text-xl max-w-2xl mx-auto mb-12 leading-relaxed font-medium opacity-90">
              اكتشف تشكيلة حصرية من أقوى أجهزة الكمبيوتر المحمولة والمكتبية المصممة بعناية لتفوق توقعاتك.
            </p>
            <div className="flex flex-wrap justify-center gap-6">
              <button 
                onClick={() => setIsChatOpen(true)}
                className="bg-white text-sky-600 px-10 py-4 rounded-2xl font-bold hover:bg-sky-50 transition-all flex items-center gap-3 shadow-2xl shadow-sky-900/20 active:scale-95"
              >
                <i className="fas fa-robot text-sky-500"></i>
                مساعد الشراء الذكي
              </button>
              <button className="bg-sky-800/40 backdrop-blur-md border border-sky-400/30 text-white px-10 py-4 rounded-2xl font-bold hover:bg-sky-800/60 transition-all flex items-center gap-3 active:scale-95">
                تصفح الكتالوج
              </button>
            </div>
          </div>
        </section>

        {/* Filters & Products */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-10 mb-16">
            <div className="relative">
              <h2 className="text-4xl font-black text-slate-800">أحدث الإصدارات</h2>
              <div className="h-2 w-20 bg-sky-500 rounded-full mt-3"></div>
            </div>

            <div className="flex flex-wrap gap-3 overflow-x-auto pb-4 scrollbar-hide">
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
                  className={`px-6 py-3 rounded-2xl text-sm font-bold flex items-center gap-2.5 transition-all whitespace-nowrap shadow-sm ${
                    filter === cat.id 
                    ? 'bg-sky-600 text-white shadow-xl shadow-sky-200 ring-2 ring-sky-600 ring-offset-4' 
                    : 'bg-white text-slate-500 border border-slate-100 hover:border-sky-300 hover:text-sky-600 hover:bg-sky-50/50'
                  }`}
                >
                  <i className={cat.icon}></i>
                  {cat.label}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-10">
            {filteredProducts.map(product => (
              <ProductCard 
                key={product.id} 
                product={product} 
                onAddToCart={addToCart} 
              />
            ))}
          </div>

          {filteredProducts.length === 0 && (
            <div className="text-center py-40 bg-white rounded-[40px] border-2 border-dashed border-sky-100 shadow-inner">
              <div className="bg-sky-50 w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-6">
                <i className="fas fa-search text-sky-200 text-4xl"></i>
              </div>
              <h3 className="text-xl font-bold text-slate-700 mb-2">لا يوجد نتائج</h3>
              <p className="text-slate-400">حاول البحث عن تصنيف آخر أو تواصل مع الدعم الفني.</p>
            </div>
          )}
        </section>

        {/* Features Section */}
        <section className="bg-slate-900 py-24 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-1/2 h-full bg-sky-500/5 -skew-x-12 translate-x-1/4"></div>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-16 text-center">
              {[
                { icon: 'fas fa-truck-fast', title: 'شحن ذكي وسريع', desc: 'نستخدم أفضل تقنيات اللوجستيات لضمان وصول جهازك خلال 24 ساعة.', color: 'sky' },
                { icon: 'fas fa-shield-halved', title: 'حماية شاملة 360', desc: 'ضمان استثنائي يغطي العيوب المصنعية وحوادث الاستخدام لمدة سنتين.', color: 'blue' },
                { icon: 'fas fa-headset', title: 'دعم تقني مدار', desc: 'مهندسون حقيقيون متاحون لمساعدتك عبر الدردشة الحية في أي وقت.', color: 'sky' }
              ].map((feature, i) => (
                <div key={i} className="group">
                  <div className="w-20 h-20 bg-sky-500/10 text-sky-400 rounded-[2rem] flex items-center justify-center mx-auto text-3xl mb-8 group-hover:bg-sky-500 group-hover:text-white transition-all duration-500 shadow-xl shadow-sky-500/5">
                    <i className={feature.icon}></i>
                  </div>
                  <h3 className="font-bold text-2xl text-white mb-4">{feature.title}</h3>
                  <p className="text-slate-400 text-sm leading-relaxed px-4">{feature.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>

      <footer className="bg-white text-slate-800 pt-20 pb-10 border-t border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-16 mb-20">
            <div className="md:col-span-2">
              <div className="flex items-center gap-2 mb-8">
                <div className="bg-sky-500 p-2.5 rounded-xl shadow-lg shadow-sky-100">
                  <i className="fas fa-microchip text-white text-2xl"></i>
                </div>
                <span className="text-3xl font-black tracking-tight text-slate-800">Tech<span className="text-sky-500">Nova</span></span>
              </div>
              <p className="text-slate-500 text-base max-w-sm mb-8 leading-relaxed">
                تيك نوفا ليست مجرد متجر، بل هي شريكك التقني في رحلة الإبداع والعمل. نحن نهتم بأدق التفاصيل لنقدم لك الأفضل دائماً.
              </p>
              <div className="flex gap-5">
                {['twitter', 'instagram', 'linkedin-in', 'facebook-f'].map(social => (
                  <a key={social} href="#" className="w-12 h-12 bg-sky-50 text-sky-600 rounded-2xl flex items-center justify-center hover:bg-sky-500 hover:text-white transition-all shadow-sm border border-sky-100">
                    <i className={`fab fa-${social}`}></i>
                  </a>
                ))}
              </div>
            </div>
            
            <div>
              <h4 className="font-bold text-xl mb-8 text-slate-900">استكشف</h4>
              <ul className="space-y-5 text-slate-500 font-medium">
                <li><a href="#" className="hover:text-sky-600 transition-colors flex items-center gap-2"><i className="fas fa-chevron-left text-[10px]"></i> عن تيك نوفا</a></li>
                <li><a href="#" className="hover:text-sky-600 transition-colors flex items-center gap-2"><i className="fas fa-chevron-left text-[10px]"></i> الخصوصية</a></li>
                <li><a href="#" className="hover:text-sky-600 transition-colors flex items-center gap-2"><i className="fas fa-chevron-left text-[10px]"></i> شروط الاستخدام</a></li>
                <li><a href="#" className="hover:text-sky-600 transition-colors flex items-center gap-2"><i className="fas fa-chevron-left text-[10px]"></i> تتبع طلبك</a></li>
              </ul>
            </div>

            <div>
              <h4 className="font-bold text-xl mb-8 text-slate-900">النشرة الإخبارية</h4>
              <p className="text-slate-500 text-sm mb-6">احصل على عروض حصرية وتنبيهات بجديد التقنية.</p>
              <div className="flex flex-col gap-3">
                <input 
                  type="email" 
                  placeholder="بريدك الإلكتروني"
                  className="bg-slate-50 border border-slate-200 rounded-2xl px-5 py-4 text-sm focus:ring-2 focus:ring-sky-500 focus:bg-white outline-none transition-all"
                />
                <button className="bg-sky-600 hover:bg-sky-700 text-white font-bold py-4 rounded-2xl transition-all shadow-lg shadow-sky-100 active:scale-95">
                  اشترك الآن
                </button>
              </div>
            </div>
          </div>
          
          <div className="pt-10 border-t border-slate-50 text-center">
            <p className="text-slate-400 text-xs font-medium tracking-wide italic">
              © {new Date().getFullYear()} TechNova. صنع بشغف لعشاق التقنية.
            </p>
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
        className="fixed bottom-8 right-8 bg-sky-500 text-white w-16 h-16 rounded-[2rem] flex items-center justify-center shadow-2xl shadow-sky-500/30 hover:scale-110 hover:rotate-3 transition-all z-40 group ring-4 ring-sky-50"
      >
        <i className="fas fa-robot text-3xl"></i>
        <div className="absolute right-full mr-6 bg-white border border-sky-100 text-sky-900 px-4 py-2.5 rounded-2xl text-xs font-black shadow-2xl opacity-0 group-hover:opacity-100 transition-all scale-90 group-hover:scale-100 whitespace-nowrap pointer-events-none origin-right">
          هل تود استشارة ذكية؟ ✨
        </div>
      </button>

      <style>{`
        @keyframes slide-in-left {
          from { transform: translateX(100%); opacity: 0; }
          to { transform: translateX(0); opacity: 1; }
        }
        @keyframes fade-in {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-slide-in-left {
          animation: slide-in-left 0.5s cubic-bezier(0.16, 1, 0.3, 1);
        }
        .animate-fade-in {
          animation: fade-in 0.4s ease-out forwards;
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
