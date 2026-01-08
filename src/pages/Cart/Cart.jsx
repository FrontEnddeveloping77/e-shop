import React from 'react';
import { useCart } from '../../context/CartContext';
import { useLanguage } from '../../context/LanguageContext';
import { Trash2, Plus, Minus, ShoppingBag } from 'lucide-react';
import './Cart.css';

const Cart = () => {
    const { cartItems, removeFromCart, updateQuantity, totalPrice } = useCart();
    const { lang, t } = useLanguage();

    // 1. Savatcha bo'sh bo'lsa (cartItems null yoki bo'sh massiv bo'lsa)
    if (!cartItems || cartItems.length === 0) {
        return (
            <div className="empty-cart container">
                <ShoppingBag size={80} strokeWidth={1} />
                <h2>{t('cart.empty') || "Savatchangiz bo'sh"}</h2>
                <p>{t('cart.empty_text') || "Siz hali hech narsa qo'shmadingiz"}</p>
                <button className="go-shopping-btn" onClick={() => window.location.href = '/'}>
                    {t('cart.go_shopping') || "Xarid qilishga o'tish"}
                </button>
            </div>
        );
    }

    return (
        <div className="cart-page container">
            <h1 className="cart-title">
                {t('navbar.cart') || "Savatcha"} ({cartItems.length})
            </h1>

            <div className="cart-content">
                {/* 1. Mahsulotlar Ro'yxati */}
                <div className="cart-items-list">
                    {cartItems.map((item) => {
                        // 2. Xavfsiz kirish: item mavjudligini tekshirish
                        if (!item) return null;

                        // Nomni olishda xatolik yuz bermasligi uchun (obyekt yoki matn bo'lishi mumkin)
                        const itemName = typeof item.name === 'object' 
                            ? item.name[lang] 
                            : item.name;

                        return (
                            <div key={item.id} className="cart-item-card">
                                <div className="cart-item-main">
                                    <img
                                        src={item.image}
                                        alt={itemName}
                                        className="cart-item-img"
                                        onError={(e) => { e.target.src = 'https://via.placeholder.com/150' }}
                                    />
                                    <div className="cart-item-info">
                                        <h3>{itemName || "Mahsulot nomi yo'q"}</h3>
                                        <p className="item-price">
                                            {item.price?.toLocaleString()} {t('product.currency')}
                                        </p>
                                    </div>
                                </div>

                                <div className="cart-item-actions">
                                    <div className="quantity-controls">
                                        <button 
                                            onClick={() => updateQuantity(item.id, -1)}
                                            disabled={item.quantity <= 1}
                                        >
                                            <Minus size={16} />
                                        </button>
                                        <span>{item.quantity}</span>
                                        <button onClick={() => updateQuantity(item.id, 1)}>
                                            <Plus size={16} />
                                        </button>
                                    </div>

                                    <div className="item-total-price">
                                        {((item.price || 0) * (item.quantity || 1)).toLocaleString()} {t('product.currency')}
                                    </div>

                                    <button
                                        className="remove-btn"
                                        onClick={() => removeFromCart(item.id)}
                                        title="O'chirish"
                                    >
                                        <Trash2 size={20} />
                                    </button>
                                </div>
                            </div>
                        );
                    })}
                </div>

                {/* 2. Buyurtma xulosasi */}
                <div className="cart-summary">
                    <h3>{t('cart.summary') || "Buyurtma tafsilotlari"}</h3>
                    <div className="summary-row">
                        <span>{t('cart.items') || "Mahsulotlar"} ({cartItems.length}):</span>
                        <span>{totalPrice.toLocaleString()} {t('product.currency')}</span>
                    </div>
                    <div className="summary-row">
                        <span>{t('cart.delivery') || "Yetkazib berish"}:</span>
                        <span className="free">{t('cart.free') || "Bepul"}</span>
                    </div>
                    <hr />
                    <div className="summary-row total">
                        <span>{t('cart.total') || "Jami summa"}:</span>
                        <span>{totalPrice.toLocaleString()} {t('product.currency')}</span>
                    </div>
                    <button className="checkout-btn">
                        {t('cart.checkout') || "Rasmiylashtirish"}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Cart;