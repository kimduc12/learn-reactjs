import { Box, Typography } from '@material-ui/core';
import { Skeleton } from '@material-ui/lab';
import { STATIC_HOST, THUMBNAIL_PLACEHOLDER } from 'constants/index';
import PropTypes from 'prop-types';
import React from 'react';

ProductItem.propTypes = {
    product: PropTypes.object,
};

ProductItem.defaultProps = {
    product: {},
};

function ProductItem(props) {
    const { product } = props;
    const thumbnail = product.thumbnail ? `${STATIC_HOST}${product.thumbnail?.url}` : `${THUMBNAIL_PLACEHOLDER}`;
    return (
        <Box padding={1}>
            <Box padding={1}>
                <img src={thumbnail} alt={product.name} width="100%" />
            </Box>
            <Typography variant="body2">{product.name}</Typography>
            <Typography variant="body2">
                {product.salePrice} - {product.promotionPercent}
            </Typography>
        </Box>
    );
}

export default ProductItem;
