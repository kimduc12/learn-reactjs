import React from 'react';
import PropTypes from 'prop-types';
import FilterByCategory from './Filters/FilterByCategory';
import FilterByPrice from './Filters/FilterByPrice';
import FilterByService from './Filters/FilterByService';

ProductFilters.propTypes = {
    filters: PropTypes.object,
    onChange: PropTypes.func,
};

function ProductFilters(props) {
    const { filters, onChange } = props;
    const handleCategoryChange = (newCategoryID, newCategoryName) => {
        if (!onChange) return;
        const newFilters = {
            ...filters,
            'category.id': newCategoryID,
            'category.name': newCategoryName,
        };
        onChange(newFilters);
    };

    const handlePriceChange = (values) => {
        if (!onChange) return;
        onChange(values);
    };

    const handleServiceChange = (values) => {
        if (!onChange) return;
        onChange(values);
    };

    return (
        <div>
            <FilterByCategory onChange={handleCategoryChange} />
            <FilterByPrice onChange={handlePriceChange} />
            <FilterByService filters={filters} onChange={handleServiceChange} />
        </div>
    );
}

export default ProductFilters;
