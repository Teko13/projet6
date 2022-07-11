import React from 'react';
import ThemeContextProvider from '../../components/ThemeContext';
import LoginTemplate from '../../components/login/Login-template';

const Login = () => {
    return (
        <ThemeContextProvider>
            <LoginTemplate />
        </ThemeContextProvider>
    );
};

export default Login;