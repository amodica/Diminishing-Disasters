import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import Navigation from './components/Navigation';
import Splash from './components/Splash'

function App() {
  return (
    <div className="App">
      <Navigation/>
      <Splash/>
      <p style={{ color: "white" }}>frontend_test</p>
    </div>
  );
}

export default App;
