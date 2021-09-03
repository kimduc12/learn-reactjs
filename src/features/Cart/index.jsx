import {
    Box,
    makeStyles,
    Paper,
    Table,
    TableContainer,
    Typography,
    TableHead,
    TableRow,
    TableCell,
    TableBody,
} from '@material-ui/core';
import ProductThumbnail from 'features/Product/components/ProductThumbnail';
import React from 'react';
import { useSelector } from 'react-redux';
import { formatPrice } from 'utils';
import { cartItemsCountSelector, cartTotalSelector } from './selectors';

const useStyles = makeStyles((theme) => ({
    root: {
        margin: theme.spacing(5, 0),
    },
    paper: {
        padding: theme.spacing(2),
    },
    imgBox: {
        '& > img': {
            maxWidth: '100%',
            width: '120px',
        },
    },
}));

function CartFeature(props) {
    const classes = useStyles();
    const cartItemsCount = useSelector(cartItemsCountSelector);
    const cartTotal = useSelector(cartTotalSelector);
    const cartItems = useSelector((state) => state.cart.cartItems);
    return (
        <Box className={classes.root}>
            <Paper elevation={0} className={classes.paper}>
                <Typography component="h1" variant="h4">
                    Cart
                </Typography>
                <Typography component="h2" variant="h6" align="right">
                    Total count: {cartItemsCount}
                </Typography>
                <TableContainer>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>ID</TableCell>
                                <TableCell align="left">Name</TableCell>
                                <TableCell align="center">Image</TableCell>
                                <TableCell align="left">Price</TableCell>
                                <TableCell align="center">Quantity</TableCell>
                                <TableCell align="right">Total</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {cartItems.map((row) => (
                                <TableRow key={row.id}>
                                    <TableCell>{row.id}</TableCell>
                                    <TableCell align="left">{row.product.name}</TableCell>
                                    <TableCell align="center">
                                        <Box className={classes.imgBox}>
                                            <ProductThumbnail product={row.product} />
                                        </Box>
                                    </TableCell>
                                    <TableCell align="left">{formatPrice(row.product.salePrice)}</TableCell>
                                    <TableCell align="center">{row.quantity}</TableCell>
                                    <TableCell align="right">
                                        {formatPrice(row.product.salePrice * row.quantity)}
                                    </TableCell>
                                </TableRow>
                            ))}
                            <TableRow>
                                <TableCell colSpan={4}></TableCell>
                                <TableCell align="left">Total:</TableCell>
                                <TableCell align="right">{formatPrice(cartTotal)}</TableCell>
                            </TableRow>
                        </TableBody>
                    </Table>
                </TableContainer>
            </Paper>
        </Box>
    );
}

CartFeature.propTypes = {};

export default CartFeature;
