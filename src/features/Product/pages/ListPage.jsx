import { Box, Grid, makeStyles, Paper } from '@material-ui/core';
import { Pagination } from '@material-ui/lab';
import productApi from 'api/productApi';
import React, { useEffect, useState } from 'react';
import ProductList from '../components/ProductList.jsx';
import ProductSkeletonList from '../components/ProductSkeletonList.jsx';

const useStyles = makeStyles((theme) => ({
    root: {},
    left: {
        width: 250,
    },
    right: {
        flex: '1 1 0',
    },
}));
function ListPage(props) {
    const classes = useStyles();
    const [productList, setProductList] = useState([]);
    const [pagination, setPagination] = useState({
        page: 0,
        limit: 12,
        total: 0,
    });
    const [loading, setLoading] = useState(true);
    const [filters, setFilters] = useState({
        _page: 1,
        _limit: 12,
    });
    useEffect(() => {
        (async () => {
            try {
                const result = await productApi.getAll(filters);
                console.log('product', result);
                setPagination(result.pagination);
                setProductList(result.data);
            } catch (error) {
                console.log('product Api getAll error', error);
            }

            setLoading(false);
        })();
    }, [filters]);

    const handlePageChange = (e, page) => {
        setFilters((prevFilters) => ({
            ...prevFilters,
            _page: page,
        }));
    };

    return (
        <Box className={classes.root}>
            <Grid container spacing={1}>
                <Grid item className={classes.left}>
                    <Paper elevation={0}>Left</Paper>
                </Grid>
                <Grid item className={classes.right}>
                    <Paper elevation={0}>
                        {loading && <ProductSkeletonList length={12} />}
                        {!loading && <ProductList data={productList} />}
                        <Pagination
                            onChange={handlePageChange}
                            color="primary"
                            count={Math.ceil(pagination.total / pagination.limit)}
                            page={pagination.page}
                        ></Pagination>
                    </Paper>
                </Grid>
            </Grid>
        </Box>
    );
}

ListPage.propTypes = {};

export default ListPage;
