import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';

import Calendar from 'react-calendar';
import { Collapse } from 'react-collapse';

import { editBooking } from '../../store/bookings';

import './EditBookingsForm.css'
import 'react-calendar/dist/Calendar.css';

const EditBookingsForm = ({ showEditBookingsForm, setShowEditBookingsForm, spotId }) => {
    const dispatch = useDispatch();
    const history = useHistory();

    const booking = useSelector(state => state.bookingsState.entries)
        .find(booking => booking.id === showEditBookingsForm)

    const spotBookings = useSelector(state => state.bookingsState.entries)
        .filter(booking => booking.Spot.id === spotId)

    const [dateRange, setDateRange] = useState([booking?.startDate, booking?.endDate]);
    const [isOpened, setIsOpened] = useState(false)
    const [errors, setErrors] = useState([])

    const handleCancel = () => {
        setShowEditBookingsForm(null)
        setDateRange(null)
        setErrors([])
        setIsOpened(false)
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        setErrors([])

        const payload = {
            dateRange,
            bookingId: showEditBookingsForm,
        }

        await dispatch(editBooking(payload))
            .then(async () => {
                setShowEditBookingsForm(null)
                setDateRange(null)
                setErrors([])
                setIsOpened(false)
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
        for (let i = 0; i < spotBookings.length; i++) {
            let booking = spotBookings[i];
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
        showEditBookingsForm ?
        <div className="overlay-wrapper">
            <div className="bookings-form-container">
            <h2 className="bookings-form__header">
                            Edit your reservation for: <strong className="bookings-form__address">{booking.Spot.address}</strong>
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
        </div> : <></>
    )
}

export default EditBookingsForm;
