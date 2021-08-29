import { Button } from '@material-ui/core';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { decrease, increase } from './counterSlice';

function Counter(props) {
    const dispatch = useDispatch();
    const count = useSelector((state) => state.count);
    const handleIncrease = () => {
        const action = increase();
        dispatch(action);
    };
    const handleDecrease = () => {
        const action = decrease();
        dispatch(action);
    };
    return (
        <div>
            Counter: {count}
            <div>
                <Button onClick={handleIncrease}>Increase</Button>
                <Button onClick={handleDecrease}>Decrease</Button>
            </div>
        </div>
    );
}

Counter.propTypes = {};

export default Counter;
