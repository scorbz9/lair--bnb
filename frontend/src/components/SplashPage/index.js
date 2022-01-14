import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getSpots } from '../../store/spots';
import './SplashPage.css';

function SplashPage() {
    const dispatch = useDispatch();
    const spots = useSelector(state => {
        return state.spots.list.map(spot => state.spots[spot.id])
    });

    useEffect(() => {
        dispatch(getSpots())
    }, [dispatch])

    return (
        <div id="spots">
            <div id="spots-grid">
                {spots.map(spot => {
                    return (
                        <div className="spot" key={`${spot.id}`}>
                            <img className="spot-image" src={`${spot.Images[0].imgURL}`}></img>
                            <p className="address">{`${spot.address}`}</p>
                        </div>
                    )
                })}
            </div>
        </div>
    )

}

export default SplashPage;
