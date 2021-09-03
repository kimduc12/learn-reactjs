import { Box, Link, makeStyles } from '@material-ui/core';
import React from 'react';
import { NavLink, useRouteMatch } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
    root: {
        margin: theme.spacing(5, 0),
        padding: 0,
        listStyleType: 'none',
        display: 'flex',
        flexFlow: 'row nowrap',
        justifyContent: 'center',
        alignItems: 'center',
        '& > li': {
            padding: theme.spacing(1, 5),
        },
        '& > li > a': {
            color: theme.palette.grey[800],
            fontSize: '25px',
        },
        '& > li > a.active': {
            color: theme.palette.primary.main,
            textDecoration: 'underline',
        },
    },
}));

function ProductMenu(props) {
    const match = useRouteMatch();
    const classes = useStyles();
    return (
        <Box component="ul" className={classes.root}>
            <li>
                <Link component={NavLink} to={`${match.url}`} exact>
                    Description
                </Link>
            </li>
            <li>
                <Link component={NavLink} to={`${match.url}/additional`} exact>
                    Additional
                </Link>
            </li>
            <li>
                <Link component={NavLink} to={`${match.url}/reviews`} exact>
                    Reviews
                </Link>
            </li>
        </Box>
    );
}

ProductMenu.propTypes = {};

export default ProductMenu;
