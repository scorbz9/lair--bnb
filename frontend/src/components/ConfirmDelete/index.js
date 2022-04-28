import React from "react";

import './ConfirmDelete.css'

const ConfirmDelete = ({ type, showConfirmDelete, setShowConfirmDelete, handleDelete }) => {

    if (type === 'Spot') {
        return (
            showConfirmDelete ?
            <div className="overlay-wrapper">
                <div className="confirm-delete-container">
                    <div className="confirm-delete-inner-container">
                        <p className="confirm-delete-text">
                            Are you sure you'd like to delete this spot?
                        </p>
                        <div className="confirm-delete-button-container">
                            <button className="confirm-delete-button" onClick={() => handleDelete(showConfirmDelete)}>
                                    Delete Spot
                            </button>
                            <button className="confirm-delete-cancel" onClick={() => setShowConfirmDelete(null)} >Cancel</button>
                        </div>
                    </div>
                </div>
            </div> : <></>
        )
    } else {

        return (
            showConfirmDelete ?
            <div className="overlay-wrapper">
                <div className="confirm-delete-container">
                    <div className="confirm-delete-inner-container">
                        <p className="confirm-delete-text">
                            Are you sure you'd like to delete this booking?
                        </p>
                        <div className="confirm-delete-button-container">
                            <button className="confirm-delete-button" onClick={() => handleDelete(showConfirmDelete)}>
                                    Delete Booking
                            </button>
                            <button className="confirm-delete-cancel" onClick={() => setShowConfirmDelete(null)} >Cancel</button>
                        </div>
                    </div>
                </div>
            </div> : <></>
        )
    }



}

export default ConfirmDelete;
