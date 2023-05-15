import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import SignUp from './pages/SignUp';
import { ROUTES } from './utils/constants/routes';

const App = () =>  {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path={ROUTES.SIGNUP} element={<SignUp />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
