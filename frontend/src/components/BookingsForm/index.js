import React, { useState } from 'react';
import { useSelector } from 'react-redux';

import Calendar from 'react-calendar';

import './BookingsForm.css'
import 'react-calendar/dist/Calendar.css';

const BookingsForm = () => {
    const userId = useSelector(state => state.session.user.id)

    const [dateRange, setDateRange] = useState()

    const handleSubmit = async (e) => {
        e.preventDefault()

        const payload = {
            startDate: dateRange[0],
            endDate: dateRange[1],
            userId
        }

        console.log(payload)
    }

    // Function to pass to calendar to make already-booked dates unselectable
    // TODO
    const handleAlreadyBooked = () => {
        return 1;
    }

    return (
        <div className="overlay-wrapper">
            <div className="bookings-form-container">
                <form onSubmit={handleSubmit}>
                    <Calendar
                        value={dateRange}
                        onChange={setDateRange}
                        minDetail={"year"}
                        selectRange={true}
                    />
                    <button type="submit" className="bookings-form-submit">Reserve</button>
                </form>
            </div>
        </div>
    )
}

export default BookingsForm;
