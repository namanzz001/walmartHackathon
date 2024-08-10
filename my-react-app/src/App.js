import {BrowserRouter as Router, Routes, Route} from 'react';
import Login from './pages/Login';
import signup from './pages/Signup';

const App = () => {
  return (
    <div>
      <Router/>
        <Routes>
          <Route path="/signup" element={<signup/>} />
          <Route path="/login" element={<Login/>} />
        </Routes>
        <Router/>
    </div>
  )
}

export default App