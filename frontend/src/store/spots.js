import { csrfFetch } from './csrf';

const LOAD = 'spots/LOAD'
const ADD_ONE = 'spots/ADD_ONE';

const load = (spots) => ({
    type: LOAD,
    spots,
});

const addOneSpot = spot => ({
    type: ADD_ONE,
    spot
})

export const getSpots = (userId) => async dispatch => {
    const response = await csrfFetch(`/api/users/${userId}/spots`)
    const spots = await response.json();

    console.log(spots)

    dispatch(load(spots))
}

export const createSpot = (payload) => async dispatch => {
    const response = await csrfFetch('/api/spots', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
    });
    const spot = await response.json();

    dispatch(addOneSpot(spot))
    return spot;
}

const spotReducer = (state = {}, action) => {
    switch (action.type) {
        case LOAD: {
            return {
                ...state,
                ...action.spots
            };
        }
        case ADD_ONE: {
            if (!state[action.spot.id]) {
                const newState = {
                    ...state,
                    [action.spot.id]: action.spot
                };
                return newState;
            }
            return {
                ...state,
                [action.spot.id]: {
                    ...state[action.spot.id],
                    ...action.spot,
                }
            }
        }
        default:
            return state;
    }
}

export default spotReducer;
