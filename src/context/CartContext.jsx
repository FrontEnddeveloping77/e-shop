import React, { createContext, useContext, useState, useEffect } from 'react';

const CartContext = createContext();

export const CartProvider = ({ children }) => {
    // 1. Dastlabki qiymatlarni LocalStorage dan o'qiymiz
    const [cartItems, setCartItems] = useState(() => {
        const savedCart = localStorage.getItem('cart');
        return savedCart ? JSON.parse(savedCart) : [];
    });

    const [wishlist, setWishlist] = useState(() => {
        const savedWishlist = localStorage.getItem('wishlist');
        return savedWishlist ? JSON.parse(savedWishlist) : [];
    });

    // 2. Har safar cartItems o'zgarganda LocalStorage ga yozamiz
    useEffect(() => {
        localStorage.setItem('cart', JSON.stringify(cartItems));
    }, [cartItems]);

    // 3. Har safar wishlist o'zgarganda LocalStorage ga yozamiz
    useEffect(() => {
        localStorage.setItem('wishlist', JSON.stringify(wishlist));
    }, [wishlist]);

    const addToCart = (product) => {
        setCartItems((prev) => {
            const isExist = prev.find(item => item.id === product.id);
            if (isExist) {
                return prev.map(item =>
                    item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
                );
            }
            return [...prev, { ...product, quantity: 1 }];
        });
    };

    const removeFromCart = (id) => {
        setCartItems(prev => prev.filter(item => item.id !== id));
    };

    const updateQuantity = (id, amount) => {
        setCartItems(prev => prev.map(item =>
            item.id === id ? { ...item, quantity: Math.max(1, item.quantity + amount) } : item
        ));
    };

    const toggleWishlist = (product) => {
        setWishlist((prev) => {
            const isExist = prev.find(item => item.id === product.id);
            if (isExist) return prev.filter(item => item.id !== product.id);
            return [...prev, product];
        });
    };

    const totalPrice = cartItems.reduce((acc, item) => acc + (item.price * item.quantity), 0);

    return (
        <CartContext.Provider value={{
            cartItems, wishlist, addToCart, removeFromCart,
            updateQuantity, toggleWishlist, totalPrice
        }}>
            {children}
        </CartContext.Provider>
    );
};

export const useCart = () => useContext(CartContext);