import React from 'react';
import './App.css';
import BarChart from './components/barCharts/BarChart';
import ScatterChart from './components/scatterCharts/ScatterChart';

function App() {
  return (
    <div id='charts'>
      <div>
        <ScatterChart x={'Color intensity'} y={'Hue'} />
      </div>
      <div>
        <BarChart x={'Alcohol'} y={'Malic Acid'} />
      </div>
    </div>
  );
}

export default App;
