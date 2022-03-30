import React, { useEffect, useState } from 'react';

import { useDispatch, useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import { removeSpot } from '../../store/spots';

import SpotMap from './SpotMap';

import { getSpots } from '../../store/spots';

import './SpotsPage.css';

function SpotsPage({ allSpots }) {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getSpots())
      }, [dispatch]);

    const sessionUser = useSelector(state => state.session.user);
    const userId = parseInt(useParams().userId, 10)

    let spots = useSelector(state => state.spotsState.entries);

    if (!allSpots) {
        spots = spots.filter(spot => spot.userId === userId)
    }

    const [currentMapSpotIndex, setCurrentMapSpotIndex] = useState(0)

    const updateMap = (index) => {
        setCurrentMapSpotIndex(index)
    }

    const handleDelete = (spotId) => {
        setCurrentMapSpotIndex(0)
        dispatch(removeSpot(spotId))
    }


    if (!spots.length) return <h1 className="bad-url-catch-header">There's nothing here! <Link className="bad-url-home-link" to="/">Return to safety.</Link></h1>

    return (
        <div id="my-spots-container">
            <div id="spot-list-container">
                { allSpots ? <p id="lead-in">View all available spots...</p>
                    : !allSpots && sessionUser?.id === userId ? <p id="lead-in">View the spots you host...</p>
                    : <p id="lead-in">View this user's spots...</p>
                }
                {spots.map((spot, index) => {
                    let currentSpotAmenities = spot.Amenities[0];
                    let sampleAmenities = [];

                    for (let key in currentSpotAmenities) {
                        if (currentSpotAmenities[key] === true) {

                            // Convert camel case to normal writing conventions
                            const text = key
                            const result = text.replace(/([A-Z])/g, " $1");
                            const finalResult = result.charAt(0).toUpperCase() + result.slice(1);

                            sampleAmenities.push(finalResult)
                            if (sampleAmenities.length > 3) break;
                        }
                    }

                    return (
                        <div key={`${spot.id}`} className="spot-container">
                                <img onClick={() => updateMap(index)} className="spot-image" src={`${spot.Images[0].imgURL}`} alt="Lair"></img>
                                <div className="spot-info-container">
                                    <h3 onClick={() => updateMap(index)} className="spot-address">{`${spot.address}`}</h3>
                                    <ul className="spot-amenity-preview">
                                        {sampleAmenities.map((amenity) => {
                                            return (
                                                <li className="spot-amenity-item" key={`${amenity}`}>{amenity}</li>
                                            )
                                        })
                                        }
                                    </ul>
                                    <div className="spot-description">
                                        {spot.description}
                                    </div>
                                </div>

                                    <p className="spot-price">{`$${spot.pricePerNight} / night`}</p>

                            {sessionUser?.id === spot.userId ?
                                <div className="edit-and-delete">
                                    <Link to={`/spots/${spot.id}/edit`} className="edit-link">Edit</Link>
                                    <div onClick={() => handleDelete(spot.id)} className="delete-link">Delete</div>
                                </div>
                            : <></>}
                        </div>
                    )
                })
                }
            </div>
            <SpotMap currentMapSpotIndex={currentMapSpotIndex} setCurrentMapSpotIndex={setCurrentMapSpotIndex} spots={spots}/>
        </div>
    )
}

export default SpotsPage;
