import './App.css';
import styled from 'styled-components'
import AppRouter from './Router/AppRouter';
import NavBar from './components/common/NavBar/NavBar';
import { BrowserRouter } from 'react-router-dom';
import { useEffect } from 'react';
import { getLocalStorage } from './utiles';
import { useDispatch } from 'react-redux';
import { authUser } from './redux/actions/actions';

function App() {
  const dispatch = useDispatch()

  useEffect(() => {
    const userData = getLocalStorage("session")
    if(userData) {
      dispatch(authUser(userData))
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
