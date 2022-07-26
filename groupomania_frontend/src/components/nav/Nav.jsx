import React, { useContext } from 'react';
import "./nav.css"
import { Navigate, NavLink } from 'react-router-dom'
import { ThemeContext } from '../ThemeContext';
import { useNavigate } from 'react-router-dom';

const Nav = ({ page }) => {
    const { theme } = useContext(ThemeContext)
    const navigate = useNavigate();
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
                    <NavLink to='/login' onClick={(e) => {
                        e.preventDefault();
                        sessionStorage.removeItem('userData');
                        console.log('fermeture de session');
                        navigate('/login')
                    }}>Déconnexion</NavLink>
                </div>)
            }
        </div>
    );
};

export default Nav;