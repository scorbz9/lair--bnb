import { csrfFetch } from './csrf';

const LOAD_BOOKINGS = 'bookings/LOAD_BOOKINGS'
const ADD_BOOKING = 'bookings/ADD_BOOKING'
const EDIT_BOOKING = 'bookings/EDIT_BOOKING'
const DELETE_BOOKING = 'bookings/DELETE_BOOKING'

const loadAllBookings = payload => ({
    type: LOAD_BOOKINGS,
    payload,
});

const addOneBooking = payload => ({
    type: ADD_BOOKING,
    payload
});

const editOneBooking = payload => ({
    type: EDIT_BOOKING,
    payload
});

const deleteOneBooking = payload => ({
    type: DELETE_BOOKING,
    payload
})

export const getUserBookings = (userId) => async dispatch => {
    const response = await csrfFetch(`/api/users/${userId}/bookings`)

    const bookings = response.json();
    console.log(bookings)
    dispatch(loadAllBookings(bookings))
}

export const createBooking = (payload) => async dispatch => {
    const response = await csrfFetch(`/api/bookings/`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
    });
    console.log('do i make it here!!!??')

    const booking = await response.json();

    dispatch(addOneBooking(booking))
    return booking;
}

export const editBooking = (payload) => async dispatch => {

    const response = await csrfFetch(`/api/bookings`, {
        method: "PUT",
        headers: {
        "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
    });

    const updatedBooking = await response.json();

    dispatch(editOneBooking(updatedBooking))
    return updatedBooking;
}

export const deleteBooking = (payload) => async dispatch => {

    const response = await csrfFetch(`/api/bookings`, {
        method: "DELETE",
        headers: {
        "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
    });

    const bookingToDelete = await response.json();
    dispatch(deleteOneBooking(bookingToDelete))
}

const initialState = {
    entries: [],
}

const bookingsReducer = (state = initialState, action) => {
    switch (action.type) {
        case LOAD_BOOKINGS: {
            return {...state}
        }
        case ADD_BOOKING: {
            return {...state}
        }
        case EDIT_BOOKING: {
            return {...state}
        }
        case DELETE_BOOKING: {
            return {...state}
        }
        default:
            return state;
    }
}

export default bookingsReducer;
