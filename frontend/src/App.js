import './App.css';
import axios from 'axios';

axios.defaults.xsrfCookieName = 'csrftoken'
axios.defaults.xsrfHeaderName = 'X-CSRFToken'

function App() {
  return (
    <div className="App">
      <h1>NUMBER CRUNCHER</h1>
    </div>
  );
}

export default App;
