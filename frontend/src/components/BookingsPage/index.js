import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getBookings } from "../../store/bookings";

import './BookingsPage.css'

const BookingsPage = () => {
    const dispatch = useDispatch()

    useEffect(async () => {
        await dispatch(getBookings())
    }, [])

    const bookings = useSelector(state => state.bookingsState.entries)
    console.log(bookings)


    return (
        <div className="bookings-page">
            <h2 className="bookings-page__header">View your bookings</h2>
            <div className="bookings-page__bookings">
                {bookings.map((booking, index) => {
                    return (
                        <div className="bookings-page__booking" key={index}>
                            <img src={booking.Spot.Images[0].imgURL} className="bookings-page__spot-image"/>
                            <h3 className="bookings-page__spot-address">
                                {booking.Spot.address}
                            </h3>
                            <p className="bookings-page__booking-date-range">
                                {booking.startDate} - {booking.endDate}
                            </p>
                            <button className="bookings-page__edit-booking-button">
                                Edit
                            </button>
                            <button className="bookings-page__delete-booking-button">
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
