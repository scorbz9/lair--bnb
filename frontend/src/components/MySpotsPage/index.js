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
                {/* {spots.map((spot) => {
                    return (
                        <Link>
                        <div to={`/spots/${spot.id}`}>Hi</div>
                        </Link>
                    )}
                )} */}
            </table>
        </div>
    )
}


export default MySpotsPage;
