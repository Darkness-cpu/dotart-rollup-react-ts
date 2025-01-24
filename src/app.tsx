import React, { useState, useRef, useEffect } from 'react';

const DotArtConverter: React.FC = () => {
  const [originalImage, setOriginalImage] = useState<HTMLImageElement | null>(null);
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

    const pixelSize = 4; // Adjust for dot size
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
      convertImageToDotArt();
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
      <button onClick={downloadDotArt}>Download Dot Art</button>
    </div>
  );
};

export default DotArtConverter;
