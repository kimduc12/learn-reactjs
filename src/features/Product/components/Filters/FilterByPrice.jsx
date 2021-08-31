import { Box, Button, makeStyles, TextField, Typography } from '@material-ui/core';
import PropTypes from 'prop-types';
import React, { useState } from 'react';

FilterByPrice.propTypes = {
    onChange: PropTypes.func,
};

const useStyles = makeStyles((theme) => ({
    root: {
        padding: theme.spacing(2),
        borderTop: `1px solid ${theme.palette.grey[300]}`,
    },
    range: {
        display: 'flex',
        flexFlow: 'grow nowrap',
        alignItems: 'center',
        marginTop: theme.spacing(1),
        marginBottom: theme.spacing(1),

        '& > span': {
            marginLeft: theme.spacing(1),
            marginRight: theme.spacing(1),
        },
    },
}));

function FilterByPrice(props) {
    const { onChange } = props;
    const classes = useStyles();
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
        <Box className={classes.root}>
            <Typography variant="subtitle2">CHỌN KHOẢNG GIÁ</Typography>
            <Box className={classes.range} pb={1}>
                <TextField type="number" name="salePrice_gte" value={values.salePrice_gte} onChange={handleChange} />
                <span> - </span>
                <TextField type="number" name="salePrice_lte" value={values.salePrice_lte} onChange={handleChange} />
            </Box>
            <Button variant="outlined" color="primary" size="small" onClick={handlePriceChange}>
                Áp dụng
            </Button>
        </Box>
    );
}

export default FilterByPrice;
