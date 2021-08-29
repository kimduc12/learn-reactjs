import React from 'react';
import { Route, Switch, useRouteMatch } from 'react-router-dom';
import TodoDetailPage from './pages/Detail';
import TodoListPage from './pages/List';

function Todo(props) {
    const match = useRouteMatch();
    return (
        <Switch>
            <Route path={match.path} component={TodoListPage} exact />
            <Route path={`${match.path}/:todoID`} component={TodoDetailPage} />
        </Switch>
    );
}

export default Todo;
