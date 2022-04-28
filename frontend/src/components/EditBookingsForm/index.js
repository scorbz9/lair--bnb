import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import Calendar from 'react-calendar';

import { editBooking } from '../../store/bookings';

import './EditBookingsForm.css'
import 'react-calendar/dist/Calendar.css';

const EditBookingsForm = ({ showEditBookingsForm, setShowEditBookingsForm, spotId }) => {
    const dispatch = useDispatch();

    const booking = useSelector(state => state.bookingsState.entries)
        .find(booking => booking.id === showEditBookingsForm)

    const spotBookings = useSelector(state => state.bookingsState.entries)
        .filter(booking => booking.Spot.id === spotId)

    const [dateRange, setDateRange] = useState([booking?.startDate, booking?.endDate]);
    const [errors, setErrors] = useState([])

    const handleCancel = () => {
        setShowEditBookingsForm(null)
        setDateRange(null)
        setErrors([])
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        setErrors([])

        const payload = {
            dateRange,
            bookingId: showEditBookingsForm,
        }

        await dispatch(editBooking(payload))
            .catch(async (res) => {
                const data = await res.json()
                if (data.errors) setErrors(data.errors)
            })
    }

    // Function to pass to calendar to make already-booked/previous dates unselectable
    const handleAlreadyBooked = date => {
        const today = new Date().setHours(0, 0, 0, 0);

        // Makes date tiles that are before the current date unselectable
        if (date.date.getTime() < today) {
            return true;
        }

        // Check each date tile to see if it is within a date range that is already booked
        for (let i = 0; i < spotBookings.length; i++) {
            let booking = spotBookings[i];
            if (new Date(booking.startDate).getTime() <= date.date.getTime() && new Date(booking.endDate) >= date.date.getTime()) {
                return true;
            }
        }
        return false;
    }

    return (
        showEditBookingsForm ?
        <div className="overlay-wrapper">
            <div className="bookings-form-container">
                <h2>
                    Edit your reservation for: {booking.Spot.address}
                </h2>
                <form onSubmit={handleSubmit}>
                    <label htmlFor="bookings-form__calendar-input">
                        {errors.map((error, index) => {
                            return <div key={index}>{error}</div>
                        })}
                    </label>
                    <Calendar
                        value={dateRange}
                        onChange={setDateRange}
                        minDetail={"year"}
                        selectRange={true}
                        tileDisabled={handleAlreadyBooked}
                        id="bookings-form__calendar-input"
                    />
                    <button type="submit" className="bookings-form-submit">Reserve</button>
                    <button onClick={handleCancel}>Cancel</button>
                </form>
            </div>
        </div> : <></>
    )
}

export default EditBookingsForm;
