import React from 'react';
import { Route, Switch, useRouteMatch } from 'react-router-dom';
import ListPage from './pages/ListPage';

function Product(props) {
    const match = useRouteMatch();
    return (
        <Switch>
            <Route path={`${match.url}`} exact component={ListPage} />
        </Switch>
    );
}

export default Product;
