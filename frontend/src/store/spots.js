import { csrfFetch } from './csrf';

const LOAD = 'spots/LOAD'
const ADD_ONE = 'spots/ADD_ONE';

const load = spots => ({
    type: LOAD,
    spots,
});

const addOneSpot = spot => ({
    type: ADD_ONE,
    spot
})

export const getSpots = () => async dispatch => {
    const response = await csrfFetch('/api/spots')
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

    dispatch(addOneSpot(spot))
    return spot;
}

const spotReducer = (state = {}, action) => {
    switch (action.type) {
        case LOAD: {

        }
        case ADD_ONE: {
            if (!state[action.spot.id]) {
                const newState = {
                    ...state,
                    [action.spot.id]: action.spot
                };
                console.log(newState)
                return newState;
            }
            console.log(state)
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
