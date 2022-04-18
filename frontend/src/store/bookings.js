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

export const getBookings = (userId) => async dispatch => {
    const response = await csrfFetch(`/api/users/${userId}/bookings`)

    const bookings = response.json();

    dispatch(loadAllBookings(bookings))
}

export const createBooking = (payload, userId) => async dispatch => {

    const response = await csrfFetch(`/api/users/${userId}/bookings`, {
        method: "POST",
        headers: {
        "Content-Type": "application/json",
        },
        body: payload,
    });

    const booking = await response.json();

    dispatch(addOneBooking(booking))
    return booking;
}

export const editBooking = (payload, userId) => async dispatch => {

    const response = await csrfFetch(`/api/users/${userId}/bookings`, {
        method: "PUT",
        headers: {
        "Content-Type": "application/json",
        },
        body: payload,
    });

    const updatedBooking = await response.json();

    dispatch(editOneBooking(updatedBooking))
    return updatedBooking;
}

export const deleteBooking = (bookingId, userId) => async dispatch => {

    const response = await csrfFetch(`/api/users/${userId}/bookings`, {
        method: "DELETE",
        headers: {
        "Content-Type": "application/json",
        },
        body: payload,
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
