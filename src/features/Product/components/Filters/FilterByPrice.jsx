import { Box, Button, TextField, Typography } from '@material-ui/core';
import PropTypes from 'prop-types';
import React, { useState } from 'react';

FilterByPrice.propTypes = {
    onChange: PropTypes.func,
};

function FilterByPrice(props) {
    const { onChange } = props;
    const [values, setValues] = useState({
        salePrice_gte: 0,
        salePrice_lte: 0,
    });

    const handlePriceChange = () => {
        if (!onChange) return;
        onChange(values);
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setValues((prevValues) => ({
            ...prevValues,
            [name]: value,
        }));
    };

    return (
        <Box>
            <Typography variant="subtitle2">Giá</Typography>
            <Box>
                <TextField type="number" name="salePrice_gte" value={values.salePrice_gte} onChange={handleChange} />
                <span> - </span>
                <TextField type="number" name="salePrice_lte" value={values.salePrice_lte} onChange={handleChange} />
            </Box>
            <Button variant="outlined" color="primary" onClick={handlePriceChange}>
                Áp dụng
            </Button>
        </Box>
    );
}

export default FilterByPrice;
