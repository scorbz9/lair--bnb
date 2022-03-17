import React from 'react';

import './SpotMap.css'

let environment = process.env.REACT_APP_GOOGLE_MAP

const SpotMap = ({ currentMapSpotIndex, setCurrentMapSpotIndex, spots }) => {

    return (
        <iframe
            className='embed-map'
            title='location-map'
            src={`https://www.google.com/maps/embed/v1/place?key=${environment}
            &q=${spots[currentMapSpotIndex]['address']}}`}>
        </iframe>
    )
}
export default SpotMap;
