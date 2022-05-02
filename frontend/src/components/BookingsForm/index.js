import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';

import Calendar from 'react-calendar';
import { Collapse } from 'react-collapse';

import { createBooking } from '../../store/bookings';

import './BookingsForm.css'
import 'react-calendar/dist/Calendar.css';

const BookingsForm = ({ showBookingsForm, setShowBookingsForm, userId }) => {
    const dispatch = useDispatch();
    const history = useHistory();

    const spot = useSelector(state => state.spotsState.entries)
        .find(spot => spot.id === showBookingsForm)

    const [dateRange, setDateRange] = useState(null);
    const [isOpened, setIsOpened] = useState(false)
    const [errors, setErrors] = useState([])

    const handleCancel = () => {
        setShowBookingsForm(null)
        setDateRange(null)
        setErrors([])
        setIsOpened(false)
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        setErrors([])

        const payload = {
            dateRange,
            spotId: showBookingsForm,
            userId
        }

        await dispatch(createBooking(payload))
            .then(async () => {
                history.push('/bookings')
            })
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
        for (let i = 0; i < spot.Bookings.length; i++) {
            let booking = spot.Bookings[i];
            if (new Date(booking.startDate).getTime() <= date.date.getTime() && new Date(booking.endDate) >= date.date.getTime()) {
                return true;
            }
        }
        return false;
    }

    const toggleCalendar = (e) => {
        e.preventDefault();

        setIsOpened(!isOpened)
    }

    return (
        showBookingsForm ?
            <div className="overlay-wrapper">
                <div className="bookings-form-container">
                    <div className="bookings-form__inner-container">
                        <h2 className="bookings-form__header">
                            Make a reservation for: <strong className="bookings-form__address">{spot.address}</strong>
                        </h2>
                        <form onSubmit={handleSubmit}>
                            <Collapse isOpened={isOpened}>
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
                            </Collapse>
                                {isOpened ?
                                <button type="submit" className="bookings-form-submit">Reserve</button>
                                : <button onClick={toggleCalendar} className="bookings-form-submit">Make a Reservation</button>
                                }

                                <button className="bookings-form__cancel" onClick={handleCancel}>Cancel</button>
                            </form>
                        </div>
                    </div>
                </div>
        : <></>
    )
}

export default BookingsForm;
