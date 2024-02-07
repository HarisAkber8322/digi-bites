// // components/ThemeContext.js
// import React, { createContext, useContext, useState } from 'react';

// // Define your light and dark themes
// export const lightTheme = {
//   background: '#ffffff',
//   text: '#000000',
// };

// export const darkTheme = {
//   background: '#333333',
//   text: '#ffffff',
// };

// // Create a context for the theme
// const ThemeContext = createContext();

// // Custom hook to consume the theme context
// export const useTheme = () => {
//   const context = useContext(ThemeContext);
//   if (!context) {
//     throw new Error('useTheme must be used within a ThemeProvider');
//   }
//   return context;
// };

// // Theme provider component
// export const ThemeProvider = ({ children }) => {
//   const [theme, setTheme] = useState('light');

//   const toggleTheme = () => {
//     setTheme((prevTheme) => (prevTheme === 'light' ? 'dark' : 'light'));
//   };

//   const themeValues = {
//     theme,
//     toggleTheme,
//     themes: {
//       light: lightTheme,
//       dark: darkTheme,
//     },
//   };

//   return (
//     <ThemeContext.Provider value={themeValues}>
//       {children}
//     </ThemeContext.Provider>
//   );
// };
// export default ThemeProvider;