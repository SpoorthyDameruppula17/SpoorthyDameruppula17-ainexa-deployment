import { useSelector } from "react-redux";
import { ThemeColors } from "./Types";
import { RootState } from "../store/store";


const darkColors = () :ThemeColors => {
  const colors = {
    BACKGROUND: {
      primary: '#121212',
      secondary: '#1e1e1e',
      card: '#2c2c2c',
      navbar : '#37474f',
      highleter : 'rgb(19, 21, 85)'
    },

    TEXT: {
      primary: '#000000',
      secondary: '#cccccc',
      muted: '#999999',
      inverted: '#000000',
    },

    LINKS: {
      normal: '#8ab4f8',
      hover: '#a1c4fd',
      visited: '#c58af9',
    },

    SHADOWS: {
      light: '0px 1px 3px rgba(255, 255, 255, 0.05)',
      medium: '0px 4px 6px rgba(255, 255, 255, 0.1)',
      heavy: '0px 10px 20px rgba(255, 255, 255, 0.2)',
    },

    BORDER: {
      light: '#3a3a3a',
      dark: '#555555',
    },

    BUTTON: {
      primary: '#bb86fc',
      primaryText: '#000000',
      secondary: '#333333',
      secondaryText: '#ffffff',
    },

    STATUS: {
      success: '#81c784',
      warning: '#ffb74d',
      error: '#e57373',
      info: '#64b5f6',
    },
  };

  return colors;
};

const lightColors = () : ThemeColors => {
  const colors = {
    BACKGROUND: {
      primary: '#ffffff',
      secondary: '#f5f5f5',
      card: '#ffffff',
      navbar : '#0288d1',
      highleter : 'rgb(19, 21, 85)'
    },

    TEXT: {
      primary: '#ffffff',
      secondary: '#555555',
      muted: '#888888',
      inverted: '#ffffff',
    },

    LINKS: {
      normal: '#1a0dab',
      hover: '#4a00e0',
      visited: '#660099',
    },

    SHADOWS: {
      light: '0px 1px 3px rgba(0, 0, 0, 0.1)',
      medium: '0px 4px 6px rgba(0, 0, 0, 0.1)',
      heavy: '0px 10px 20px rgba(0, 0, 0, 0.2)',
    },

    BORDER: {
      light: '#e0e0e0',
      dark: '#bdbdbd',
    },

    BUTTON: {
      primary: '#6200ee',
      primaryText: '#ffffff',
      secondary: '#f1f1f1',
      secondaryText: '#000000',
    },

    STATUS: {
      success: '#4CAF50',
      warning: '#FFC107',
      error: '#F44336',
      info: '#2196F3',
    },
  };

  return colors;
};


const GlobalColors = () =>{
  const theam = useSelector((state : RootState) => state.theme.theme);
  switch(theam){
    case 'light':
      return lightColors();
    case 'dark':
      return darkColors();
  } 
}

export default GlobalColors;

