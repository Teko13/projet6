import React from 'react';
import "./login-signup.css"
import ThemeContextProvider from '../../components/ThemeContext';
import SignupTemplate from '../../components/signup/Signup-template';

const Signup = () => {
    return (
        <div className='container' >
            <ThemeContextProvider>
                <SignupTemplate />
            </ThemeContextProvider>
        </div>
    );
};

export default Signup;