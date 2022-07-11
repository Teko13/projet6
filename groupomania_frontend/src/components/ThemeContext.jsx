import React, { createContext, useState } from "react";
export const ThemeContext = createContext();
const ThemeContextProvider = (props) => {

    const [theme, updateTheme] = useState(localStorage.getItem('theme'))

    return (
        <ThemeContext.Provider value={{ theme, updateTheme }}>
            {props.children}
        </ThemeContext.Provider>
    )
}

export default ThemeContextProvider;