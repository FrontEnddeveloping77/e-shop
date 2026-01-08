// src/context/LanguageContext.jsx
import React, { createContext, useState, useContext } from 'react';
import { translations } from '../utils/translations';

export const LanguageContext = createContext(); // Export qilayotganingizga qarang

export const LanguageProvider = ({ children }) => {
    const [lang, setLang] = useState('uz');

    const t = (path) => {
        const keys = path.split('.');
        let result = translations[lang];
        keys.forEach(key => {
            if (result) result = result[key];
        });
        return result || path;
    };

    return (
        <LanguageContext.Provider value={{ lang, setLang, t }}>
            {children}
        </LanguageContext.Provider>
    );
};

// Hookni to'g'ri export qilish
export const useLanguage = () => {
    const context = useContext(LanguageContext);
    if (!context) {
        throw new Error("useLanguage must be used within a LanguageProvider");
    }
    return context;
};