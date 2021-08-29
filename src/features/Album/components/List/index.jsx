import propTypes from 'prop-types';
import React from 'react';
import './style.scss';
import AlbumItem from '../Item/index';

AlbumList.propTypes = {
    list: propTypes.array
}

AlbumList.defaultProps = {
    list: []
}

function AlbumList(props) {
    const { list } = props;

    return (
        <div>
            {list.map(item => (
                <AlbumItem item={item} />
            ))}
        </div>
    );

}

export default AlbumList;
