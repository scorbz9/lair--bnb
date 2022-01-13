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
        <div id="spots-container">
            <div id="spots-grid">
                {spots.map(spot => {
                    return <p key={`${spot.id}`}>{`${spot.address}`}</p>
                })}
            </div>
        </div>
    )

}

export default SplashPage;
