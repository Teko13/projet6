import React, { useContext, useEffect } from 'react';
import { ThemeContext } from '../ThemeContext';
import { MdLightMode } from 'react-icons/md'
import { MdOutlineLightMode } from 'react-icons/md'
import { MdDarkMode } from 'react-icons/md'
import { MdOutlineDarkMode } from 'react-icons/md'


import "./toggle.css"
// the theme switch to chose dark or light mode
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
            {
                theme === "light" ? <MdLightMode className='them-icon' /> : <MdOutlineLightMode className='them-icon' />
            }
            <div className='toggle-bar'>
                <div className={theme === "dark" ? "toggle-elipse dark" : "toggle-elipse"}></div>
            </div>
            {
                theme === "light" ? <MdOutlineDarkMode className='them-icon' /> : <MdDarkMode className='them-icon' />
            }
        </div>
    );
};

export default Toggle;