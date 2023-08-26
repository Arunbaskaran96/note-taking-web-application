import logo from './logo.svg';
import './App.css';
import Homepage from './pages/homepage/Homepage';
import Topbar from './components/topbar/Topbar';
import Viewnote from './components/Viewnote/Viewnote';

function App() {
  return (
    <div>
      <Topbar/>
      <Viewnote/>
    </div>
  );
}

export default App;
