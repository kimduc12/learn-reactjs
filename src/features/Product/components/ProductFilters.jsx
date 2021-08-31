import React from 'react';
import PropTypes from 'prop-types';
import FilterByCategory from './Filters/FilterByCategory';
import FilterByPrice from './Filters/FilterByPrice';

ProductFilters.propTypes = {
    filters: PropTypes.object,
    onChange: PropTypes.func,
};

function ProductFilters(props) {
    const { filters, onChange } = props;
    const handleCategoryChange = (newCategoryID) => {
        if (!onChange) return;
        const newFilters = {
            ...filters,
            'category.id': newCategoryID,
        };
        onChange(newFilters);
    };
    return (
        <div>
            <FilterByCategory onChange={handleCategoryChange} />
            <FilterByPrice />
        </div>
    );
}

export default ProductFilters;
