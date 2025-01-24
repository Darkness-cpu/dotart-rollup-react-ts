import React, { useState } from 'react';

interface DotProps {
  active: boolean;
  onClick: () => void;
}

const Dot: React.FC<DotProps> = ({ active, onClick }) => {
  const dotStyle = {
    width: '20px',
    height: '20px',
    backgroundColor: active ? 'black' : 'lightgray',
    borderRadius: '50%',
    margin: '2px',
    cursor: 'pointer',
  };

  return <div style={dotStyle} onClick={onClick} />;
};


const WebDotArt: React.FC = () => {
  const gridSize = 20; // Adjust for different grid sizes
  const initialGrid: boolean[][] = Array(gridSize)
    .fill(null)
    .map(() => Array(gridSize).fill(false));

  const [grid, setGrid] = useState(initialGrid);


  const toggleDot = (row: number, col: number) => {
    const newGrid = [...grid];
    newGrid[row][col] = !newGrid[row][col];
    setGrid(newGrid);
  };

    const clearGrid = () => {
        setGrid(initialGrid);
    }


  return (
    <div>
        <button onClick={clearGrid}>Clear</button> {/* Clear button */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: `repeat(${gridSize}, 1fr)`,  // Dynamic grid columns
          border: '1px solid black', // Add a border for visualization
        }}
      >
        {grid.map((row, rowIndex) =>
          row.map((isActive, colIndex) => (
            <Dot
              key={`${rowIndex}-${colIndex}`}
              active={isActive}
              onClick={() => toggleDot(rowIndex, colIndex)}
            />
          ))
        )}
      </div>
    </div>
  );
};

export default WebDotArt;
