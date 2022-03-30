import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getSpots } from '../../store/spots';

import splashImg1 from "../../img/lair--bnb_splash-img1_compress.jpg"
import splashImg2 from "../../img/lair--bnb_splash-img2_compress.jpg"
import splashImg4 from "../../img/lair--bnb_splash-img4_compress.jpg"

import './SplashPage.css';
import { Link } from 'react-router-dom';

function SplashPage() {
    const dispatch = useDispatch();

    const user = useSelector(state => state.session.user)
    const spots = useSelector(state => state.spotsState.entries);

    return (
        <>
            <div id="first">
                <div id="first-main-content">
                    <img id="first-background-img" src={splashImg1}></img>
                    <div id="first-header-container">
                        <div id="first-header">Let your desire to save money do the booking</div>
                        <Link to={user ? "/spots" : "/signup"} id="first-view-spots-button">
                            <div id="first-view-spots-button-text">
                                I'm flexible
                            </div>
                        </Link>
                    </div>
                </div>
            </div>
            <div id="second">
                <div id="second-main-content">
                    <div id="second-header">
                        Discover Lairbnb Experiences
                    </div>
                    <div id="second-section-container">
                        <div id="second-section-one">
                            <div id="second-section-one-content">
                                <div id="second-section-one-header">
                                    <strong>Some of them have wifi.</strong>
                                </div>
                                <Link className="second-section-spots-button" to={user ? "/spots" : "/signup"}>Discover</Link>
                            </div>
                            <img src={splashImg2} className="second-background-img" id='second-background-img-one'></img>
                        </div>
                        <div id="second-section-two">
                            <div id="second-section-two-content">
                                <div id="second-section-two-header">
                                    <strong>Think of the money you'll save.</strong>
                                </div>
                                <Link className="second-section-spots-button" to={user ? "/spots" : "/signup"}>View spots now</Link>
                            </div>
                            <img src={splashImg4} className="second-background-img" id='second-background-img-two'></img>
                        </div>
                    </div>
                </div>
            </div>
        </>
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
