import { csrfFetch } from './csrf';

const LOAD = 'spots/LOAD'
const ADD_SPOT = 'spots/ADD_SPOT';
const EDIT_SPOT = 'spots/EDIT_SPOT'
const DELETE_SPOT = 'spots/DELETE_SPOT'

const load = (list) => ({
    type: LOAD,
    list,
});

const addOneSpot = spot => ({
    type: ADD_SPOT,
    spot
})

const editOneSpot = spot => ({
    type: EDIT_SPOT,
    spot
})

const removeOneSpot = spotId => ({
    type: DELETE_SPOT,
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
     const formData = new FormData();

     for (let key in payload) {
        if (key === "image" && payload[key] === null) {

        } else {
            formData.append(`${key}`, payload[key])
        }
     }

    const response = await csrfFetch('/api/spots/', {
        method: "POST",
        headers: {
        "Content-Type": "multipart/form-data",
        },
        body: formData,
    });

    const spot = await response.json();

    dispatch(addOneSpot(spot))
    return spot;
}

export const editSpot = (payload) => async dispatch => {
    const formData = new FormData();

    for (let key in payload) {
       if (key === "image" && payload[key] === null) {

       } else {
           formData.append(`${key}`, payload[key])
       }
    }

    const response = await csrfFetch('/api/spots/', {
        method: 'PUT',
        headers: { "Content-Type": "multipart/form-data" },
        body: formData
    });

    const spot = await response.json();

    dispatch(editOneSpot(spot));
    return spot;
}

export const removeSpot = payload => async dispatch => {
    payload = { spotId: payload }
    const response = await csrfFetch('/api/spots/', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
    })

    const spotId = await response.json();

    dispatch(removeOneSpot(spotId))
}

const initialState = {
    entries: [],
}

const spotReducer = (state = initialState, action) => {
    switch (action.type) {
        case LOAD: {
            return {
                ...state,
                entries: [...action.list]
            };
        }
        case ADD_SPOT: {
            console.log(action.spot)
            const newState = {...state}

            return { ...newState, entries: [...newState.entries, action.spot]}
        }
        case EDIT_SPOT: {
            const newState = { ...state };

            const spotToEditId = action.spot.id;
            const spotToEdit = newState.entries.find(spot => spot.id === spotToEditId)
            const spotToEditIndex = newState.entries.indexOf(spotToEdit)

            newState.entries[spotToEditIndex] = action.spot

            return {...newState, entries: newState.entries };
        }
        case DELETE_SPOT: {
            const newState = { ...state };

            const spotToDelete = newState.entries.find(spot => spot.id === action.spotId)
            const spotToDeleteIndex = newState.entries.indexOf(spotToDelete)

            const left = newState.entries.slice(0, spotToDeleteIndex)
            const right = newState.entries.slice(spotToDeleteIndex + 1)

            return {...newState, entries: [...left, ...right]};
        }
        default:
            return state;
    }
}

export default spotReducer;
