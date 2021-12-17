import './App.css';
import styled from 'styled-components'
import AppRouter from './Router/AppRouter';
import NavBar from './components/common/NavBar/NavBar';
import { BrowserRouter } from 'react-router-dom';
import { useEffect } from 'react';
import { getLocalStorage } from './utiles';
import { useDispatch } from 'react-redux';
import { authUser } from './redux/actions/actions';
import { AUTH_USER } from './redux/types';

function App() {
  const dispatch = useDispatch()

  useEffect(() => {
    const userData = getLocalStorage("session")
    if(userData) {
      dispatch({type: AUTH_USER, payload: userData})
    }
  }, [])

  return (
    <div className="App">
      <BrowserRouter>
        <NavBar />
        <AppRouter />
      </BrowserRouter>
    </div>
  )
}

export default App;
