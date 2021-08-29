import { Box } from '@material-ui/core';
import React from 'react';
import { Route, Switch, useRouteMatch } from 'react-router-dom';
import ListPage from './pages/ListPage';

function Product(props) {
    const match = useRouteMatch();
    return (
        <Box mt={3}>
            <Switch>
                <Route path={`${match.url}`} exact component={ListPage} />
            </Switch>
        </Box>
    );
}

export default Product;
