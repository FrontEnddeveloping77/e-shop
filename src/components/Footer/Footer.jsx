import React from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../../context/LanguageContext';
import {
    Facebook,
    Instagram,
    Twitter,
    Youtube,
    Mail,
    Phone,
    MapPin
} from 'lucide-react';
import './Footer.css';

const Footer = () => {
    const { t } = useLanguage();
    const currentYear = new Date().getFullYear();

    return (
        <footer className="footer">
            <div className="container">
                <div className="footer-grid">
                    {/* 1. Brend va Aloqa */}
                    <div className="footer-section">
                        <Link to="/" className="footer-logo">E-<span>SHOP</span></Link>
                        <p className="footer-about-text">
                            {t('footer.about')} - Biz mijozlarimizga eng sifatli mahsulotlarni
                            hamyonbop narxlarda yetkazib berishni maqsad qilganmiz.
                        </p>
                        <div className="footer-contact-info">
                            <div className="contact-item">
                                <Phone size={18} />
                                <span>{t('navbar.phone')}</span>
                            </div>
                            <div className="contact-item">
                                <Mail size={18} />
                                <span>info@eshop.uz</span>
                            </div>
                            <div className="contact-item">
                                <MapPin size={18} />
                                <span>Toshkent, O'zbekiston</span>
                            </div>
                        </div>
                    </div>

                    {/* 2. Kategoriyalar */}
                    <div className="footer-section">
                        <h3>{t('navbar.categories.electronics') || "Kategoriyalar"}</h3>
                        <ul className="footer-links">
                            <li><Link to="/electronics">{t('navbar.categories.electronics')}</Link></li>
                            <li><Link to="/clothing">{t('navbar.categories.clothing')}</Link></li>
                            <li><Link to="/home">{t('navbar.categories.home')}</Link></li>
                            <li><Link to="/kids">{t('navbar.categories.kids')}</Link></li>
                            <li><Link to="/deals">{t('navbar.categories.deals')}</Link></li>
                        </ul>
                    </div>

                    {/* 3. Mijozlarga yordam */}
                    <div className="footer-section">
                        <h3>{t('footer.customer_service')}</h3>
                        <ul className="footer-links">
                            <li><Link to="/help">{t('footer.help')}</Link></li>
                            <li><Link to="/about">{t('footer.about')}</Link></li>
                            <li><Link to="/contact">{t('footer.contact')}</Link></li>
                            <li><Link to="/shipping">Yetkazib berish</Link></li>
                            <li><Link to="/terms">Foydalanish shartlari</Link></li>
                        </ul>
                    </div>

                    {/* 4. Ijtimoiy tarmoqlar */}
                    <div className="footer-section">
                        <h3>{t('footer.socials')}</h3>
                        <div className="social-icons">
                            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="social-link">
                                <Instagram size={22} />
                            </a>
                            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="social-link">
                                <Facebook size={22} />
                            </a>
                            <a href="https://telegram.org" target="_blank" rel="noopener noreferrer" className="social-link">
                                <Twitter size={22} />
                            </a>
                            <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" className="social-link">
                                <Youtube size={22} />
                            </a>
                        </div>
                    </div>
                </div>

                <div className="footer-bottom">
                    <p>&copy; {currentYear} E-SHOP. {t('footer.all_rights_reserved')}</p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;