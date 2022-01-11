import { csrfFetch } from './csrf';

const LOAD = 'spots/LOAD';

const load = spots => ({
    type: LOAD,
    spots,
});

const addOneSpot = spot => ({
    type: ADD_ONE,
    spot
})

export const createSpot = (payload) => async dispatch => {
    const response = await csrfFetch('/spots', {
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
    }
}

export default spotReducer;
