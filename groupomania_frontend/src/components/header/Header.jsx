import React, { useContext } from 'react';
import LOGORED from "../../assets/logo-png-rouge.png";
import LOGOREDBLANC from "../../assets/logo-png-blanc.png";
import Nav from '../nav/Nav';
import { ThemeContext } from '../ThemeContext';
import './header.css'

const Header = (props) => {
    const { theme } = useContext(ThemeContext)
    return (
        <header className="header container">
            <div className={theme === "dark" ? "logo logo-small-height" : "logo"}>
                <img src={theme === "light" && LOGORED ||
                    theme === "dark" && LOGOREDBLANC} alt="logo de groupomania" />
            </div>
            <Nav page={props.currentPage} />
        </header>
    );
};

export default Header;