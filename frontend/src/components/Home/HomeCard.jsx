import styles from './HomeCard.module.css';
import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';

const HomeCard = ({ product }) => {
    const [isDarkMode, setIsDarkMode] = useState(() => {
        return localStorage.getItem("theme") === "dark";
    });

    useEffect(() => {
        const handleStorageChange = () => {
            setIsDarkMode(localStorage.getItem("theme") === "dark");
        };

        window.addEventListener('storage', handleStorageChange);
        
        // Also listen for theme changes within the same tab
        const observer = new MutationObserver(() => {
            setIsDarkMode(document.body.classList.contains('dark-theme'));
        });
        
        observer.observe(document.body, { attributes: true, attributeFilter: ['class'] });

        return () => {
            window.removeEventListener('storage', handleStorageChange);
            observer.disconnect();
        };
    }, []);

    return (
        <div className={`col-12 col-sm-6 col-md-4 col-lg-3 mb-5 ${styles.col}`}>
            <Link to={`/products/${product.slug}`} className={styles.link}>
                <div className={`${styles.card} ${isDarkMode ? styles.darkCard : styles.lightCard}`}>
                    <div className={styles.cardImageWrapper}>
                        <img
                            src={product.thumbnail}
                            alt={product.name}
                            className={styles.cardImageTop}
                        />
                    </div>
                    <div className={`${styles.cardBody} ${isDarkMode ? styles.darkCardBody : styles.lightCardBody}`}>
                        <h5 className={`${styles.cardTitle} ${isDarkMode ? styles.darkText : styles.lightText} mb-1`}>
                            {product.name}
                        </h5>
                        <h6 className={`${styles.cardPrice} ${isDarkMode ? styles.darkPrice : styles.lightPrice}`}>
                            {product.price} ETB
                        </h6>
                    </div>
                </div>
            </Link>
        </div>
    );
}

export default HomeCard;