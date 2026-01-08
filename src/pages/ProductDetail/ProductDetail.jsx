import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
    Heart,
    ShoppingCart,
    Star,
    Truck,
    ShieldCheck
} from "lucide-react";
import { useLanguage } from "../../context/LanguageContext";
import { useCart } from "../../context/CartContext";
// DIQQAT: Manzilni tekshiring, agar productsData src/data/ ichida bo'lsa:
import { productsData } from "../../utils/productsData"; 
import "./ProductDetail.css";

const ProductDetail = () => {
    const { id } = useParams();
    const { lang, t } = useLanguage();
    const { addToCart, toggleWishlist, cartItems, wishlist } = useCart();

    // ID turlari har xil bo'lishi mumkinligini hisobga olib String qilib solishtiramiz
    const product = productsData.find(p => String(p.id) === String(id));
    const [activeImage, setActiveImage] = useState("");

    useEffect(() => {
        if (product) {
            setActiveImage(product.image);
            // Sahifa ochilganda tepaga qaytarish
            window.scrollTo(0, 0);
        }
    }, [product]);

    // Agar mahsulot topilmasa, chiroyli xabar chiqishi kerak
    if (!product) {
        return (
            <div className="pd-notfound container" style={{textAlign: 'center', padding: '100px'}}>
                <h2>{t("product.not_found") || "Mahsulot topilmadi ❌"}</h2>
            </div>
        );
    }

    // Wishlist va Cart holatini xavfsiz tekshirish
    const isFavorite = wishlist?.some(item => item.id === product.id);
    const inCart = cartItems?.some(item => item.id === product.id);

    return (
        <div className="pd-wrapper container">
            {/* LEFT - Image Section */}
            <div className="pd-left">
                <div className="pd-image-box">
                    {product.isNew && (
                        <span className="pd-badge">{t("product.new")}</span>
                    )}
                    <img src={activeImage} alt={product.name?.[lang] || "Product image"} />
                </div>
            </div>

            {/* RIGHT - Details Section */}
            <div className="pd-right">
                {/* Safe access using optional chaining */}
                <h1 className="pd-title">{product.name?.[lang]}</h1>

                <div className="pd-rating">
                    {[1, 2, 3, 4, 5].map(i => (
                        <Star
                            key={i}
                            size={18}
                            fill="#FFC107"
                            stroke="#FFC107"
                        />
                    ))}
                    <span>(124)</span>
                </div>

                <div className="pd-price-card">
                    <span className="pd-price">
                        {product.price?.toLocaleString()} {t("product.currency")}
                    </span>

                    {product.oldPrice && (
                        <span className="pd-old">
                            {product.oldPrice.toLocaleString()} {t("product.currency")}
                        </span>
                    )}
                </div>

                <p className="pd-description">
                    {product.description?.[lang] || "Ma'lumot mavjud emas."}
                </p>

                <div className="pd-actions">
                    <button
                        className={`pd-cart ${inCart ? "added" : ""}`}
                        onClick={() => addToCart(product)}
                    >
                        <ShoppingCart size={20} />
                        {inCart ? t("cart.added") || "Savatda" : t("product.add_cart")}
                    </button>

                    <button
                        className={`pd-like ${isFavorite ? "active" : ""}`}
                        onClick={() => toggleWishlist(product)}
                    >
                        <Heart
                            size={20}
                            fill={isFavorite ? "red" : "none"}
                            color={isFavorite ? "red" : "currentColor"}
                        />
                    </button>
                </div>

                <div className="pd-info">
                    <div className="info-item">
                        <Truck size={18} />
                        <span>{t("product.delivery_time") || "24 soatda yetkazib berish"}</span>
                    </div>
                    <div className="info-item">
                        <ShieldCheck size={18} />
                        <span>{t("product.guarantee") || "1 yil rasmiy kafolat"}</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductDetail;