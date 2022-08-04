import React from 'react';
import './profil.css'
import ProfilComponent from '../../components/profil/ProfilComponent';
import ThemeContextProvider, { ThemeContext } from '../../components/ThemeContext';

const Profil = () => {
    return (
        <ThemeContextProvider>
            <ProfilComponent />
        </ThemeContextProvider>
    );
};

export default Profil;