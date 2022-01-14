import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { createSpot } from '../../store/spots'
import './Footer.css';

function Footer() {
    return (
        <div id="footer">
            <a className="git-link" href="https://github.com/scorbz9" target="_blank">Seth Corbett
            <i className="fab fa-github"></i>
            </a>
        </div>
    )
    }


export default Footer;
