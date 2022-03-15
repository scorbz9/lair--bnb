import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getSpots } from '../../store/spots';

import splashImg1 from "../../img/lair--bnb_splash-img1.jpg"

import './SplashPage.css';
import { Link } from 'react-router-dom';

function SplashPage() {
    const dispatch = useDispatch();

    const spots = useSelector(state => state.spotsState.entries);

    return (
        <div id="first">
            <div id="first-main-content">
                <img id="first-background-img" src={splashImg1}></img>
                <div id="first-header-container">
                    <div id="first-header">Let your desire to save money do the booking</div>
                    <Link exact to="/spots" id="first-view-spots-button">
                        <div id="first-view-spots-button-text">
                            I'm flexible
                        </div>
                    </Link>
                </div>
            </div>
        </div>
    )


    // return (
    //     <div id="spots">
    //         <div id="spots-grid">
    //             {spots.map(spot => {
    //                 return (
    //                     <div className="spot" key={`${spot.id}`}>
    //                         <img className="spot-image" src={`${spot.Images[0].imgURL}`}></img>
    //                         <p className="address">{`${spot.address}`}</p>
    //                     </div>
    //                 )
    //             })}
    //         </div>
    //     </div>
    // )

}

export default SplashPage;
