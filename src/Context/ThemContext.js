import { createContext, useEffect, useReducer } from "react";

export const ThemContext = createContext();

const themReducer = (state, action) => {
  switch (action.type) {
    case 'CHANGE_COLOR':
      return { ...state, color: action.payload };
    case 'CHANGE_MODE':
      return { ...state, mode: action.payload };
    default:
      return state;
  }
};

export function ThemProvider({ children }) {
  const [state, dispatch] = useReducer(themReducer, {
    color: '#58249c',
    mode: 'light',
  });

  useEffect(() => {
    const savedMode = localStorage.getItem('mode');
    const saveColor = localStorage.getItem('color');
    if (savedMode || saveColor) {
      const parsedMode = JSON.parse(savedMode);
      const parsedColor = JSON.parse(saveColor);
      if (parsedMode !== state.mode || parsedColor !== state.color) {
        dispatch({ type: 'CHANGE_MODE', payload: parsedMode });
        dispatch({ type: 'CHANGE_COLOR', payload: parsedColor });
      }
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('mode', JSON.stringify(state.mode));
    localStorage.setItem('color', JSON.stringify(state.color));
  }, [state.mode , state.color]);

  

  const changeColor = (color) => {
    dispatch({ type: 'CHANGE_COLOR', payload: color });
  };

  const changeMode = (mode) => {
    dispatch({ type: 'CHANGE_MODE', payload: mode });
  };

  return (
    <ThemContext.Provider value={{ ...state, changeColor, changeMode }}>
      {children}
    </ThemContext.Provider>
  );
}
