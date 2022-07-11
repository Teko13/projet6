import React from 'react';
import "./home.css"
import ThemeContextProvider from '../../components/ThemeContext';
import HomeTemplate from '../../components/home/HomeTemplate';

const Home = () => {
    return (
        <ThemeContextProvider>
            <HomeTemplate />
        </ThemeContextProvider>
    );
};

export default Home;