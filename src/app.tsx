import React, { useState } from 'react';

const App: React.FC = () => {
  const [result, setResult] = useState<string>('');
  const [data, setData] = useState<{ link: string | null }>({ link: null });

  const handleSearch = async () => {
    const urlInput = (document.getElementById('youtubeUrl') as HTMLInputElement).value;
    if (!urlInput) {
      setResult('Please enter a URL.');
      return;
    }

    setResult('Processing...');
    try {
      const response = await fetch(`/dl?url=${encodeURIComponent(urlInput)}`);
      const responseData = await response.json();

      if (responseData.link) {
        setData({ link: responseData.link });
      } else {
        setResult('Failed to get the MP3 link.');
      }
    } catch (error) {
      // ตรวจสอบและแปลงชนิดของ error
      if (error instanceof Error) {
        setResult(`Error: ${error.message}`);
      } else {
        setResult('An unknown error occurred.');
      }
    }
  };

  return (
    <div>
      <h1>YouTube MP3 Downloader</h1>
      <p>Enter a YouTube URL to download the MP3</p>
      <input type="text" id="youtubeUrl" placeholder="Enter YouTube URL" />
      <button onClick={handleSearch}>Search</button>
      <p id="result">{result}</p>
      {data.link && (
        <a href={data.link} target="_blank" rel="noopener noreferrer">
          Download
        </a>
      )}
    </div>
  );
};
export default App;
