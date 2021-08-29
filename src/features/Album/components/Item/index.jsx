import propTypes from 'prop-types';
import React from 'react';
import './style.scss';

AlbumItem.propTypes = {
    item: propTypes.object.isRequired
}

AlbumItem.defaultProps = {
    item: {}
}

function AlbumItem(props) {
    const { item } = props;

    return (
        <li key={item.id}>
            {item.title}
        </li>
    );

}

export default AlbumItem;
