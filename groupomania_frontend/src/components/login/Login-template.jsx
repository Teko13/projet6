import React, { useContext, useState } from 'react';
import Footer from '../footer/Footer';
import axios from 'axios';
import Header from '../header/Header';
import { ThemeContext } from '../ThemeContext';
import { useNavigate } from 'react-router-dom';

const LoginTemplate = () => {
    const [email, setEmail] = useState('');
    const navigate = useNavigate();
    const [password, setPassword] = useState('')
    function loginFunction(e) {
        e.preventDefault();
        axios({
            method: 'post',
            url: 'http://localhost:4200/api/auth/login',
            data: {
                email: email,
                password: password
            }
        })
            .then((res) => {
                const now = new Date();
                const userData = [res.data.userId, email, res.data.token, now];
                sessionStorage.setItem('userData', JSON.stringify(userData));
                navigate('/home')
            })
            .catch(error => { console.log(error); })
    }
    const { theme } = useContext(ThemeContext)
    return (
        <div className={theme === "dark" ? "dark container" : "container"}>
            <Header currentPage='login-signup' />
            <div className="loin-signup-body">
                <div className="input-container">
                    <form onSubmit={loginFunction} className={theme === "dark" ? 'input-content dark' : 'input-content'}>
                        <h1>Connexion</h1>
                        <div className="email-content">
                            <label htmlFor="email">E-mail:</label>
                            <input type="email" value={email} onChange={(e) => { setEmail(e.target.value) }
                            } placeholder="ex:abc@gmail.com" className="email-input" id="email" />
                        </div>
                        <div className="password-content">
                            <label htmlFor="password">Mot de pass:</label>
                            <input type="password" value={password} onChange={(e) => { setPassword(e.target.value) }
                            } id="password" className="password-input" />
                        </div>
                        <button type='submit' className="submit-btn">Connexion</button>
                    </form>
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default LoginTemplate;