import { Box, Grid, makeStyles, Paper } from '@material-ui/core';
import queryString from 'query-string';
import { Pagination } from '@material-ui/lab';
import productApi from 'api/productApi';
import React, { useEffect, useMemo, useState } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
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
    const history = useHistory();
    const location = useLocation();
    const queryParams = useMemo(() => {
        var params = queryString.parse(location.search);
        return {
            ...params,
            _page: Number.parseInt(params._page) || 1,
            _limit: Number.parseInt(params._limit) || 12,
            _sort: params._sort || 'salePrice:ASC',
            isPromotion: params.isPromotion === 'true',
            isFreeShip: params.isFreeShip === 'true',
        };
    }, [location.search]);
    const [productList, setProductList] = useState([]);
    const [pagination, setPagination] = useState({
        page: 0,
        limit: 12,
        total: 0,
    });
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        (async () => {
            setLoading(true);
            try {
                const result = await productApi.getAll(queryParams);
                console.log('product', result);
                setPagination(result.pagination);
                setProductList(result.data);
            } catch (error) {
                console.log('product Api getAll error', error);
            }

            setLoading(false);
        })();
    }, [queryParams]);

    const handlePageChange = (e, page) => {
        const filters = {
            ...queryParams,
            _page: page,
        };
        history.push({
            pathname: history.pathname,
            search: queryString.stringify(filters),
        });
    };

    const handleSortChange = (value) => {
        const filters = {
            ...queryParams,
            _sort: value,
        };
        history.push({
            pathname: history.pathname,
            search: queryString.stringify(filters),
        });
    };

    const handleFiltersChange = (newFilters) => {
        const filters = {
            ...queryParams,
            ...newFilters,
        };
        history.push({
            pathname: history.pathname,
            search: queryString.stringify(filters),
        });
    };

    const handleFilterViewerChange = (newFilters) => {
        history.push({
            pathname: history.pathname,
            search: queryString.stringify(newFilters),
        });
    };

    return (
        <Box className={classes.root}>
            <Grid container spacing={1}>
                <Grid item className={classes.left}>
                    <Paper elevation={0}>
                        <ProductFilters filters={queryParams} onChange={handleFiltersChange} />
                    </Paper>
                </Grid>
                <Grid item className={classes.right}>
                    <Paper className={classes.rightPager} elevation={0}>
                        <ProductSort currentSort={queryParams._sort} onChange={handleSortChange} />
                        <FilterViewer filters={queryParams} onChange={handleFilterViewerChange} />
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
