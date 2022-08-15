import React, { createContext, useState } from "react";

// creation of context to manipulate website theme
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