import React, { useContext } from 'react';
import "./nav.css"
import { NavLink } from 'react-router-dom'
import { ThemeContext } from '../ThemeContext';

const Nav = ({ page }) => {
    const { theme } = useContext(ThemeContext)
    return (
        <div>
            {
                page === 'login-signup' &&
                (<div className={theme === "dark" ? "nav dark" : "nav"}>
                    <NavLink to="/" className={(nav) => (nav.isActive ? "active" : "")}>Inscription</NavLink>
                    <NavLink to="/login" className={(nav) => (nav.isActive ? "active" : "")} >Connexion</NavLink>
                </div>)
            }
            {
                page === 'online' &&
                (<div className={theme === "dark" ? "nav dark" : "nav"}>
                    <NavLink to="/profil">Mon Profil</NavLink>
                    <NavLink to='/login' className={(nav) => (nav.isActive ? "active" : "")} >Déconnexion</NavLink>
                </div>)
            }
        </div>
    );
};

export default Nav;