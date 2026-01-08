import React from 'react';
import ProductCard from '../../components/Product/ProductCard';
import { productsData } from '../../utils/productsData';
import { useLanguage } from '../../context/LanguageContext';
import './Home.css'

const Home = () => {
    const { t } = useLanguage();

    return (
        <div className="home-page">
            <div className="container">
                <div style={{ padding: '40px 0' }}>
                    <h2 style={{ marginBottom: '24px', textTransform: 'uppercase' }}>{t('product.popular')}</h2>

                    {/* Mahsulotlar setkasi */}
                    <div className="products-grid">
                        {productsData.map(item => (
                            <ProductCard key={item.id} product={item} />
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Home;