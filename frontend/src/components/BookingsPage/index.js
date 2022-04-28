import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteBooking, getBookings } from "../../store/bookings";

import { parseDate } from "../../utils";
import ConfirmDelete from "../ConfirmDelete";
import EditBookingsForm from "../EditBookingsForm";

import './BookingsPage.css'

const BookingsPage = () => {
    const dispatch = useDispatch()

    useEffect(async () => {
        await dispatch(getBookings())
    }, [])

    const bookings = useSelector(state => state.bookingsState.entries)

    const [showEditBookingsForm, setShowEditBookingsForm] = useState(null)
    const [spotIdToEdit, setSpotIdToEdit] = useState(null)

    const [showConfirmDelete, setShowConfirmDelete] = useState(null)

    const toggleEdit = (bookingId, spotId) => {
        setShowEditBookingsForm(bookingId)
        setSpotIdToEdit(spotId)
    }

    const toggleConfirmDelete = (bookingId) => {
        setShowConfirmDelete(bookingId)
    }

    const handleDelete = (bookingId) => {
        dispatch(deleteBooking({ bookingId }))
        setShowConfirmDelete(null)
    }


    return (
        <div className="bookings-page">
            <h2 className="bookings-page__header">View your bookings</h2>
            <EditBookingsForm showEditBookingsForm={showEditBookingsForm} setShowEditBookingsForm={setShowEditBookingsForm} spotId={spotIdToEdit}/>
            <ConfirmDelete type="Booking" showConfirmDelete={showConfirmDelete} setShowConfirmDelete={setShowConfirmDelete} handleDelete={handleDelete}/>
            <div className="bookings-page__bookings">
                {bookings.map((booking, index) => {

                    // Format datetime objects for display
                    const parsedStartDate = parseDate(new Date(booking.startDate))
                    const parsedEndDate = parseDate(new Date(booking.endDate))

                    return (
                        <div className="bookings-page__booking" key={index}>
                            <img src={booking.Spot.Images[0].imgURL} className="bookings-page__spot-image"/>
                            <div className="bookings-page__booking-info">
                                <h3 className="bookings-page__spot-address">
                                    {booking.Spot.address}
                                </h3>
                                <p className="bookings-page__booking-date-range">
                                    {parsedStartDate} - {parsedEndDate}
                                </p>
                                <p className="bookings-page__spot-description">
                                    {booking.Spot.description}
                                </p>
                            </div>
                            <button onClick={() => toggleEdit(booking.id, booking.Spot.id)} className="bookings-page__button bookings-page__button--edit">
                                Edit
                            </button>
                            <button onClick={() => toggleConfirmDelete(booking.id, booking.Spot.id)} className="bookings-page__button bookings-page__button--delete">
                                Delete
                            </button>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}

export default BookingsPage;
