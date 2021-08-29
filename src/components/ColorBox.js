import React from 'react';
import propTypes from 'prop-types';

function ColorBox(props) {
    const { color } = props;

    return (
        <div>
            {color}
        </div>
    );

}

ColorBox.propTypes = {
    color: propTypes.string.isRequired
}

ColorBox.defaultProps = {
    color: "red"
}


export default ColorBox;
