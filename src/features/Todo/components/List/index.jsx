import React from 'react';
import propTypes from 'prop-types';
import classnames from 'classnames';
import './style.scss';

List.propTypes = {
    list: propTypes.array,
    onTodoClick: propTypes.func
}

List.defaultProps = {
    list: [],
    onTodoClick: null
}


function List(props) {
    const { list, onTodoClick } = props;
    const handleTodoClick = (item, index) => {
        if (!onTodoClick) return;
        onTodoClick(item, index);
    };

    return (
        <ul className="todo-list">
            {list.map((item, index) => (
                <li key={item.id}
                    onClick={() => handleTodoClick(item, index)}
                    className={classnames({ active: item.status === 'completed' })}
                >
                    {item.title}
                </li>
            ))}
        </ul>
    );

}

export default List;
