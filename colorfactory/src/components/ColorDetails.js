import React from 'react';
import { useParams } from 'react-router-dom';

const ColorDetails = () => {
  const { color } = useParams(); 

  const colorsData = [
    { id: '1', name: 'Red', hexCode: '#FF0000' },
    { id: '2', name: 'Green', hexCode: '#00FF00' },
    { id: '3', name: 'Blue', hexCode: '#0000FF' }
  ];

  const selectedColor = colorsData.find(item => item.id === color);

  if (!selectedColor) {
    return <div>
       <p> 404 - Color not found!</p>
       <p>Click <a href="/colors">here</a> to go back to colors list!</p>
    </div>;
  }

  return (
    <div>
      <h1>Color Details</h1>
      <div style={{ backgroundColor: selectedColor.hexCode, width: '100px', height: '100px' }}></div>
      <p>Name: {selectedColor.name}</p>
      <p>Hex Code: {selectedColor.hexCode}</p>
      <a href="/colors">Go back to colors list</a>
    </div>
  );
}

export default ColorDetails;
