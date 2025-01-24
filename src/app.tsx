import React, { useState, useRef, useEffect } from 'react';

const App: React.FC = () => {
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

    const pixelSize = 4;
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
    <div style={{
      fontFamily: 'sans-serif',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      backgroundColor: '#333',
      color: '#eee',
      padding: '20px'
    }}>
      <h1>Dot Art Converter</h1>
      <input type="file" accept="image/*" onChange={handleImageUpload} ref={imageUploadRef} style={{
        backgroundColor: '#007bff',
        color: '#fff',
        padding: '10px 20px',
        border: 'none',
        borderRadius: '5px',
        cursor: 'pointer',
        overflow: 'hidden',
        position: 'relative',
        display: 'inline-block'
      }}/>
       <span style={{
         position: 'absolute',
         top: 0, left: 0,
         width: '100%', height: '100%',
         display: 'flex',
         alignItems: 'center',
         justifyContent: 'center'
       }}>Compiler</span>

      <canvas ref={originalCanvasRef} style={{ border: '2px solid #555', boxShadow: '2px 2px 5px rgba(0, 0, 0, 0.3)', marginBottom: '10px' }} />
      <canvas ref={dotCanvasRef} style={{ border: '2px solid #555', boxShadow: '2px 2px 5px rgba(0, 0, 0, 0.3)', marginBottom: '10px' }} />
      <button onClick={downloadDotArt} style={{ backgroundColor: '#007bff', color: 'white', padding: '10px 20px', border: 'none', borderRadius: '5px', cursor: 'pointer' }}>Download Dot Art</button>
    </div>
  );
};

export default App;
