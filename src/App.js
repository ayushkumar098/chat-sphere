import './App.css';
import './styles.scss';

import {BrowserRouter, Routes, Route, Navigate} from 'react-router-dom';

import Home from './pages/home.component';
import Login from './pages/login.component';
import Register from "./pages/register.component";
import { useContext } from 'react';
import { AuthContext } from './context/authContext';

function App() {
  const { currentUser } = useContext(AuthContext);
  
  const ProdtectedRoute = ({children}) => {
    if(!currentUser){
      return <Navigate to="/login" />
    }
    return children;
  }
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/">
          <Route
            index
            element={
              <ProdtectedRoute>
                <Home />
              </ProdtectedRoute>
            }
          />
          <Route path="register" element={<Register />} />
          <Route path="login" element={<Login />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
