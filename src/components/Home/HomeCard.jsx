import styles from './HomeCard.module.css';
import { Link } from 'react-router-dom';

const HomeCard = () => {
    return (
        <div className={`col mb-5 ${styles.col}`}>
            <Link to="/detail" className={styles.link}>
                <div className={`${styles.card}`}>
                    <div className={styles.cardImageWrapper}>
                        <img
                         src="https://via.placeholder.com/300"
                          alt="Product" 
                          className={styles.cardImageTop} 
                          />
                    </div>
                    <div className={styles.cardBody}>
                        <h5 className={`${styles.cardTitle} mb-1 `}>Product Name</h5>
                        <h6 className={`${styles.cardPrice} text-muted`}>$99.99</h6>
                    </div>
                </div>  
                </Link>
        </div>
    );
}
export default HomeCard;