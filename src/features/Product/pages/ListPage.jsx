import { Box, Grid, makeStyles, Paper } from '@material-ui/core';
import productApi from 'api/productApi';
import React, { useEffect, useState } from 'react';
import ProductSkeletonList from '../components/ProductSkeletonList.jsx';

const useStyles = makeStyles((theme) => ({
    root: {},
    left: {
        width: 250,
    },
    right: {
        flex: '1 1 auto',
    },
}));
function ListPage(props) {
    const classes = useStyles();
    const [productList, setProductList] = useState([]);
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        (async () => {
            try {
                const result = await productApi.getAll({ _page: 1, _limit: 10 });
                console.log('product', result);
                setProductList(result.data);
            } catch (error) {
                console.log('product Api getAll error', error);
            }

            // setLoading(false);
        })();
    }, []);
    return (
        <Box className={classes.root}>
            <Grid container spacing={1}>
                <Grid item className={classes.left}>
                    <Paper elevation={0}>Left</Paper>
                </Grid>
                <Grid item className={classes.right}>
                    <Paper elevation={0}>{loading && <ProductSkeletonList length={12} />}</Paper>
                </Grid>
            </Grid>
        </Box>
    );
}

ListPage.propTypes = {};

export default ListPage;
