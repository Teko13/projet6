import React, { useContext, useEffect } from 'react';
import { ThemeContext } from '../ThemeContext';
import "./toggle.css"

const Toggle = () => {
    const { theme, updateTheme } = useContext(ThemeContext)
    useEffect(() => {
        localStorage.setItem('theme', theme)
    }, [theme])

    return (
        <div className='toggle-container' onClick={() => {

            theme === "light" ? updateTheme("dark")
                : updateTheme("light")

        }}>
            <div className='toggle-bar'>
                <div className={theme === "dark" ? "toggle-elipse dark" : "toggle-elipse"}></div>
            </div>
        </div>
    );
};

export default Toggle;