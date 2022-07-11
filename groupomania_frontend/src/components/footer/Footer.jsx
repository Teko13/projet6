import React from 'react';
import Toggle from '../toggle/Toggle';
import LOGOBLANC from "../../assets/logo-png-blanc.png"
import "./footer.css"

const Footer = () => {
    return (
        <footer className="footer container">
            <div className="logo-footer"><img src={LOGOBLANC} alt="logo groupomania" /></div>
            <Toggle />
            <p>ⓒ GROUPOMANIA - 2022</p>
        </footer>
    );
};

export default Footer;