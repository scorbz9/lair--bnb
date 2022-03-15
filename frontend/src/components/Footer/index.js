import React, { useState } from 'react';

import './Footer.css';

function Footer() {
    return (
        <div id="footer">
            <div className="footer-content">Developed by Seth Corbett
                <a className="git-link" href="https://github.com/scorbz9" target="_blank">
                    <i className="fab fa-github footer-icon"></i>
                </a>
                <a className="linkedin-link" href="https://www.linkedin.com/in/seth-corbett-230824231/" target="_blank">
                    <i className="fab fa-linkedin footer-icon"></i>
                </a>
            </div>
        </div>
    )
}


export default Footer;
