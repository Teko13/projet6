import React, { useContext } from 'react';
import { NavLink, useParams } from 'react-router-dom';
import Footer from '../footer/Footer';
import Header from '../header/Header';
import { ThemeContext } from '../ThemeContext';

const LoginTemplate = () => {
    const { currentTheme } = useParams()
    const { theme } = useContext(ThemeContext)
    return (
        <div className={theme === "dark" ? "dark container" : "container"}>
            <Header currentPage='login-signup' />
            <div className="loin-signup-body">
                <div className="input-container">
                    <form action="" className={theme === "dark" ? 'input-content dark' : 'input-content'}>
                        <h1>Connexion</h1>
                        <div className="email-content">
                            <label htmlFor="email">E-mail:</label>
                            <input type="email" placeholder="ex:abc@gmail.com" className="email-input" id="email" />
                        </div>
                        <div className="password-content">
                            <label htmlFor="password">Mot de pass:</label>
                            <input type="password" id="password" className="password-input" />
                        </div>
                        <NavLink to="/home" className="home-link">
                            <button className="submit-btn">S'inscrire</button>
                        </NavLink>
                    </form>
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default LoginTemplate;