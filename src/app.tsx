import React, { useState, useRef, useEffect } from 'react';


const App: React.FC = () => {
  const [originalImage, setOriginalImage] = useState<HTMLImageElement | null>(null);
  const [pixelSize, setPixelSize] = useState<number>(4);
  const originalCanvasRef = useRef<HTMLCanvasElement>(null);
  const dotCanvasRef = useRef<HTMLCanvasElement>(null);
  const imageUploadRef = useRef<HTMLInputElement>(null);

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

    const pixelSizeValue = pixelSize;
    for (let y = 0; y < originalImage.height; y += pixelSizeValue) {
      for (let x = 0; x < originalImage.width; x += pixelSizeValue) {
        const pixelData = originalContext.getImageData(x, y, pixelSizeValue, pixelSizeValue).data;
        const r = pixelData[0];
        const g = pixelData[1];
        const b = pixelData[2];
        const average = (r + g + b) / 3;
        dotContext.fillStyle = `rgb(${average}, ${average}, ${average})`;
        dotContext.beginPath();
        dotContext.arc(x + pixelSizeValue / 2, y + pixelSizeValue / 2, pixelSizeValue / 2, 0, 2 * Math.PI);
        dotContext.fill();
      }
    }
  };

  const handlePixelSizeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newPixelSize = parseInt(event.target.value, 10);
    setPixelSize(newPixelSize);
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
      convertImageToDotArt();
    }
  }, [originalImage, pixelSize]);

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

      <div>
        <label htmlFor="pixelSize">Pixel Size:</label>
        <input
          type="range"
          id="pixelSize"
          min="1"
          max="20"
          value={pixelSize}
          onChange={handlePixelSizeChange}
        />
        <span>{pixelSize}</span>
      </div>

      <canvas ref={originalCanvasRef} />
      <canvas ref={dotCanvasRef} />
      <button onClick={downloadDotArt}>Download Dot Art</button>
    </div>
  );
};

export default App;
