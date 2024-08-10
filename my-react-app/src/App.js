import {BrowserRouter as Router, Routes, Route} from 'react';
import Login from './pages/Login';
import Signup from './pages/Signup';

const App = () => {
  return (
    <div>
      <Router>
        <Routes>
          <Route path="/signup" element={<Login/>} />
          <Route path="/login" element={<Signup/>} />
        </Routes>
      </Router>
    </div>
  )
}

export default App