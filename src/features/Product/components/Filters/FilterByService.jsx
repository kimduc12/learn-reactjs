import { Box, Checkbox, FormControlLabel, makeStyles, Typography } from '@material-ui/core';
import PropTypes from 'prop-types';
import React from 'react';

FilterByService.propTypes = {
    filters: PropTypes.object,
    onChange: PropTypes.func,
};

const useStyles = makeStyles((theme) => ({
    root: {
        padding: theme.spacing(2),
        borderTop: `1px solid ${theme.palette.grey[300]}`,
    },
    list: {
        padding: 0,
        margin: 0,
        '& > li': {
            listType: 'none',
            margin: 0,
            marginTop: theme.spacing(1),
        },
    },
}));

function FilterByService(props) {
    const { filters, onChange } = props;
    const classes = useStyles();

    const handleChange = (e) => {
        if (!onChange) return;

        const { name, checked } = e.target;
        onChange({
            [name]: checked,
        });
    };

    return (
        <Box className={classes.root}>
            <Typography variant="subtitle2">CHỌN KHOẢNG GIÁ</Typography>
            <ul className={classes.list}>
                {[
                    { label: 'Có khuyến mãi', value: 'isPromotion' },
                    { label: 'Vận chuyển miễn phí', value: 'isFreeShip' },
                ].map((item) => (
                    <li key={item.value}>
                        <FormControlLabel
                            control={
                                <Checkbox
                                    checked={Boolean(filters[item.value])}
                                    onChange={handleChange}
                                    name={item.value}
                                    color="primary"
                                />
                            }
                            label={item.label}
                        />
                    </li>
                ))}
            </ul>
        </Box>
    );
}

export default FilterByService;
