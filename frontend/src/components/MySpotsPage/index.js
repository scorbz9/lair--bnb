import React, { useState, useEffect } from 'react';
import * as sessionActions from '../../store/session';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect, useHistory, Link } from 'react-router-dom';
import { getSpots } from '../../store/spots';

import './MySpotsPage.css';

function MySpotsPage() {
    const dispatch = useDispatch();
    const sessionUser = useSelector(state => state.session.user);

    useEffect(() => {
        dispatch(getSpots(sessionUser.id))
    }, [dispatch])

    const spots = useSelector(state => {
        return state.spots.list.map(spot => state.spots[spot.id])
    });

    console.log(spots)

    if (!spots) return null;

    return (
        <div id="my-spots-container">
            <p>View the spots you host...</p>
            <table>
                <thead>
                    <tr>
                        <th id="spot-list-head">
                        </th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>
                            {spots.map((spot) => {
                                // console.log(spot.Images)
                                return (
                                    <Link className="spot-container" key={`${spot.id}`} to={`/spots/${spot.id}`}>
                                        <img src={`${spot.Images[0].imgURL}`}></img>
                                    </Link>
                                    )
                                })
                            }
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    )
}


export default MySpotsPage;
