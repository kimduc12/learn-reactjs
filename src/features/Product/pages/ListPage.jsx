import { Box, Grid, makeStyles, Paper } from '@material-ui/core';
import { Pagination } from '@material-ui/lab';
import productApi from 'api/productApi';
import React, { useEffect, useState } from 'react';
import FilterViewer from '../components/FilterViewer.jsx';
import ProductFilters from '../components/ProductFilters.jsx';
import ProductList from '../components/ProductList.jsx';
import ProductSkeletonList from '../components/ProductSkeletonList.jsx';
import ProductSort from '../components/ProductSort.jsx';

const useStyles = makeStyles((theme) => ({
    root: {},
    left: {
        width: 250,
    },
    right: {
        flex: '1 1 0',
    },
    rightPager: {
        paddingTop: theme.spacing(2),
        paddingBottom: theme.spacing(2),
    },
    pagination: {
        display: 'flex',
        flexFlow: 'grow nowrap',
        justifyContent: 'center',
        marginTop: theme.spacing(2),
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
        _sort: 'salePrice:ASC',
    });
    useEffect(() => {
        (async () => {
            setLoading(true);
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

    const handleSortChange = (value) => {
        setFilters((prevFilters) => ({
            ...prevFilters,
            _sort: value,
        }));
    };

    const handleFiltersChange = (newFilters) => {
        setFilters((prevFilters) => ({
            ...prevFilters,
            ...newFilters,
        }));
    };

    const handleFilterViewerChange = (newFilters) => {
        setFilters(newFilters);
    };

    return (
        <Box className={classes.root}>
            <Grid container spacing={1}>
                <Grid item className={classes.left}>
                    <Paper elevation={0}>
                        <ProductFilters filters={filters} onChange={handleFiltersChange} />
                    </Paper>
                </Grid>
                <Grid item className={classes.right}>
                    <Paper className={classes.rightPager} elevation={0}>
                        <ProductSort currentSort={filters._sort} onChange={handleSortChange} />
                        <FilterViewer filters={filters} onChange={handleFilterViewerChange} />
                        {loading && <ProductSkeletonList length={12} />}
                        {!loading && <ProductList data={productList} />}
                        <Box className={classes.pagination}>
                            <Pagination
                                onChange={handlePageChange}
                                color="primary"
                                count={Math.ceil(pagination.total / pagination.limit)}
                                page={pagination.page}
                            ></Pagination>
                        </Box>
                    </Paper>
                </Grid>
            </Grid>
        </Box>
    );
}

ListPage.propTypes = {};

export default ListPage;
