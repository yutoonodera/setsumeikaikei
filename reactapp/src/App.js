import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Creation } from './components/Creation';
import { Report } from './components/Report';
import { Bs } from './components/Bs';
import BsGraph from './components/BsGraph';
import { Pl } from './components/Pl';

function App() {
  return (
    <Router>
      <div className="App">
        <header className="App-header">
          <Routes>
            <Route path="/" element={<Menu />} />
            <Route path="/report" element={<Report />} />
            <Route path="/report/bs" element={<Bs />} />
			<Route path="/bsgraph" element={<BsGraph />} />
            <Route path="/report/pl" element={<Pl />} />
          </Routes>
        </header>
      </div>
    </Router>
  );
}

export default App;
