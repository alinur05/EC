import './App.css';
import styled from 'styled-components'
import AppRouter from './Router/AppRouter';
import NavBar from './components/common/NavBar/NavBar';
import { BrowserRouter } from 'react-router-dom';

function App() {


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
