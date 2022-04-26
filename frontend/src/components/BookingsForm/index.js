import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import Calendar from 'react-calendar';

import { createBooking } from '../../store/bookings';

import './BookingsForm.css'
import 'react-calendar/dist/Calendar.css';

const BookingsForm = ({ showBookingsForm, setShowBookingsForm, userId }) => {
    const dispatch = useDispatch();
    const spot = useSelector(state => state.spotsState.entries)
        .find(spot => spot.id === showBookingsForm)

    const [dateRange, setDateRange] = useState(null);
    const [errors, setErrors] = useState([])

    const handleCancel = () => {
        setShowBookingsForm(null)
        setDateRange(null)
        setErrors([])
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        setErrors([])

        const payload = {
            dateRange,
            spotId: showBookingsForm,
            userId
        }
        console.log(payload)

        await dispatch(createBooking(payload))
            .catch(async (res) => {
                const data = await res.json()
                if (data.errors) setErrors(data.errors)
            })
    }

    // Function to pass to calendar to make already-booked dates unselectable
    const handleAlreadyBooked = date => {
        for (let i = 0; i < spot.Bookings.length; i++) {
            let booking = spot.Bookings[i];
            // Check each date tile to see if it is within a date range that is already booked
            if (new Date(booking.startDate).getTime() <= new Date(date.date).getTime() && new Date(booking.endDate) >= new Date(date.date).getTime()) {
                return true;
            }
        }
        return false;
    }

    return (
        showBookingsForm ?
        <div className="overlay-wrapper">
            <div className="bookings-form-container">
                <h2>
                    Make a reservation for: {spot.address}
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

export default BookingsForm;
