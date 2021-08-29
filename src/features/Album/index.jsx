import propTypes from 'prop-types';
import React from 'react';
import './style.scss';
import AlbumList from './components/List/index'

Album.propTypes = {

}

Album.defaultProps = {

}

function Album(props) {
    const list = [
        {
            id: 1,
            title: "Lala"
        }
    ]

    return (
        <div>
            <AlbumList list={list} />
        </div>
    );

}

export default Album;
