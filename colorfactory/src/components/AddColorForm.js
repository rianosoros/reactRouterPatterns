import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const AddColorForm = ({ addColor }) => {
  const [colorName, setColorName] = useState('');
  const [colorHex, setColorHex] = useState('');
  const navigate = useNavigate();

  const handleColorChange = (e) => {
    const colorValue = e.target.value;
    const hexCode = colorValue.startsWith('#') ? colorValue : `#${colorValue}`;
    setColorHex(hexCode);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Color Name:', colorName); 
    console.log('Color Hex Code:', colorHex);
    const newColor = { name: colorName, hexCode: colorHex };
    console.log('Color added:', newColor);
    addColor(newColor);
    navigate('/colors');
  };

  return (
    <div>
      <h1>Add Color Form</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor="colorName">Color Name:</label>
        <input type="text" id="colorName" value={colorName} onChange={(e) => setColorName(e.target.value)} required />
        <label htmlFor="colorHex">Color Hex Code:</label>
        <input type="color" id="colorHex" value={colorHex} onChange={handleColorChange} required />
        <button type="submit">Add Color</button>
      </form>
    </div>
  );
};

export default AddColorForm;
