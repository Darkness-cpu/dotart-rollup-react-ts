import React, { useState } from 'react';
import './style.css';

interface DotProps {
    active: boolean;
    onClick: () => void;
}

const Dot: React.FC<DotProps> = ({ active, onClick }) => {
    return (
        <div
            className={`dot ${active ? 'active' : ''}`}
            onClick={onClick}
        ></div>
    );
};

const WebDotArt: React.FC = () => {
    const gridSize = 20;
    const initialGrid = Array(gridSize).fill(Array(gridSize).fill(false));
    const [grid, setGrid] = useState<boolean[][]>(initialGrid);


    const toggleDot = (row: number, col: number) => {
        const newGrid = [...grid];
        newGrid[row][col] = !newGrid[row][col];
        setGrid(newGrid);
    };

    const clearGrid = () => {
        setGrid(initialGrid);
    };

    return (
        <div className="App">
            <div className="dot-art-container">
                <button onClick={clearGrid}>Clear</button>
                <div
                    style={{
                        display: 'grid',
                        gridTemplateColumns: `repeat(${gridSize}, 1fr)`,
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
        </div>
    );
};

export default WebDotArt;
