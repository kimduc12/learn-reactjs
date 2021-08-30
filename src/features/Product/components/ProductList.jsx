import { Grid } from '@material-ui/core';
import PropTypes from 'prop-types';
import React from 'react';
import ProductItem from './ProductItem';

ProductList.propTypes = {
    data: PropTypes.array,
};

ProductList.defaultProps = {
    data: [],
};

function ProductList(props) {
    const { data } = props;
    return (
        <Grid container>
            {data.map((product) => (
                <Grid item key={product.id} xs={12} sm={6} md={4} lg={3}>
                    <ProductItem product={product} />
                </Grid>
            ))}
        </Grid>
    );
}

export default ProductList;
