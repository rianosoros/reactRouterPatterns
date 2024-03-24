import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import ColorsList from './components/ColorsList';
import ColorDetails from './components/ColorDetails';
import AddColorForm from './components/AddColorForm';
import NotFound from './components/NotFound';

const App = () => {
  const [colors, setColors] = useState(() => {
    const storedColors = localStorage.getItem('colors');
    return storedColors ? JSON.parse(storedColors) : [];
  });

  const handleAddColor = (newColor) => {
    const updatedColors = [newColor, ...colors];
    setColors(updatedColors);
    localStorage.setItem('colors', JSON.stringify(updatedColors));
    console.log('Color added:', newColor);
  };

  return (
    <Router>
      <Routes>
      <Route path="/colors" element={<ColorsList colors={colors} />} />
        <Route path="/colors/new" element={<AddColorForm addColor={handleAddColor} />} /> 
        <Route path="/colors/:color" element={<ColorDetails />} /> 
        <Route path="/nope" element={<NotFound />} /> 
      </Routes>
    </Router>
  );
};

export default App;
