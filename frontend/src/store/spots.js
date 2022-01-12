import { csrfFetch } from './csrf';

const LOAD = 'spots/LOAD'
const ADD_ONE = 'spots/ADD_ONE';

const load = (list) => ({
    type: LOAD,
    list,
});

const addOneSpot = spot => ({
    type: ADD_ONE,
    spot
})

export const getSpots = (userId) => async dispatch => {
    const response = await csrfFetch(`/api/users/${userId}/spots`)
    const spots = await response.json();

    dispatch(load(spots))
}

export const createSpot = (payload) => async dispatch => {
    const response = await csrfFetch('/api/spots', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
    });
    const spot = await response.json();
    console.log(spot)
    dispatch(addOneSpot(spot))
    return spot;
}

const initialState = {
    list: [],
}

const spotReducer = (state = initialState, action) => {
    switch (action.type) {
        case LOAD: {
            const allSpots = {};
            action.list.forEach(spot => {
                allSpots[spot.id] = spot;
            });
            return {
                ...allSpots,
                ...state,
                list: action.list
            };
        }
        case ADD_ONE: {
            if (!state[action.spot.spotId]) {
                const newState = {
                    ...state,
                    [action.spot.id]: action.spot
                };
                return newState;
            }
            return {
                ...state,
                [action.spot.id]: {
                    ...state[action.spot.spotId],
                    ...action.spot,
                }
            }
        }
        default:
            return state;
    }
}

export default spotReducer;
