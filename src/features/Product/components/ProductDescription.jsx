import React from 'react';
import PropTypes from 'prop-types';
import DOMPurify from 'dompurify';
import { Paper } from '@material-ui/core';

ProductDescription.propTypes = {
    product: PropTypes.object,
};

function ProductDescription({ product = {} }) {
    const safeDescription = DOMPurify.sanitize(product.description);
    return (
        <Paper elevation={0} style={{ padding: '30px' }}>
            <div dangerouslySetInnerHTML={{ __html: safeDescription }} />
        </Paper>
    );
}

export default ProductDescription;
