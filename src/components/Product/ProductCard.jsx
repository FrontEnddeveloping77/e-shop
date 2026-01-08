// src/components/Product/ProductCard.jsx
import React from 'react';
import { ShoppingCart, Heart } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';
import { useCart } from '../../context/CartContext'; // Contextni import qiling
import { Link } from 'react-router-dom';
import './ProductCard.css';

const ProductCard = ({ product }) => {
    const { lang, t } = useLanguage();
    const { toggleWishlist, wishlist, addToCart } = useCart(); // Kerakli funksiyalarni oling

    // Mahsulot wishlist ichida borligini tekshirish
    const isFavorite = wishlist.some(item => item.id === product.id);

    return (
        <Link to={`/product/${product.id}`}>
            <article className="p-card">
                <div className="p-image-wrapper">
                    <img
                        src={product.image}
                        alt={product.name?.[lang]}
                        loading="lazy"
                    />

                    {/* isFavorite bo'lsa 'active' klassini qo'shamiz */}
                    <button
                        className={`p-wishlist-btn ${isFavorite ? 'active' : ''}`}
                        aria-label="Add to wishlist"
                        onClick={() => toggleWishlist(product)}
                    >
                        <Heart
                            size={18}
                            fill={isFavorite ? "#ff4d4d" : "none"} // Ichini rang bilan to'ldirish
                            color={isFavorite ? "#ff4d4d" : "currentColor"} // Chiziq rangini o'zgartirish
                        />
                    </button>

                    {product.isNew && (
                        <span className="p-badge">{t('product.new')}</span>
                    )}
                </div>

                <div className="p-details">
                    <h3 className="p-title">{product.name?.[lang]}</h3>

                    <div className="p-price-row">
                        <div className="p-prices">
                            <span className="current-price">
                                {product.price.toLocaleString()} {t('product.currency')}
                            </span>
                        </div>

                        <button
                            className="p-add-cart"
                            aria-label="Add to cart"
                            onClick={() => addToCart(product)}
                        >
                            <ShoppingCart size={18} />
                        </button>
                    </div>
                </div>
            </article>
        </Link>
    );
};

export default ProductCard;