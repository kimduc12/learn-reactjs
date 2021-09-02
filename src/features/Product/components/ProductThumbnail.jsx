import React from 'react';
import PropTypes from 'prop-types';
import { THUMBNAIL_PLACEHOLDER, STATIC_HOST } from 'constants/index';

ProductThumbnail.propTypes = {
    product: PropTypes.object,
};

function ProductThumbnail({ product = {} }) {
    const thumbnail = product.thumbnail ? `${STATIC_HOST}${product.thumbnail?.url}` : `${THUMBNAIL_PLACEHOLDER}`;
    return (
        <>
            <img src={thumbnail} alt={product.name} width="100%" />
        </>
    );
}

export default ProductThumbnail;
