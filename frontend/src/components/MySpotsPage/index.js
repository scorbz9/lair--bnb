import React, { useEffect } from 'react';

import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { getSpots } from '../../store/spots';


import './MySpotsPage.css';

function MySpotsPage() {
    const dispatch = useDispatch();
    const sessionUser = useSelector(state => state.session.user);

    useEffect(() => {
        dispatch(getSpots(sessionUser.id))
    }, [dispatch, sessionUser.id])

    const spots = useSelector(state => {
        return state.spots.list.map(spot => state.spots[spot.id])
    });

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
                            <Link className="link-wrapper" to={`/spots/${spot.id}`}>
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
                                    <p className="spot-price">{`$${spot.pricePerNight} / night`}</p>
                                </div>
                            </Link>
                            <Link to={`/spots/${spot.id}/edit`} className="edit-link">Edit</Link>
                        </div>
                    )
                })
                }
            </div>
        </div>
    )
}

export default MySpotsPage;
