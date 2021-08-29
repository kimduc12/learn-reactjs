import { Button } from '@material-ui/core';
import queryString from 'query-string';
import React, { useEffect, useMemo, useState } from 'react';
import { useHistory, useLocation, useRouteMatch } from 'react-router-dom';
import TodoForm from '../../components/Form';
import List from '../../components/List/index';

function TodoListPage(props) {
    const initList = [
        {
            id: 1,
            title: 'Sleep',
            status: 'new',
        },
        {
            id: 2,
            title: 'Eat',
            status: 'completed',
        },
        {
            id: 3,
            title: 'Walk',
            status: 'new',
        },
    ];

    const location = useLocation();
    const history = useHistory();
    const match = useRouteMatch();
    const [list, setList] = useState(initList);

    const handleTodoClick = (item, index) => {
        let newList = [...list];
        newList[index] = {
            ...item,
            status: newList[index].status === 'new' ? 'completed' : 'new',
        };
        setList(newList);
    };

    const [filterStatus, setFilterStatus] = useState(() => {
        const param = queryString.parse(location.search);
        return param.status || 'all';
    });

    useEffect(() => {
        const param = queryString.parse(location.search);
        setFilterStatus(param.status || 'all');
    }, [location.search]);

    const handleShowAll = () => {
        const queryParams = { status: 'all' };
        history.push({
            pathname: match.path,
            search: queryString.stringify(queryParams),
        });
    };

    const handleShowComplete = () => {
        const queryParams = { status: 'completed' };
        history.push({
            pathname: match.path,
            search: queryString.stringify(queryParams),
        });
    };

    const handleShowNew = () => {
        const queryParams = { status: 'new' };
        history.push({
            pathname: match.path,
            search: queryString.stringify(queryParams),
        });
    };

    const filterList = useMemo(() => {
        return list.filter((item) => filterStatus === 'all' || item.status === filterStatus);
    }, [list, filterStatus]);

    const handleSubmit = (values) => {
        const newTodo = {
            id: list.length + 1,
            title: values.title,
            status: 'new',
        };
        const newTodoList = [...list, newTodo];
        setList(newTodoList);
    };

    return (
        <div>
            <h3>To do form</h3>
            <TodoForm onSumit={handleSubmit} />

            <h3>To do list</h3>
            <List list={filterList} onTodoClick={handleTodoClick} />
            <div>
                <Button variant="contained" color="primary" onClick={handleShowAll}>
                    Show All
                </Button>
                <Button color="primary" onClick={handleShowComplete}>
                    Show Complete
                </Button>
                <Button color="primary" onClick={handleShowNew}>
                    Show New
                </Button>
            </div>
        </div>
    );
}

export default TodoListPage;
