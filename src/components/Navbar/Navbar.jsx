import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Search, ShoppingCart, Heart, Menu, X, Globe, ChevronDown, Phone } from "lucide-react";
import { useLanguage } from "../../context/LanguageContext";
import { useCart } from "../../context/CartContext";
import "./Navbar.css";

const Navbar = () => {
    const { cartItems, wishlist } = useCart();
    const { lang, setLang, t } = useLanguage();
    const [isLangOpen, setIsLangOpen] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [isSticky, setIsSticky] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 40) {
                setIsSticky(true);
            } else {
                setIsSticky(false);
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <header className="header-wrapper">
            {/* 1. TOP BAR */}
            <div className="top-bar">
                <div className="container2 flex-between">
                    <div className="top-left">
                        <Phone size={15} /> <span className="navbar-phone">{t('navbar.phone')}</span>
                    </div>
                    <div className="top-right">
                        <div className="lang-box">
                            <button onClick={() => setIsLangOpen(!isLangOpen)} className="lang-btn">
                                <Globe size={16} /> {lang.toUpperCase()} <ChevronDown size={14} />
                            </button>
                            {isLangOpen && (
                                <div className="lang-dropdown">
                                    <div className="lang-dropdown-btn" onClick={() => { setLang('uz'); setIsLangOpen(false) }}>UZB</div>
                                    <div className="lang-dropdown-btn" onClick={() => { setLang('ru'); setIsLangOpen(false) }}>RUS</div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div >

            {/* 2. MAIN NAV */}
            <div div className={`main-nav ${isSticky ? 'sticky' : ''}`} >
                <div className="container2 flex-between">
                    <Link to="/" className="logo">E-<span>SHOP</span></Link>

                    <div className="search-container">
                        <input type="text" placeholder={t('navbar.search')} />
                        <button><Search size={20} /></button>
                    </div>

                    <div className="nav-icons">
                        <Link to="/wishlist" className="icon-item"><Heart size={25} /><span className="badge">{wishlist.length}</span></Link>
                        <Link to="/cart" className="icon-item"><ShoppingCart size={25} /><span className="badge">{cartItems.length}</span></Link>
                        <button className="menu-toggle" onClick={() => setIsMobileMenuOpen(true)}>
                            <Menu size={28} />
                        </button>
                    </div>
                </div>
            </div >

            {/* 3. CATEGORY NAV */}
            <div div className="category-bar" >
                <div className="container2">
                    <div className="con">
                        <ul className="cat-list">
                            <li><Link to="/electronics">{t('navbar.categories.electronics')}</Link></li>
                            <li><Link to="/clothing">{t('navbar.categories.clothing')}</Link></li>
                            <li><Link to="/home">{t('navbar.categories.home')}</Link></li>
                            <li><Link to="/kids">{t('navbar.categories.kids')}</Link></li>
                            <li><Link to="/deals" className="sale">{t('navbar.categories.deals')}</Link></li>
                        </ul>
                    </div>
                </div>
            </div >

            {/* MOBILE SIDEBAR */}
            <div div className={`sidebar ${isMobileMenuOpen ? "open" : ""}`}>
                <button className="close-btn" onClick={() => setIsMobileMenuOpen(false)}><X size={30} /></button>
                <div className="sidebar-content">
                    <div className="logo">E-SHOP</div>
                    <ul className="mobile-links">
                        <li><Link to="/electronics">{t('navbar.categories.electronics')}</Link></li>
                        <li><Link to="/clothing">{t('navbar.categories.clothing')}</Link></li>
                        <li><Link to="/home">{t('navbar.categories.home')}</Link></li>
                        <li><Link to="/kids">{t('navbar.categories.kids')}</Link></li>
                        <li><Link to="/deals" className="sale">{t('navbar.categories.deals')}</Link></li>
                    </ul>
                </div>
            </div >
        </header >
    );
};

export default Navbar;