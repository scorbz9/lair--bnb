import { csrfFetch } from './csrf';

const LOAD = 'spots/LOAD'
const ADD_ONE = 'spots/ADD_ONE';
const REMOVE_ONE = 'spots/REMOVE_ONE'

const load = (list) => ({
    type: LOAD,
    list,
});

const addOneSpot = spot => ({
    type: ADD_ONE,
    spot
})

const removeOneSpot = spotId => ({
    type: REMOVE_ONE,
    spotId
})

export const getSpots = () => async dispatch => {
    const response = await csrfFetch(`/api/spots`);

    const spots = await response.json();
    dispatch(load(spots))
}

export const getUserSpots = (userId) => async dispatch => {
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

    dispatch(addOneSpot(spot))
    return spot;
}

export const editSpot = (payload) => async dispatch => {
    const response = await csrfFetch('/api/spots', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
    });

    const spot = await response.json();

    dispatch(addOneSpot(spot));
    return spot;
}

export const removeSpot = payload => async dispatch => {
    payload = { spotId: payload }
    const response = await csrfFetch('/api/spots', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
    })

    console.log('I made it back from the fetch')
    const spotId = await response.json();

    dispatch(removeOneSpot(spotId))
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
        case REMOVE_ONE: {
            const newState = { ...state };
            delete newState[action.spotId];
            const listItem = newState.list.find(id => id === action.spotId);
            newState.list.splice(newState.list.indexOf(listItem), 1);

            return newState;
        }
        default:
            return state;
    }
}

export default spotReducer;
