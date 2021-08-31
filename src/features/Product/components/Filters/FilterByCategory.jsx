import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Box, makeStyles, Typography } from '@material-ui/core';
import categoryApi from 'api/categoryApi';

FilterByCategory.propTypes = {
    onChange: PropTypes.func,
};

const useStyles = makeStyles((theme) => ({
    root: {},
    ul: {
        paddingLeft: 0,
    },
    li: {
        listStyle: 'none',
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
        onChange(category.id);
    };

    return (
        <Box padding={1}>
            <Typography>Danh mục</Typography>
            <ul className={classes.ul}>
                {categoryList.map((category) => (
                    <li className={classes.li} key={category.id} onClick={() => handleCategoryClick(category)}>
                        {category.name}
                    </li>
                ))}
            </ul>
        </Box>
    );
}

export default FilterByCategory;
