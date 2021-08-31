import React from 'react';
import PropTypes from 'prop-types';
import { Tab, Tabs } from '@material-ui/core';

ProductSort.propTypes = {
    currentSort: PropTypes.string,
    onChange: PropTypes.func,
};

function ProductSort(props) {
    const { currentSort, onChange } = props;
    const handleSortChange = (e, value) => {
        if (onChange) {
            onChange(value);
        }
    };
    return (
        <Tabs value={currentSort} onChange={handleSortChange} indicatorColor="primary" textColor="primary">
            <Tab label="Giá thấp tới cao" value="salePrice:ASC" />
            <Tab label="Giá cao tới thấp" value="salePrice:DESC" />
        </Tabs>
    );
}

export default ProductSort;
