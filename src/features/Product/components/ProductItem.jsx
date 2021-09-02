import { Box, makeStyles, Typography } from '@material-ui/core';
import { STATIC_HOST, THUMBNAIL_PLACEHOLDER } from 'constants/index';
import PropTypes from 'prop-types';
import React from 'react';
import { useHistory } from 'react-router-dom';

ProductItem.propTypes = {
    product: PropTypes.object,
};

ProductItem.defaultProps = {
    product: {},
};

const useStyles = makeStyles((theme) => ({
    root: {
        cursor: 'pointer',
    },
}));

function ProductItem(props) {
    const { product } = props;
    const history = useHistory();
    const classes = useStyles();
    const thumbnail = product.thumbnail ? `${STATIC_HOST}${product.thumbnail?.url}` : `${THUMBNAIL_PLACEHOLDER}`;
    const handleClick = () => {
        history.push('/products/' + product.id);
    };
    return (
        <Box padding={1} className={classes.root} onClick={handleClick}>
            <Box padding={1}>
                <img src={thumbnail} alt={product.name} width="100%" />
            </Box>
            <Box padding={1}>
                <Typography variant="body2">{product.name}</Typography>
                <Typography variant="body2">
                    <Box component="span" fontSize={16} fontWeight="bold" mr={1}>
                        {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(
                            product.salePrice
                        )}
                    </Box>
                    {product.promotionPercent > 0 ? ` -${product.promotionPercent}%` : ''}
                </Typography>
            </Box>
        </Box>
    );
}

export default ProductItem;
