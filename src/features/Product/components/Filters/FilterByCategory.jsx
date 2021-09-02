import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Box, makeStyles, Typography } from '@material-ui/core';
import categoryApi from 'api/categoryApi';

FilterByCategory.propTypes = {
    onChange: PropTypes.func,
};

const useStyles = makeStyles((theme) => ({
    root: {
        padding: theme.spacing(2),
    },
    ul: {
        padding: 0,
        margin: 0,
    },
    li: {
        listStyle: 'none',
        marginTop: theme.spacing(1),
        '&:hover': {
            color: theme.palette.primary.main,
            cursor: 'pointer',
        },
    },
}));

function FilterByCategory(props) {
    const { onChange } = props;
    const classes = useStyles();
    const [categoryList, setCategoryList] = useState([]);
    useEffect(() => {
        (async () => {
            try {
                const result = await categoryApi.getAll({});
                console.log('category list: ', result);
                setCategoryList(result);
            } catch (error) {
                console.log('category API get all error: ', error);
            }
        })();
    }, []);

    const handleCategoryClick = (category) => {
        if (!onChange) return;
        onChange(category.id, category.name);
    };

    return (
        <Box className={classes.root}>
            <Typography variant="subtitle2">DANH MỤC SẢN PHẨM</Typography>
            <ul className={classes.ul}>
                {categoryList.map((category) => (
                    <li className={classes.li} key={category.id} onClick={() => handleCategoryClick(category)}>
                        <Typography variant="body2">{category.name}</Typography>
                    </li>
                ))}
            </ul>
        </Box>
    );
}

export default FilterByCategory;
