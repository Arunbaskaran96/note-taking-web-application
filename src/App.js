
import './App.css';
import Homepage from './pages/homepage/Homepage';
import Viewnote from './components/Viewnote/Viewnote';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Login from './pages/Login/Login';
import Register from './pages/Register/Register';

function App() {
  return (
    <div>
      <BrowserRouter>
      <Routes>
        <Route path='/' element={<Login/>}/>
        <Route path='/register' element={<Register/>}/>
        <Route path='/homepage' element={<Homepage/>}/>
        <Route path='/viewnote/:id' element={<Viewnote/>}/>
      </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
