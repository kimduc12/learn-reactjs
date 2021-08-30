import { Box, Typography } from '@material-ui/core';
import { Skeleton } from '@material-ui/lab';
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
    return (
        <Box padding={1}>
            <Skeleton variant="rect" width="100%" height={118} />
            <Typography variant="body2">{product.name}</Typography>
            <Typography variant="body2">
                {product.salePrice} - {product.promotionPercent}
            </Typography>
        </Box>
    );
}

export default ProductItem;
