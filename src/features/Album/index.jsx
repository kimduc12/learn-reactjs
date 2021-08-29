import React from 'react';
import AlbumList from './components/List/index';
import './style.scss';

Album.propTypes = {};

Album.defaultProps = {};

function Album(props) {
    const list = [
        {
            id: 1,
            title: 'Lala',
        },
    ];

    return (
        <div>
            <AlbumList list={list} />
        </div>
    );
}

export default Album;
