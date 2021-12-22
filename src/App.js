import './App.css';
import styled from 'styled-components'
import AppRouter from './Router/AppRouter';
import NavBar from './components/common/NavBar/NavBar';
import { BrowserRouter } from 'react-router-dom';
import React, { useEffect } from 'react';
import { getLocalStorage } from './utiles';
import { useDispatch } from 'react-redux';
import { authUser } from './redux/actions/actions';
import { AUTH_USER } from './redux/types';
import GetFooter from './UI/GetFooter';

function App() {
  const dispatch = useDispatch()

  useEffect(() => {
    const userData = getLocalStorage("session")
    if(userData) {
      dispatch({type: AUTH_USER, payload: userData})
    }
  }, [])

  return (
    <div className="App" >
        <BrowserRouter>
            <div style={{flex: '0 0 auto'}}>
            <NavBar />
            </div>
            <AppRouter />
          <div style={{flex: '0 0 auto'}}>
          <GetFooter />
          </div>
        </BrowserRouter>
    </div>
  )
}

export default App;
