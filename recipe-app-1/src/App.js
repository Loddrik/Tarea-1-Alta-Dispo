import React, { useState } from 'react'
import AppContext from './Context/AppContext';
import { Router } from './Routes/Router';
const App = () => {
  const [user, setUser] = useState({
    authenticated: false,
  })

  return (
    <div className="App">
      <AppContext.Provider value={{ user, setUser }}>
        <Router />
      </AppContext.Provider>
    </div>
  );
}

export default App;
