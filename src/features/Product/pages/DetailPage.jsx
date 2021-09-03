import { Box, Grid, makeStyles, Paper } from '@material-ui/core';
import { Skeleton } from '@material-ui/lab';
import { addToCart, showMiniCart } from 'features/Cart/cartSlice';
import React from 'react';
import { useDispatch } from 'react-redux';
import { Route, Switch, useRouteMatch } from 'react-router-dom';
import AddToCartForm from '../components/AddToCartForm';
import ProductAdditional from '../components/ProductAdditional';
import ProductDescription from '../components/ProductDescription';
import ProductInfo from '../components/ProductInfo';
import ProductMenu from '../components/ProductMenu';
import ProductReviews from '../components/ProductReviews';
import ProductThumbnail from '../components/ProductThumbnail';
import useProductDetail from '../hooks/useProductDetail';

const useStyles = makeStyles((theme) => ({
    root: {},
    left: {
        width: 400,
        padding: theme.spacing(1.5),
        borderRight: `1px solid ${theme.palette.grey[300]}`,
    },
    right: {
        flex: '1 1 0',
        padding: theme.spacing(1.5),
    },
}));

function DetailPage() {
    const classes = useStyles();
    const match = useRouteMatch();
    const dispatch = useDispatch();
    const { productId } = match.params;
    const { product, loading } = useProductDetail(productId);

    const handleAddToCartSubmit = (values) => {
        console.log('handleAddToCartSubmit', values);
        dispatch(
            addToCart({
                id: product.id,
                product: product,
                quantity: values.quantity,
            })
        );
        dispatch(showMiniCart());
    };

    return (
        <Box className={classes.root}>
            <Paper elevation={0}>
                <Grid container>
                    <Grid item className={classes.left}>
                        {loading && <Skeleton variant="rect" width="100%" height={200} />}
                        {!loading && <ProductThumbnail product={product} />}
                    </Grid>
                    <Grid item className={classes.right}>
                        {loading && (
                            <>
                                <Skeleton />
                                <Skeleton width="60%" />
                            </>
                        )}
                        {!loading && <ProductInfo product={product} />}
                        {!loading && <AddToCartForm onSubmit={handleAddToCartSubmit} />}
                    </Grid>
                </Grid>
            </Paper>
            <ProductMenu />
            <Switch>
                <Route path={`${match.url}`} exact>
                    <ProductDescription product={product} />
                </Route>
                <Route path={`${match.url}/additional`} component={ProductAdditional} exact />
                <Route path={`${match.url}/reviews`} component={ProductReviews} exact />
            </Switch>
        </Box>
    );
}

export default DetailPage;
