// src/pages/Wishlist/Wishlist.jsx
import React from 'react';
import { useCart } from '../../context/CartContext';
import { useLanguage } from '../../context/LanguageContext';
import { Trash2, ShoppingCart, HeartOff } from 'lucide-react';
import './Wishlist.css';

const Wishlist = () => {
    const { wishlist, toggleWishlist, addToCart } = useCart();
    const { lang, t } = useLanguage();

    if (wishlist.length === 0) {
        return (
            <div className="empty-wishlist container">
                <HeartOff size={80} strokeWidth={1} />
                <h2>{t('wishlist.empty') || "Yoqtirilganlar ro'yxati bo'sh"}</h2>
                <p>Sizga yoqqan mahsulotlarni shu yerda saqlashingiz mumkin.</p>
            </div>
        );
    }

    return (
        <div className="wishlist-page container">
            <h1 className="page-title">{t('navbar.wishlist')} ({wishlist.length})</h1>

            <div className="wishlist-grid">
                {wishlist.map(item => (
                    <div key={item.id} className="wishlist-item">
                        <div className="w-image-wrapper">
                            <img src={item.image} alt={item.name[lang]} />
                            <button
                                className="w-remove-btn"
                                onClick={() => toggleWishlist(item)}
                            >
                                <Trash2 size={18} />
                            </button>
                        </div>

                        <div className="w-details">
                            <h3 className="w-title">{item.name[lang]}</h3>
                            <p className="w-price">{item.price.toLocaleString()} {t('product.currency')}</p>

                            <button
                                className="w-add-cart-btn"
                                onClick={() => addToCart(item)}
                            >
                                <ShoppingCart size={18} />
                                <span>Savatga qo'shish</span>
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Wishlist;