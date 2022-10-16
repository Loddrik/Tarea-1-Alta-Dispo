import React, { useState } from 'react'
import AppContext from './Context/AppContext';
import { Router } from './Routes/Router';
import { useCookies } from 'react-cookie';

const App = () => {
  const [user, setUser] = useState({
    authenticated: false,
  })
  
  const [cookie, setCookie] = useCookies(['session-token']);

  return (
    <div className="App">
      <AppContext.Provider value={{ user, setUser, cookie, setCookie }}>
        <Router />
      </AppContext.Provider>
    </div>
  );
}

export default App;
