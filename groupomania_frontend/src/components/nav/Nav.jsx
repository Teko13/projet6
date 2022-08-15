import React, { useContext } from 'react';
import "./nav.css"
import { NavLink } from 'react-router-dom'
import { useNavigate } from 'react-router-dom';
import { ThemeContext } from '../ThemeContext';

const Nav = ({ page }) => {
    const { theme } = useContext(ThemeContext)
    const navigate = useNavigate();
    return (
        <div>
            {
                // prop "page" is set to know the current page to adapt the navbar content
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
                    <NavLink to='/login' onClick={(e) => {
                        e.preventDefault();
                        sessionStorage.removeItem('userData');
                        navigate('/login')
                    }} className={(nav) => (nav.isActive ? "active" : "")} >Déconnexion</NavLink>
                </div>)
            }
            {
                page === 'profil' &&
                (<div className={theme === "dark" ? "nav dark" : "nav"}>
                    <NavLink to="/home">Accueil</NavLink>
                    <NavLink to='/login' onClick={(e) => {
                        e.preventDefault();
                        sessionStorage.removeItem('userData');
                        navigate('/login')
                    }} className={(nav) => (nav.isActive ? "active" : "")} >Déconnexion</NavLink>
                </div>)
            }
        </div>
    );
};

export default Nav;