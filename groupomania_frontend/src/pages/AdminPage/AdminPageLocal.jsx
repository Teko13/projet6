import React from 'react';
import './admin.css'
import ThemeContextProvider, { ThemeContext } from '../../components/ThemeContext';
import AdminPage from '../../components/adminPage/AdminPage';

const AdminPageLocal = () => {
    return (
        <ThemeContextProvider>
            <AdminPage />
        </ThemeContextProvider>
    );
};

export default AdminPageLocal;
