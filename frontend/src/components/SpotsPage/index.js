import React, { useEffect } from 'react';

import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { getSpots, removeSpot } from '../../store/spots';


import './SpotsPage.css';

function SpotsPage({ mySpots }) {
    const dispatch = useDispatch();

    const sessionUser = useSelector(state => state.session.user);

    let spots = useSelector(state => state.spotsState.entries);

    if (mySpots) {
        spots = spots.filter(spot => spot.userId === sessionUser.id)
    }

    if (!spots) return null;

    return (
        <div id="my-spots-container">
            <div id="spot-list-container">
                <p id="lead-in">View the spots you host...</p>
                {spots.map((spot) => {
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
                                <img className="spot-image" src={`${spot.Images[0].imgURL}`} alt="Lair"></img>
                                <div className="spot-info-container">
                                    <h3 className="spot-address">{`${spot.address}`}</h3>
                                    <ul className="spot-amenity-preview">
                                        {sampleAmenities.map((amenity) => {
                                            return (
                                                <li className="spot-amenity-item" key={`${amenity}`}>{amenity}</li>
                                            )
                                        })
                                        }
                                    </ul>
                                </div>

                                    <p className="spot-price">{`$${spot.pricePerNight} / night`}</p>

                            {sessionUser.id === spot.userId ?
                                <div className="edit-and-delete">
                                    <Link to={`/spots/${spot.id}/edit`} className="edit-link">Edit</Link>
                                    <div onClick={() => dispatch(removeSpot(spot.id))} className="delete-link">Delete</div>
                                </div>
                            : <></>}
                        </div>
                    )
                })
                }
            </div>
        </div>
    )
}

export default SpotsPage;
