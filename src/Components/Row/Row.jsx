import React from 'react';
import './Row.css';

const Row = ({ cells, onClick }) => (
  <div className="row">
    {cells.map((cell, index) => (
      <div key={index} className="cell" onClick={() => onClick(index)}>
        {cell}
      </div>
    ))}
  </div>
);

export default Row;
