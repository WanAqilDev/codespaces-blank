import { createContext, useContext, useState } from "react";

const StateContext = createContext({
  user: null,
  token: null
})

export const ContextProvider = ({children}) => {
  const [user, setUser] = useState({
    name: 'Johan'
  });
  const [token, _setToken] = useState(localStorage.getItem('ACCESS_TOKEN'));
  //const [token, _setToken] = useState(1234);

  const setToken = () => {
    _setToken(token)
    if (token) {
      localStorage.setItem('ACCESS_TOKEN', token);
    } else {
      localStorage.removeItem('ACCESS_TOKEN')
    }
  }

  return (
    <StateContext.Provider value={{
      user,
      token,
      setUser: () => {},
      setToken: () => {}
    }}>
      {children}
    </StateContext.Provider>
  )
}

export const useStateContext = () => useContext(StateContext);
