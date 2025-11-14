import styles from './HomeCard.module.css';
import { Link } from 'react-router-dom';
import { BASE_URL } from '../../api';

const HomeCard = ({product}) => {
    return (
        <div className= {`col-12 col-sm-6 col-md-4 col-lg-3 mb-5 ${styles.col}`}>
            <Link to="/detail" className={styles.link}>
                <div className={`${styles.card}`}>
                    <div className={styles.cardImageWrapper}>
                        <img
                         src= {`${BASE_URL}${product.image}`}
                          alt="Product" 
                          className={styles.cardImageTop} 
                          />
                    </div>
                    <div className={styles.cardBody}>
                        <h5 className={`${styles.cardTitle} mb-1 `}>{product.name}</h5>
                        <h6 className={`${styles.cardPrice}`}>{`$${product.price}`}</h6>
                    </div>
                </div>  
                </Link>
        </div>
    );
}
export default HomeCard;