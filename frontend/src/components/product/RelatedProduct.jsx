import HomeCard from "../Home/HomeCard";
import { useLang } from '../../context/LangContext';

const RelatedProducts = ({products}) => {
    const { t } = useLang();
    
    return (
        <section className="py-3 relatedProductsContainer ">
            <div className="container px-4 px-lg-5 mt-3 "> 
                <h2 className="fw-bolder mb-4">{t('product.similar')}</h2> 
                <div className="row gx-4 gx-lg-5 row-cols-2 row-cols-md-3 row-cols-xl-4 justify-content-center text-white"> 
                    {products.map(product => <HomeCard key={product.id} product={product} />)} 
                </div>
            </div>
        </section>
    )
}

export default RelatedProducts;