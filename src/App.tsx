import React from 'react';
import { BrowserRouter as Router ,Routes ,Route } from 'react-router-dom';
import Home from "./pages/Home"
import RepoWithUser from './pages/RepoWithUser';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path='/:users' element={<RepoWithUser />} />
      </Routes>
    </Router>
  );
}

export default App;