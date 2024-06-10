import './App.css';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import WeightForm from './components/weight_form.js';
import WeightHistory from './components/weight_history.js';

function App() {
  return (
    <Router>
      <div>
        <nav>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/add-weight">Add Weight</Link>
            </li>
            <li>
              <Link to="/weight-history">Weight History</Link>
            </li>
          </ul>
        </nav>
        <Routes>
          <Route path="/add-weight" element={<WeightForm />} />
          <Route path="/weight-history" element={<WeightHistory username="user1" />} />
          <Route path="/" element={<h1>Welcome to the Fitness Tracker app!</h1>} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
