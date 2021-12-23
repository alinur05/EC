import './App.css';
import styled from 'styled-components'
import AppRouter from './Router/AppRouter';
import NavBar from './components/common/NavBar/NavBar';
import { BrowserRouter } from 'react-router-dom';
import { useEffect } from 'react';
import { getLocalStorage } from './utiles';
import { useDispatch } from 'react-redux';
import { authUser, getCoures } from './redux/actions/actions';
import { AUTH_USER } from './redux/types';
import GetFooter from './UI/GetFooter';
import useFetching from './hooks/useFetching';

function App() {
  const dispatch = useDispatch()

  const [getCourses, loading, error] = useFetching(async () => {
    dispatch(getCoures())
  })

  useEffect(() => {
    dispatch(getCoures())
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
        <GetFooter />
      </BrowserRouter>
    </div>
  )
}

export default App;


// Todo

// Loading 
// Slider
// Course edition