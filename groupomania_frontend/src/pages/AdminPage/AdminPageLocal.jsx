import React from 'react';
import './admin.css'
import ThemeContextProvider from '../../components/ThemeContext';
import AdminPage from '../../components/adminPage/AdminPage';

const AdminPageLocal = () => {
    return (
        <ThemeContextProvider>
            <AdminPage />
        </ThemeContextProvider>
    );
};

export default AdminPageLocal;
