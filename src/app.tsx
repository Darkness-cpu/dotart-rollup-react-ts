import React, { useState, useRef, useEffect } from 'react';


const App: React.FC = () => {
  const [originalImage, setOriginalImage] = useState<HTMLImageElement | null>(null);
  const originalCanvasRef = useRef<HTMLCanvasElement>(null);
  const dotCanvasRef = useRef<HTMLCanvasElement>(null);
  const imageUploadRef = useRef<HTMLInputElement>(null);
  const [pixelSize, setPixelSize] = useState<number>(4);

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const image = new Image();
        image.onload = () => {
          setOriginalImage(image);
        };
        image.src = e.target?.result as string;
      };
      reader.readAsDataURL(file);
    }
  };

  const convertImageToDotArt = () => {
    if (!originalImage || !originalCanvasRef.current || !dotCanvasRef.current) return;

    const userPixelSize = prompt("Enter pixel size (1-20):");
    if (userPixelSize !== null) {
      const newPixelSize = parseInt(userPixelSize, 10);
      if (newPixelSize >= 1 && newPixelSize <= 20) {
        setPixelSize(newPixelSize);
      } else {
        alert("Invalid pixel size. Please enter a number between 1 and 20.");
        return; // Stop execution if pixel size is invalid
      }
    } else {
        return; // Stop if the user cancels the prompt
    }


    const originalCanvas = originalCanvasRef.current;
    const dotCanvas = dotCanvasRef.current;
    const originalContext = originalCanvas.getContext('2d');
    const dotContext = dotCanvas.getContext('2d');

    if (!originalContext || !dotContext) return;

    originalCanvas.width = originalImage.width;
    originalCanvas.height = originalImage.height;
    dotCanvas.width = originalImage.width;
    dotCanvas.height = originalImage.height;

    originalContext.drawImage(originalImage, 0, 0);



    for (let y = 0; y < originalImage.height; y += pixelSize) {
      for (let x = 0; x < originalImage.width; x += pixelSize) {
        const pixelData = originalContext.getImageData(x, y, pixelSize, pixelSize).data;
        const r = pixelData[0];
        const g = pixelData[1];
        const b = pixelData[2];
        const average = (r + g + b) / 3;
        dotContext.fillStyle = `rgb(${average}, ${average}, ${average})`;
        dotContext.beginPath();
        dotContext.arc(x + pixelSize / 2, y + pixelSize / 2, pixelSize / 2, 0, 2 * Math.PI);
        dotContext.fill();
      }
    }
  };

  const downloadDotArt = () => {
    if (!dotCanvasRef.current) return;
    const dataURL = dotCanvasRef.current.toDataURL('image/png');
    const link = document.createElement('a');
    link.href = dataURL;
    link.download = 'dot-art.png';
    link.click();
  };

  useEffect(() => {
    if (originalImage) {
      convertImageToDotArt(); // Call initially with default pixel size
    }
  }, [originalImage]);

  return (
    <div className="dot-art-converter">
      <h1>Dot Art Converter</h1>

      <div className="file-upload-wrapper">
        <button className="file-upload-button">Compiler</button>
        <input
          type="file"
          accept="image/*"
          onChange={handleImageUpload}
          ref={imageUploadRef}
          className="file-upload-input"
        />
      </div>

      <canvas ref={originalCanvasRef} />
      <canvas ref={dotCanvasRef} />
      <button onClick={convertImageToDotArt} style={{ marginTop: '10px' }}>
        Convert
      </button>
      <button onClick={downloadDotArt} style={{ marginTop: '10px' }}>
        Download Dot Art
      </button>
    </div>
  );
};

export default App;
