import React from 'react';
import { Link } from 'react-router-dom';

const ColorsList = ({ colors }) => {
    const colorsData = [
        { id: '1', name: 'Red', hexCode: '#FF0000' },
        { id: '2', name: 'Green', hexCode: '#00FF00' },
        { id: '3', name: 'Blue', hexCode: '#0000FF' }
    ];
    
  return (
    <div>
      <h1>Colors List</h1>
      <ul>
        {colors.map((color) => (
            <li key={color.id}>
            <Link to={`/colors/${color.id}`}>{color.name}</Link>
            </li>
        ))}
      </ul>

      <Link to="/colors/new">Add Color</Link>
    </div>
  );
}

export default ColorsList;
