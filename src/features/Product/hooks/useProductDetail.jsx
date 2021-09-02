import productApi from 'api/productApi';
import { useEffect, useState } from 'react';

function useProductDetail(productId) {
    const [product, setProduct] = useState({});
    const [loading, setLoading] = useState(false);
    useEffect(() => {
        (async () => {
            setLoading(true);
            try {
                const result = await productApi.get(productId);
                console.log('product: ', result);
                setProduct(result);
            } catch (error) {
                console.log('Api product detail error: ', error);
            }
            setLoading(false);
        })();
    }, [productId]);

    return { product, loading };
}

export default useProductDetail;
